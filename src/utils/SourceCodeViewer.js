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
  import { Play, Pause, RotateCcw, Trophy, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
  
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
      const particleCount = 20;
      
      for (let i = 0; i < particleCount; i++) {
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
              createExplosion(head.x, head.y);
              setGameOver(true);
              setGameRunning(false);
              return prevSnake;
            }
  
            newSnake.unshift(head);
  
            // Check food collision
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
    }, [direction, food, gameRunning, gameOver, speed, checkCollision, generateFood, createExplosion]);
  
    // ... rest of the component code ...
  
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Snake Game UI */}
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
          code: `import React, { useState, useCallback, useRef } from 'react';
  import { Upload, DollarSign, Filter, ShoppingCart, Download } from 'lucide-react';
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
  
    // Generate order based on parameters
    const generateOrder = () => {
      if (catalog.length === 0) {
        setUploadStatus('Please upload a catalog first');
        return;
      }
  
      const { totalValue, minPrice, maxPrice, maxItems } = orderParams;
      const targetValue = parseFloat(totalValue);
      const minPriceNum = parseFloat(minPrice) || 0;
      const maxPriceNum = parseFloat(maxPrice) || Infinity;
  
      // Filter products by price range
      const filteredProducts = catalog.filter(product => 
        product.price >= minPriceNum && product.price <= maxPriceNum
      );
  
      // Generate order using optimization algorithm
      const order = [];
      let currentValue = 0;
      const usedProducts = new Set();
  
      // Smart algorithm implementation...
      
      setGeneratedOrder(order);
    };
  
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Order Generator UI */}
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
    const sourceData = sourceCodeData[projectSlug];
    
    if (!sourceData) {
      alert('Source code not available for this project');
      return;
    }
  
    const popup = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    // Build the HTML content using string concatenation to avoid template literal issues
    const htmlContent = createHTMLContent(sourceData);
    
    popup.document.write(htmlContent);
    popup.document.close();
  };
  
  // Helper function to create HTML content
  function createHTMLContent(sourceData) {
    const fileTabsHTML = sourceData.files.map((file, index) => 
      `<div class="file-tab ${index === 0 ? 'active' : ''}" data-file="${index}">
        ${file.name}
      </div>`
    ).join('');
  
    const fileContainersHTML = sourceData.files.map((file, index) => 
      `<div class="code-container" id="file-${index}" style="display: ${index === 0 ? 'block' : 'none'}">
        <div class="code-header">
          <h3>${file.name}</h3>
          <button class="copy-btn" onclick="copyCode(${index})">
            Copy Code
          </button>
        </div>
        <div class="code-content">
          <pre><code class="language-${file.language}">${escapeHtml(file.code)}</code></pre>
        </div>
      </div>`
    ).join('');
  
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${sourceData.title} - Source Code</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            min-height: 100vh;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          
          .header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: rgba(55, 65, 81, 0.3);
            border-radius: 1rem;
            border: 1px solid rgba(75, 85, 99, 0.3);
            backdrop-filter: blur(10px);
          }
          
          .header h1 {
            font-size: 2.5rem;
            font-weight: bold;
            background: linear-gradient(to right, #60a5fa, #a78bfa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0 0 1rem 0;
          }
          
          .header p {
            color: #d1d5db;
            font-size: 1.1rem;
            margin: 0;
          }
          
          .file-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
          }
          
          .file-tab {
            padding: 0.75rem 1.5rem;
            background: rgba(75, 85, 99, 0.3);
            border: 1px solid rgba(107, 114, 128, 0.3);
            border-radius: 0.5rem;
            color: #d1d5db;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
          }
          
          .file-tab:hover {
            background: rgba(59, 130, 246, 0.2);
            border-color: rgba(59, 130, 246, 0.3);
          }
          
          .file-tab.active {
            background: linear-gradient(to right, #3b82f6, #8b5cf6);
            border-color: transparent;
            color: white;
          }
          
          .code-container {
            background: rgba(31, 41, 55, 0.8);
            border-radius: 1rem;
            border: 1px solid rgba(75, 85, 99, 0.3);
            overflow: hidden;
            backdrop-filter: blur(10px);
          }
          
          .code-header {
            padding: 1rem 1.5rem;
            background: rgba(55, 65, 81, 0.5);
            border-bottom: 1px solid rgba(75, 85, 99, 0.3);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .code-header h3 {
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
            transition: all 0.3s ease;
          }
          
          .copy-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
          
          .code-content {
            overflow-x: auto;
            max-height: 70vh;
          }
          
          pre {
            margin: 0 !important;
            padding: 1.5rem !important;
            background: transparent !important;
            border-radius: 0 !important;
          }
          
          code {
            font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', monospace !important;
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
          }
          
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(55, 65, 81, 0.3);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563eb, #7c3aed);
          }
          
          .floating-elements {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
          }
          
          .floating-element {
            position: absolute;
            border-radius: 50%;
            opacity: 0.1;
            animation: float 20s infinite linear;
          }
          
          .floating-element:nth-child(1) {
            top: 10%;
            left: 10%;
            width: 80px;
            height: 80px;
            background: #3b82f6;
            animation-delay: 0s;
          }
          
          .floating-element:nth-child(2) {
            top: 20%;
            right: 20%;
            width: 120px;
            height: 120px;
            background: #8b5cf6;
            animation-delay: -5s;
          }
          
          .floating-element:nth-child(3) {
            bottom: 20%;
            left: 30%;
            width: 60px;
            height: 60px;
            background: #10b981;
            animation-delay: -10s;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-30px) rotate(120deg); }
            66% { transform: translateY(15px) rotate(240deg); }
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 1rem;
            }
            
            .header h1 {
              font-size: 2rem;
            }
            
            .file-tabs {
              justify-content: center;
            }
            
            code {
              font-size: 0.8rem !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="floating-elements">
          <div class="floating-element"></div>
          <div class="floating-element"></div>
          <div class="floating-element"></div>
        </div>
        
        <div class="container">
          <div class="header">
            <h1>${sourceData.title}</h1>
            <p>${sourceData.description}</p>
          </div>
          
          <div class="file-tabs">
            ${fileTabsHTML}
          </div>
          
          ${fileContainersHTML}
        </div>
        
        <script>
          Prism.highlightAll();
          
          document.querySelectorAll('.file-tab').forEach(tab => {
            tab.addEventListener('click', () => {
              const fileIndex = tab.dataset.file;
              
              document.querySelectorAll('.file-tab').forEach(t => t.classList.remove('active'));
              tab.classList.add('active');
              
              document.querySelectorAll('.code-container').forEach(container => {
                container.style.display = 'none';
              });
              document.getElementById('file-' + fileIndex).style.display = 'block';
            });
          });
          
          function copyCode(fileIndex) {
            const codeElement = document.querySelector('#file-' + fileIndex + ' code');
            const text = codeElement.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
              const btn = document.querySelector('#file-' + fileIndex + ' .copy-btn');
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
          
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
              window.close();
            }
          });
        </script>
      </body>
      </html>`;
  }
  
  // Helper function to escape HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }