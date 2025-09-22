import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Monitor, Bot, Globe, Github, ExternalLink, Mail, Linkedin } from 'lucide-react';
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

// Function to open source code viewer - using string concatenation to avoid template literal issues
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

    // Build HTML content using string concatenation to avoid template literal parsing issues
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

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState({});

  const iconMap = {
    Globe,
    Monitor,
    Smartphone,
    Code,
    Bot
  };

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleGithubClick = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (project.github === 'source-code') {
      openSourceCodeViewer(project.slug);
    } else {
      window.open(project.github, '_blank');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="animate-on-scroll" id="hero-title">
            <h1 className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
    WYM
  </span>
  <span className="text-yellow-400 drop-shadow-lg animate-pulse">ai</span>
  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
    N
  </span>
</h1>
              <p className={`text-xl md:text-2xl text-gray-300 mb-8 transition-all duration-1000 delay-300 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                ai Projects
              </p>
              <div className={`flex flex-wrap justify-center gap-4 text-sm md:text-base transition-all duration-1000 delay-500 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">Web Development</span>
                <span className="px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">iOS & macOS</span>
                <span className="px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">Python & ML</span>
                <span className="px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30">AI Bots</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-500/10 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>

      {/* Portfolio Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="animate-on-scroll mb-16" id="portfolio-header">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-1000 ${isVisible['portfolio-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Featured Projects
          </h2>
          <p className={`text-gray-400 text-center max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible['portfolio-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Projects completed with AI
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white shadow-lg shadow-blue-500/25'
                    : 'border-gray-700 hover:border-gray-500 bg-gray-800/50 backdrop-blur-sm'
                }`}
              >
                <IconComponent size={18} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 ${
                activeCategory !== 'all' ? 'animate-fade-in' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <Link
                  to={`/projects/${project.slug}`}
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">View {project.title}</span>
                </Link>
              </div>
              
              <div className="p-6">
                <Link to={`/projects/${project.slug}`}>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-gray-700/50 rounded-md text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 relative z-20">
                  <button
                    onClick={(e) => handleGithubClick(e, project)}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                    title="View Source Code"
                  >
                    <Github size={16} />
                    Code
                  </button>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-400 transition-colors ml-auto"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="animate-on-scroll py-20 border-t border-gray-800" id="contact">
        <div className={`container mx-auto px-6 text-center transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-6">Let's Build Something Amazing</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Ready to discuss your next AI project? I'm always interested in collaborating on innovative solutions.
          </p>
          
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="mailto:mgwyman@gmail.com"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              <Mail size={20} />
              Get In Touch
            </a>
            <a
              href="https://linkedin.com"
              className="flex items-center gap-2 px-8 py-4 border border-gray-700 rounded-full hover:border-gray-500 transition-all duration-300 hover:scale-105 bg-gray-800/50 backdrop-blur-sm"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Home;