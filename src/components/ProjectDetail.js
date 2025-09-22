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

// Function to open source code viewer - using string concatenation
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

    // Build HTML content using string concatenation
    let htmlContent = '<!DOCTYPE html>\n';
    htmlContent += '<html lang="en">\n';
    htmlContent += '<head>\n';
    htmlContent += '    <meta charset="UTF-8">\n';
    htmlContent += '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    htmlContent += '    <title>' + sourceData.title + ' - Source Code</title>\n';
    htmlContent += '    <style>\n';
    htmlContent += '        body {\n';
    htmlContent += '            margin: 0;\n';
    htmlContent += '            padding: 20px;\n';
    htmlContent += '            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);\n';
    htmlContent += '            color: #ffffff;\n';
    htmlContent += '            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;\n';
    htmlContent += '            min-height: 100vh;\n';
    htmlContent += '        }\n';
    htmlContent += '        .header {\n';
    htmlContent += '            text-align: center;\n';
    htmlContent += '            margin-bottom: 2rem;\n';
    htmlContent += '            padding: 2rem;\n';
    htmlContent += '            background: rgba(55, 65, 81, 0.3);\n';
    htmlContent += '            border-radius: 1rem;\n';
    htmlContent += '            border: 1px solid rgba(75, 85, 99, 0.3);\n';
    htmlContent += '        }\n';
    htmlContent += '        .header h1 {\n';
    htmlContent += '            font-size: 2.5rem;\n';
    htmlContent += '            font-weight: bold;\n';
    htmlContent += '            background: linear-gradient(to right, #60a5fa, #a78bfa);\n';
    htmlContent += '            -webkit-background-clip: text;\n';
    htmlContent += '            -webkit-text-fill-color: transparent;\n';
    htmlContent += '            margin: 0 0 1rem 0;\n';
    htmlContent += '        }\n';
    htmlContent += '        .header p {\n';
    htmlContent += '            color: #d1d5db;\n';
    htmlContent += '            font-size: 1.1rem;\n';
    htmlContent += '            margin: 0;\n';
    htmlContent += '        }\n';
    htmlContent += '        .file-container {\n';
    htmlContent += '            background: rgba(31, 41, 55, 0.8);\n';
    htmlContent += '            border-radius: 1rem;\n';
    htmlContent += '            border: 1px solid rgba(75, 85, 99, 0.3);\n';
    htmlContent += '            overflow: hidden;\n';
    htmlContent += '            margin-bottom: 2rem;\n';
    htmlContent += '        }\n';
    htmlContent += '        .file-header {\n';
    htmlContent += '            padding: 1rem 1.5rem;\n';
    htmlContent += '            background: rgba(55, 65, 81, 0.5);\n';
    htmlContent += '            border-bottom: 1px solid rgba(75, 85, 99, 0.3);\n';
    htmlContent += '            display: flex;\n';
    htmlContent += '            align-items: center;\n';
    htmlContent += '            justify-content: space-between;\n';
    htmlContent += '        }\n';
    htmlContent += '        .file-header h3 {\n';
    htmlContent += '            margin: 0;\n';
    htmlContent += '            color: #f3f4f6;\n';
    htmlContent += '            font-size: 1.1rem;\n';
    htmlContent += '            font-weight: 600;\n';
    htmlContent += '        }\n';
    htmlContent += '        .copy-btn {\n';
    htmlContent += '            padding: 0.5rem 1rem;\n';
    htmlContent += '            background: linear-gradient(to right, #10b981, #3b82f6);\n';
    htmlContent += '            border: none;\n';
    htmlContent += '            border-radius: 0.5rem;\n';
    htmlContent += '            color: white;\n';
    htmlContent += '            cursor: pointer;\n';
    htmlContent += '            font-weight: 500;\n';
    htmlContent += '        }\n';
    htmlContent += '        .copy-btn:hover {\n';
    htmlContent += '            transform: scale(1.05);\n';
    htmlContent += '        }\n';
    htmlContent += '        .code-content {\n';
    htmlContent += '            padding: 1.5rem;\n';
    htmlContent += '            overflow-x: auto;\n';
    htmlContent += '            max-height: 60vh;\n';
    htmlContent += '        }\n';
    htmlContent += '        pre {\n';
    htmlContent += '            margin: 0;\n';
    htmlContent += '            white-space: pre-wrap;\n';
    htmlContent += '            word-wrap: break-word;\n';
    htmlContent += '        }\n';
    htmlContent += '        code {\n';
    htmlContent += '            font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;\n';
    htmlContent += '            font-size: 0.9rem;\n';
    htmlContent += '            line-height: 1.6;\n';
    htmlContent += '            color: #e5e7eb;\n';
    htmlContent += '        }\n';
    htmlContent += '    </style>\n';
    htmlContent += '</head>\n';
    htmlContent += '<body>\n';
    htmlContent += '    <div class="header">\n';
    htmlContent += '        <h1>' + sourceData.title + '</h1>\n';
    htmlContent += '        <p>' + sourceData.description + '</p>\n';
    htmlContent += '    </div>\n';
    
    // Add file containers
    sourceData.files.forEach(file => {
      htmlContent += '    <div class="file-container">\n';
      htmlContent += '        <div class="file-header">\n';
      htmlContent += '            <h3>' + file.name + '</h3>\n';
      htmlContent += '            <button class="copy-btn" onclick="copyCode(\'' + file.name + '\')">\n';
      htmlContent += '                Copy Code\n';
      htmlContent += '            </button>\n';
      htmlContent += '        </div>\n';
      htmlContent += '        <div class="code-content">\n';
      htmlContent += '            <pre><code id="code-' + file.name + '">' + escapeHtml(file.code) + '</code></pre>\n';
      htmlContent += '        </div>\n';
      htmlContent += '    </div>\n';
    });
    
    htmlContent += '    <script>\n';
    htmlContent += '        function copyCode(fileName) {\n';
    htmlContent += '            const codeElement = document.getElementById("code-" + fileName);\n';
    htmlContent += '            const text = codeElement.textContent;\n';
    htmlContent += '            \n';
    htmlContent += '            navigator.clipboard.writeText(text).then(() => {\n';
    htmlContent += '                const btn = event.target;\n';
    htmlContent += '                const originalText = btn.textContent;\n';
    htmlContent += '                btn.textContent = "Copied!";\n';
    htmlContent += '                btn.style.background = "linear-gradient(to right, #10b981, #059669)";\n';
    htmlContent += '                \n';
    htmlContent += '                setTimeout(() => {\n';
    htmlContent += '                    btn.textContent = originalText;\n';
    htmlContent += '                    btn.style.background = "linear-gradient(to right, #10b981, #3b82f6)";\n';
    htmlContent += '                }, 2000);\n';
    htmlContent += '            }).catch(err => {\n';
    htmlContent += '                console.error("Failed to copy: ", err);\n';
    htmlContent += '                alert("Failed to copy code to clipboard");\n';
    htmlContent += '            });\n';
    htmlContent += '        }\n';
    htmlContent += '        \n';
    htmlContent += '        document.addEventListener("keydown", (e) => {\n';
    htmlContent += '            if (e.key === "Escape") {\n';
    htmlContent += '                window.close();\n';
    htmlContent += '            }\n';
    htmlContent += '        });\n';
    htmlContent += '    </script>\n';
    htmlContent += '</body>\n';
    htmlContent += '</html>';

    popup.document.open();
    popup.document.write(htmlContent);
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