// Source code data for projects
export const sourceCodeData = {
    'snake-game': {
      title: 'Snake Game',
      description: 'Modern Snake game built with React and HTML5 Canvas',
      files: [
        {
          name: 'SnakeGame.js',
          language: 'javascript',
          code: `import React, { useState, useEffect, useCallback, useRef } from 'react';
  import { Play, Pause, RotateCcw, Trophy, Gamepad2 } from 'lucide-react';
  
  const SnakeGame = () => {
    const canvasRef = useRef(null);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [gameRunning, setGameRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [explosionParticles, setExplosionParticles] = useState([]);
  
    const GRID_SIZE = 20;
    const CANVAS_SIZE = 400;
  
    // Create explosion particles
    const createExplosion = useCallback((x, y) => {
      const particles = [];
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: x * GRID_SIZE + GRID_SIZE / 2,
          y: y * GRID_SIZE + GRID_SIZE / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 1,
          decay: Math.random() * 0.02 + 0.01,
          size: Math.random() * 4 + 2,
          color: Math.random() > 0.5 ? '#ef4444' : '#f97316'
        });
      }
      setExplosionParticles(particles);
    }, []);
  
    // Game loop with requestAnimationFrame
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
  
            if (checkCollision(head, newSnake)) {
              createExplosion(head.x, head.y);
              setGameOver(true);
              setGameRunning(false);
              return prevSnake;
            }
  
            newSnake.unshift(head);
  
            if (head.x === food.x && head.y === food.y) {
              setScore(prev => prev + 10);
              setFood(generateFood(newSnake));
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
    }, [direction, food, gameRunning, gameOver, speed]);
  
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Snake Game Implementation */}
      </div>
    );
  };
  
  export default SnakeGame;`
        }
      ]
    },
    'order-generator': {
      title: 'AI Order Generator',
      description: 'Intelligent retail order generation with budget optimization',
      files: [
        {
          name: 'OrderGenerator.js',
          language: 'javascript',
          code: `import React, { useState, useCallback } from 'react';
  import { Upload, DollarSign, Filter, ShoppingCart } from 'lucide-react';
  import * as XLSX from 'xlsx';
  
  const OrderGenerator = () => {
    const [catalog, setCatalog] = useState([]);
    const [generatedOrder, setGeneratedOrder] = useState([]);
    const [orderParams, setOrderParams] = useState({
      totalValue: '',
      minPrice: '',
      maxPrice: '',
      maxItems: 50
    });
  
    const generateOrder = () => {
      if (catalog.length === 0) return;
  
      const { totalValue, minPrice, maxPrice, maxItems } = orderParams;
      const targetValue = parseFloat(totalValue);
      
      // Smart order generation algorithm
      const order = [];
      let currentValue = 0;
      
      // Algorithm implementation...
      
      setGeneratedOrder(order);
    };
  
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Order Generator Implementation */}
      </div>
    );
  };
  
  export default OrderGenerator;`
        }
      ]
    }
  };
  
  // Function to open source code viewer in new window
  export const openSourceCodeViewer = (projectSlug) => {
    console.log('Opening source code viewer for:', projectSlug);
    
    const sourceData = sourceCodeData[projectSlug];
    
    if (!sourceData) {
      console.error('No source code data found for project:', projectSlug);
      alert('Source code not available for this project');
      return;
    }
  
    console.log('Source data found:', sourceData);
  
    try {
      // Create popup with specific parameters to avoid blocking
      const popup = window.open('about:blank', 'sourceCodeViewer', 'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,location=no,status=no');
      
      if (!popup) {
        alert('Popup blocked! Please allow popups for this site and try again.');
        return;
      }
  
      // Simple HTML content to test
      const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${sourceData.title} - Source Code</title>
      <style>
          body {
              margin: 0;
              padding: 20px;
              background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
              color: #ffffff;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
              min-height: 100vh;
          }
          
          .header {
              text-align: center;
              margin-bottom: 2rem;
              padding: 2rem;
              background: rgba(55, 65, 81, 0.3);
              border-radius: 1rem;
              border: 1px solid rgba(75, 85, 99, 0.3);
          }
          
          .header h1 {
              font-size: 2.5rem;
              font-weight: bold;
              background: linear-gradient(to right, #60a5fa, #a78bfa);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin: 0 0 1rem 0;
          }
          
          .header p {
              color: #d1d5db;
              font-size: 1.1rem;
              margin: 0;
          }
          
          .file-container {
              background: rgba(31, 41, 55, 0.8);
              border-radius: 1rem;
              border: 1px solid rgba(75, 85, 99, 0.3);
              overflow: hidden;
              margin-bottom: 2rem;
          }
          
          .file-header {
              padding: 1rem 1.5rem;
              background: rgba(55, 65, 81, 0.5);
              border-bottom: 1px solid rgba(75, 85, 99, 0.3);
              display: flex;
              align-items: center;
              justify-content: space-between;
          }
          
          .file-header h3 {
              margin: 0;
              color: #f3f4f6;
              font-size: 1.1rem;
              font-weight: 600;
          }
          
          .copy-btn {
              padding: 0.5rem 1rem;
              background: linear-gradient(to right, #10b981, #3b82f6);
              border: none;
              border-radius: 0.5rem;
              color: white;
              cursor: pointer;
              font-weight: 500;
          }
          
          .copy-btn:hover {
              transform: scale(1.05);
          }
          
          .code-content {
              padding: 1.5rem;
              overflow-x: auto;
              max-height: 60vh;
          }
          
          pre {
              margin: 0;
              white-space: pre-wrap;
              word-wrap: break-word;
          }
          
          code {
              font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
              font-size: 0.9rem;
              line-height: 1.6;
              color: #e5e7eb;
          }
          
          .keyword { color: #c792ea; }
          .string { color: #c3e88d; }
          .function { color: #82aaff; }
          .comment { color: #676e95; }
      </style>
  </head>
  <body>
      <div class="header">
          <h1>${sourceData.title}</h1>
          <p>${sourceData.description}</p>
      </div>
      
      ${sourceData.files.map(file => `
          <div class="file-container">
              <div class="file-header">
                  <h3>${file.name}</h3>
                  <button class="copy-btn" onclick="copyCode('${file.name}')">
                      Copy Code
                  </button>
              </div>
              <div class="code-content">
                  <pre><code id="code-${file.name}">${escapeHtml(file.code)}</code></pre>
              </div>
          </div>
      `).join('')}
      
      <script>
          function copyCode(fileName) {
              const codeElement = document.getElementById('code-' + fileName);
              const text = codeElement.textContent;
              
              navigator.clipboard.writeText(text).then(() => {
                  const btn = event.target;
                  const originalText = btn.textContent;
                  btn.textContent = 'Copied!';
                  btn.style.background = 'linear-gradient(to right, #10b981, #059669)';
                  
                  setTimeout(() => {
                      btn.textContent = originalText;
                      btn.style.background = 'linear-gradient(to right, #10b981, #3b82f6)';
                  }, 2000);
              }).catch(err => {
                  console.error('Failed to copy: ', err);
                  alert('Failed to copy code to clipboard');
              });
          }
          
          // Close window with Escape key
          document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape') {
                  window.close();
              }
          });
          
          console.log('Source code viewer loaded successfully');
      </script>
  </body>
  </html>`;
  
      // Write content to popup
      popup.document.open();
      popup.document.write(htmlContent);
      popup.document.close();
      
      console.log('Source code viewer content written successfully');
      
    } catch (error) {
      console.error('Error opening source code viewer:', error);
      alert('Error opening source code viewer: ' + error.message);
    }
  };
  
  // Helper function to escape HTML
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }