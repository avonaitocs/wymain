import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Code, Monitor, Smartphone, Bot, Globe } from 'lucide-react';
import { projects, categories } from '../data/projects';

// Source code data - moved directly into component
const sourceCodeData = {
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
    // Smart order generation algorithm
    const order = [];
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

// Helper function to escape HTML
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
};

// Function to open source code viewer - fixed version
const openSourceCodeViewer = (projectSlug) => {
  const sourceData = sourceCodeData[projectSlug];
  
  if (!sourceData) {
    alert('Source code not available for this project');
    return;
  }

  try {
    const popup = window.open('about:blank', 'sourceCodeViewer', 'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,location=no,status=no');
    
    if (!popup) {
      alert('Popup blocked! Please allow popups for this site and try again.');
      return;
    }

    // Create the HTML content using proper string concatenation
    const htmlParts = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '    <meta charset="UTF-8">',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <title>' + sourceData.title + ' - Source Code</title>',
      '    <style>',
      '        body {',
      '            margin: 0;',
      '            padding: 20px;',
      '            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);',
      '            color: #ffffff;',
      '            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;',
      '            min-height: 100vh;',
      '        }',
      '        .header {',
      '            text-align: center;',
      '            margin-bottom: 2rem;',
      '            padding: 2rem;',
      '            background: rgba(55, 65, 81, 0.3);',
      '            border-radius: 1rem;',
      '            border: 1px solid rgba(75, 85, 99, 0.3);',
      '        }',
      '        .header h1 {',
      '            font-size: 2.5rem;',
      '            font-weight: bold;',
      '            background: linear-gradient(to right, #60a5fa, #a78bfa);',
      '            -webkit-background-clip: text;',
      '            -webkit-text-fill-color: transparent;',
      '            margin: 0 0 1rem 0;',
      '        }',
      '        .header p {',
      '            color: #d1d5db;',
      '            font-size: 1.1rem;',
      '            margin: 0;',
      '        }',
      '        .file-container {',
      '            background: rgba(31, 41, 55, 0.8);',
      '            border-radius: 1rem;',
      '            border: 1px solid rgba(75, 85, 99, 0.3);',
      '            overflow: hidden;',
      '            margin-bottom: 2rem;',
      '        }',
      '        .file-header {',
      '            padding: 1rem 1.5rem;',
      '            background: rgba(55, 65, 81, 0.5);',
      '            border-bottom: 1px solid rgba(75, 85, 99, 0.3);',
      '            display: flex;',
      '            align-items: center;',
      '            justify-content: space-between;',
      '        }',
      '        .file-header h3 {',
      '            margin: 0;',
      '            color: #f3f4f6;',
      '            font-size: 1.1rem;',
      '            font-weight: 600;',
      '        }',
      '        .copy-btn {',
      '            padding: 0.5rem 1rem;',
      '            background: linear-gradient(to right, #10b981, #3b82f6);',
      '            border: none;',
      '            border-radius: 0.5rem;',
      '            color: white;',
      '            cursor: pointer;',
      '            font-weight: 500;',
      '        }',
      '        .copy-btn:hover {',
      '            transform: scale(1.05);',
      '        }',
      '        .code-content {',
      '            padding: 1.5rem;',
      '            overflow-x: auto;',
      '            max-height: 60vh;',
      '            background: #1e293b;',
      '        }',
      '        pre {',
      '            margin: 0;',
      '            white-space: pre-wrap;',
      '            word-wrap: break-word;',
      '        }',
      '        code {',
      '            font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;',
      '            font-size: 0.9rem;',
      '            line-height: 1.6;',
      '            color: #e2e8f0;',
      '        }',
      '    </style>',
      '</head>',
      '<body>',
      '    <div class="header">',
      '        <h1>' + sourceData.title + '</h1>',
      '        <p>' + sourceData.description + '</p>',
      '    </div>'
    ];

    // Add file containers
    sourceData.files.forEach(file => {
      htmlParts.push(
        '    <div class="file-container">',
        '        <div class="file-header">',
        '            <h3>' + file.name + '</h3>',
        '            <button class="copy-btn" onclick="copyCode(\'' + file.name + '\')">',
        '                Copy Code',
        '            </button>',
        '        </div>',
        '        <div class="code-content">',
        '            <pre><code id="code-' + file.name + '">' + escapeHtml(file.code) + '</code></pre>',
        '        </div>',
        '    </div>'
      );
    });

    // Add the script section
    htmlParts.push(
      '    <script>',
      '        function copyCode(fileName) {',
      '            const codeElement = document.getElementById("code-" + fileName);',
      '            const text = codeElement.textContent;',
      '            ',
      '            navigator.clipboard.writeText(text).then(() => {',
      '                const btn = event.target;',
      '                const originalText = btn.textContent;',
      '                btn.textContent = "Copied!";',
      '                btn.style.background = "linear-gradient(to right, #10b981, #059669)";',
      '                ',
      '                setTimeout(() => {',
      '                    btn.textContent = originalText;',
      '                    btn.style.background = "linear-gradient(to right, #10b981, #3b82f6)";',
      '                }, 2000);',
      '            }).catch(err => {',
      '                console.error("Failed to copy: ", err);',
      '                alert("Failed to copy code to clipboard");',
      '            });',
      '        }',
      '        ',
      '        document.addEventListener("keydown", (e) => {',
      '            if (e.key === "Escape") {',
      '                window.close();',
      '            }',
      '        });',
      '    </script>',
      '</body>',
      '</html>'
    );

    // Write the complete HTML
    popup.document.open();
    popup.document.write(htmlParts.join('\n'));
    popup.document.close();
    
  } catch (error) {
    console.error('Error opening source code viewer:', error);
    alert('Error opening source code viewer: ' + error.message);
  }
};

const ProjectDetail = () => {
  const { projectSlug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const project = projects.find(p => p.slug === projectSlug);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (project && project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === project.images.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [project]);

  // If project not found, redirect to home (after all hooks)
  if (!project) {
    return <Navigate to="/" replace />;
  }

  const iconMap = {
    Globe,
    Monitor,
    Smartphone,
    Code,
    Bot
  };

  const category = categories.find(cat => cat.id === project.category);
  const CategoryIcon = iconMap[category?.icon];

  // Get related projects (same category, excluding current)
  const relatedProjects = projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  const handleGithubClick = (e) => {
    e.preventDefault();
    
    if (project.github === 'source-code') {
      openSourceCodeViewer(project.slug);
    } else {
      window.open(project.github, '_blank');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            {CategoryIcon && <CategoryIcon size={24} className="text-blue-400" />}
            <span className="text-blue-400 font-medium">{category?.label}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {project.title}
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            {project.longDescription}
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={handleGithubClick}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 cursor-pointer"
              title="View Source Code"
            >
              <Github size={20} />
              View Code
            </button>
            <a
              href={project.demo}
              className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-full hover:border-gray-500 transition-all duration-300 hover:scale-105 bg-gray-800/50 backdrop-blur-sm"
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Images */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-800">
                <img
                  src={project.images ? project.images[currentImageIndex] : project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.images && project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Challenge & Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 text-orange-400">Challenge</h3>
                <p className="text-gray-300 leading-relaxed">{project.challenges}</p>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 text-green-400">Outcome</h3>
                <p className="text-gray-300 leading-relaxed">{project.outcome}</p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <button
                  onClick={handleGithubClick}
                  className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer w-full text-left"
                  title="View Source Code"
                >
                  <Github size={20} />
                  Source Code
                </button>
                <a
                  href={project.demo}
                  className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4">Related Projects</h3>
                <div className="space-y-4">
                  {relatedProjects.map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      to={`/projects/${relatedProject.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <img
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium group-hover:text-blue-400 transition-colors">
                            {relatedProject.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {relatedProject.description.substring(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;