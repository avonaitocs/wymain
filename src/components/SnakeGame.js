import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Trophy, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snake-high-score');
    return saved ? parseInt(saved) : 0;
  });
  const [speed, setSpeed] = useState(150);

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;

  // Generate random food position - fixed to avoid loop issues
  const generateFood = useCallback((snakeBody) => {
    const gridWidth = CANVAS_SIZE / GRID_SIZE;
    const gridHeight = CANVAS_SIZE / GRID_SIZE;
    
    // Create array of all possible positions
    const allPositions = [];
    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        allPositions.push({ x, y });
      }
    }
    
    // Filter out positions occupied by snake
    const availablePositions = allPositions.filter(pos => 
      !snakeBody.some(segment => segment.x === pos.x && segment.y === pos.y)
    );
    
    // Return random available position
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[randomIndex] || { x: 0, y: 0 };
  }, []);

  // Check collision
  const checkCollision = useCallback((head, snakeBody) => {
    // Wall collision
    if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || 
        head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
      return true;
    }
    // Self collision
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Game control functions
  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection({ x: 1, y: 0 });
    setGameRunning(true);
    setGameOver(false);
    setScore(0);
    setSpeed(150);
  }, [generateFood]);

  const pauseGame = useCallback(() => {
    setGameRunning(false);
  }, []);

  const resumeGame = useCallback(() => {
    if (!gameOver) {
      setGameRunning(true);
    }
  }, [gameOver]);

  const resetGame = useCallback(() => {
    setGameRunning(false);
    setGameOver(false);
    startGame();
  }, [startGame]);

  // Game loop with requestAnimationFrame for smooth gameplay
  useEffect(() => {
    if (!gameRunning || gameOver) return;

    let animationId;
    let lastTime = 0;

    const gameLoop = (currentTime) => {
      if (currentTime - lastTime >= speed) {
        setSnake(prevSnake => {
          const newSnake = [...prevSnake];
          const head = { 
            x: newSnake[0].x + direction.x, 
            y: newSnake[0].y + direction.y 
          };

          // Check collision
          if (checkCollision(head, newSnake)) {
            setGameOver(true);
            setGameRunning(false);
            return prevSnake;
          }

          newSnake.unshift(head);

          // Check food collision
          if (head.x === food.x && head.y === food.y) {
            setScore(prev => prev + 10);
            setFood(generateFood(newSnake));
            // Increase speed slightly
            setSpeed(prev => Math.max(80, prev - 2));
          } else {
            newSnake.pop();
          }

          return newSnake;
        });
        
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [direction, food, gameRunning, gameOver, speed, checkCollision, generateFood]);

  // Optimized canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with a single operation
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid - only if needed for visual reference
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let i = 0; i <= CANVAS_SIZE; i += GRID_SIZE) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_SIZE);
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_SIZE, i);
    }
    ctx.stroke();

    // Draw snake with enhanced head and eyes
    ctx.save();
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Head - larger and with eyes
        const headSize = GRID_SIZE + 4; // Slightly larger head
        const headX = segment.x * GRID_SIZE - 2;
        const headY = segment.y * GRID_SIZE - 2;
        
        // Head gradient
        const gradient = ctx.createLinearGradient(
          headX, headY, headX + headSize, headY + headSize
        );
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#8b5cf6');
        ctx.fillStyle = gradient;
        
        // Draw head with rounded corners
        ctx.beginPath();
        ctx.roundRect(headX, headY, headSize, headSize, 4);
        ctx.fill();
        
        // Draw eyes based on direction
        ctx.fillStyle = '#ffffff';
        const eyeSize = 4;
        let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
        
        // Position eyes based on movement direction
        const centerX = headX + headSize / 2;
        const centerY = headY + headSize / 2;
        
        if (direction.x === 1) { // Moving right
          leftEyeX = centerX + 4;
          leftEyeY = centerY - 6;
          rightEyeX = centerX + 4;
          rightEyeY = centerY + 2;
        } else if (direction.x === -1) { // Moving left
          leftEyeX = centerX - 8;
          leftEyeY = centerY - 6;
          rightEyeX = centerX - 8;
          rightEyeY = centerY + 2;
        } else if (direction.y === -1) { // Moving up
          leftEyeX = centerX - 6;
          leftEyeY = centerY - 8;
          rightEyeX = centerX + 2;
          rightEyeY = centerY - 8;
        } else if (direction.y === 1) { // Moving down
          leftEyeX = centerX - 6;
          leftEyeY = centerY + 4;
          rightEyeX = centerX + 2;
          rightEyeY = centerY + 4;
        } else { // Default position (not moving yet)
          leftEyeX = centerX - 4;
          leftEyeY = centerY - 4;
          rightEyeX = centerX + 2;
          rightEyeY = centerY - 4;
        }
        
        // Draw white eyes
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw black pupils
        ctx.fillStyle = '#000000';
        const pupilSize = 2;
        
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, pupilSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(rightEyeX, rightEyeY, pupilSize, 0, Math.PI * 2);
        ctx.fill();
        
      } else {
        // Body segments - standard size
        const opacity = Math.max(0.3, 1 - (index * 0.08));
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
        
        ctx.beginPath();
        ctx.roundRect(
          segment.x * GRID_SIZE + 1, 
          segment.y * GRID_SIZE + 1, 
          GRID_SIZE - 2, 
          GRID_SIZE - 2,
          2
        );
        ctx.fill();
      }
    });
    ctx.restore();

    // Draw food with optimized gradient
    ctx.save();
    const foodGradient = ctx.createRadialGradient(
      food.x * GRID_SIZE + GRID_SIZE/2, 
      food.y * GRID_SIZE + GRID_SIZE/2, 
      2,
      food.x * GRID_SIZE + GRID_SIZE/2, 
      food.y * GRID_SIZE + GRID_SIZE/2, 
      GRID_SIZE/2
    );
    foodGradient.addColorStop(0, '#ef4444');
    foodGradient.addColorStop(1, '#dc2626');
    ctx.fillStyle = foodGradient;
    ctx.fillRect(
      food.x * GRID_SIZE + 2, 
      food.y * GRID_SIZE + 2, 
      GRID_SIZE - 4, 
      GRID_SIZE - 4
    );
    ctx.restore();
  }, [snake, food, direction.x, direction.y]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setDirection(prev => prev.y !== 1 ? { x: 0, y: -1 } : prev);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setDirection(prev => prev.y !== -1 ? { x: 0, y: 1 } : prev);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setDirection(prev => prev.x !== 1 ? { x: -1, y: 0 } : prev);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setDirection(prev => prev.x !== -1 ? { x: 1, y: 0 } : prev);
          break;
        case ' ':
          e.preventDefault();
          if (gameRunning) {
            pauseGame();
          } else {
            resumeGame();
          }
          break;
        default:
          // No action for other keys
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning, gameOver, pauseGame, resumeGame]);

  // Update high score
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem('snake-high-score', score.toString());
    }
  }, [gameOver, score, highScore]);

  // Handle direction buttons
  const handleDirectionClick = (newDirection) => {
    if (!gameRunning || gameOver) return;
    
    const directionMap = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };

    const dir = directionMap[newDirection];
    setDirection(prev => {
      // Prevent reversing into itself
      if ((dir.x === -prev.x && dir.y === -prev.y) && (prev.x !== 0 || prev.y !== 0)) {
        return prev;
      }
      return dir;
    });
  };

  const toggleGame = () => {
    if (gameOver) {
      startGame();
    } else if (gameRunning) {
      pauseGame();
    } else {
      resumeGame();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Snake Game
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Classic Snake game with modern styling
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">HTML5 Canvas</span>
              <span className="px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">React Hooks</span>
              <span className="px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">Game Logic</span>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Game Canvas */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      width={CANVAS_SIZE}
                      height={CANVAS_SIZE}
                      className="border-2 border-gray-600 rounded-lg shadow-2xl"
                    />
                    
                    {/* Game Over Overlay */}
                    {gameOver && (
                      <div className="absolute inset-0 bg-gray-900/90 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-red-400 mb-4">Game Over!</div>
                          <div className="text-xl text-gray-300 mb-6">Score: {score}</div>
                          {score === highScore && score > 0 && (
                            <div className="text-yellow-400 mb-4 flex items-center justify-center gap-2">
                              <Trophy size={20} />
                              New High Score!
                            </div>
                          )}
                          <button
                            onClick={startGame}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                          >
                            Play Again
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Start Overlay */}
                    {!gameRunning && !gameOver && (
                      <div className="absolute inset-0 bg-gray-900/90 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-400 mb-4">Snake Game</div>
                          <div className="text-gray-300 mb-6">Use arrow keys to control the snake</div>
                          <button
                            onClick={startGame}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                          >
                            Start Game
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Controls */}
                <div className="lg:hidden">
                  <div className="text-center mb-4">
                    <span className="text-gray-400 text-sm">Mobile Controls</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleDirectionClick('up')}
                      className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <ArrowUp size={24} />
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDirectionClick('left')}
                        className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <button
                        onClick={() => handleDirectionClick('down')}
                        className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <ArrowDown size={24} />
                      </button>
                      <button
                        onClick={() => handleDirectionClick('right')}
                        className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <ArrowRight size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Info Sidebar */}
            <div className="space-y-6">
              {/* Score */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy className="text-yellow-400" size={24} />
                  Score
                </h3>
                <div className="text-3xl font-bold text-green-400 mb-2">{score}</div>
                <div className="text-sm text-gray-400">
                  High Score: <span className="text-yellow-400">{highScore}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Gamepad2 className="text-blue-400" size={24} />
                  Controls
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <ArrowUp size={16} />
                      <ArrowDown size={16} />
                      <ArrowLeft size={16} />
                      <ArrowRight size={16} />
                    </div>
                    <span>Move snake</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-700 px-2 py-1 rounded text-xs">SPACE</span>
                    <span>Pause/Resume</span>
                  </div>
                </div>
              </div>

              {/* Game Controls */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4">Game Control</h3>
                <div className="space-y-3">
                  <button
                    onClick={toggleGame}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  >
                    {gameRunning ? <Pause size={20} /> : <Play size={20} />}
                    {gameRunning ? 'Pause' : 'Start'}
                  </button>
                  
                  <button
                    onClick={resetGame}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
                  >
                    <RotateCcw size={20} />
                    Reset
                  </button>
                </div>
              </div>

              {/* Game Stats */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4">Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Length:</span>
                    <span className="text-blue-400">{snake.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Speed:</span>
                    <span className="text-purple-400">{Math.round((200 - speed) / 2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={gameOver ? 'text-red-400' : gameRunning ? 'text-green-400' : 'text-yellow-400'}>
                      {gameOver ? 'Game Over' : gameRunning ? 'Playing' : 'Paused'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Development Notes */}
          <div className="mt-16 bg-gray-800/30 rounded-2xl p-8 border border-gray-700/30">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Development Features
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Game Mechanics</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Canvas-based rendering</li>
                  <li>• Collision detection</li>
                  <li>• Progressive speed increase</li>
                  <li>• Local storage high scores</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">User Experience</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Keyboard and touch controls</li>
                  <li>• Visual feedback</li>
                  <li>• Responsive design</li>
                  <li>• Game state management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-400 mb-2">Visual Design</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Gradient snake head</li>
                  <li>• Animated backgrounds</li>
                  <li>• Consistent theme</li>
                  <li>• Modern UI components</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;