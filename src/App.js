import React, { useState, useEffect } from 'react';
import { Code, Smartphone, Monitor, Bot, Globe, Github, ExternalLink, Mail, Linkedin } from 'lucide-react';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState({});

  // Project data - easily updatable
  const projects = [
    {
      id: 1,
      title: "AI Chat Interface",
      category: "websites",
      description: "Modern web interface for AI conversation with real-time responses and context awareness",
      tech: ["React", "Node.js", "OpenAI API", "WebSockets"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      github: "javascript:void(0)",
      demo: "javascript:void(0)"
    },
    {
      id: 2,
      title: "AI Assistant iOS App",
      category: "ios",
      description: "Native iOS app with voice recognition and intelligent task automation",
      tech: ["Swift", "Core ML", "Speech Framework", "CloudKit"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      ggithub: "javascript:void(0)",
      demo: "javascript:void(0)"
    },
    {
      id: 3,
      title: "Data Analysis Bot",
      category: "bots",
      description: "Automated bot that processes large datasets and generates insights using machine learning",
      tech: ["Python", "Pandas", "Scikit-learn", "Discord.py"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      github: "javascript:void(0)",
      demo: "javascript:void(0)"
    },
    {
      id: 4,
      title: "Smart Desktop Assistant",
      category: "macos",
      description: "macOS application with AI-powered file organization and workflow automation",
      tech: ["Swift", "AppKit", "Create ML", "Automator"],
      image: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      github: "javascript:void(0)",
      demo: "javascript:void(0)"
    },
    {
      id: 5,
      title: "ML Pipeline Manager",
      category: "python",
      description: "Python framework for managing machine learning pipelines with automated model training",
      tech: ["Python", "TensorFlow", "FastAPI", "Docker"],
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      github: "javascript:void(0)",
      demo: "javascript:void(0)"
    },
    {
      id: 6,
      title: "AI-Powered E-commerce",
      category: "websites",
      description: "E-commerce platform with AI recommendations and intelligent search functionality",
      tech: ["Next.js", "TailwindCSS", "Python", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      github: "javascript:void(0)",
      demo: "javascript:void(0)"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe },
    { id: 'websites', label: 'Websites', icon: Monitor },
    { id: 'ios', label: 'iOS Apps', icon: Smartphone },
    { id: 'macos', label: 'macOS Apps', icon: Monitor },
    { id: 'python', label: 'Python', icon: Code },
    { id: 'bots', label: 'Bots', icon: Bot }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="animate-on-scroll" id="hero-title">
              <h1 className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-1000 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                AI Developer
              </h1>
              <p className={`text-xl md:text-2xl text-gray-300 mb-8 transition-all duration-1000 delay-300 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Intelligent solutions across platforms
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
            Explore my latest work in AI-powered applications and intelligent systems
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
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
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
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
                
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
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
              href="mailto:hello@yourdomain.com"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              <Mail size={20} />
              Get In Touch
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-8 py-4 border border-gray-700 rounded-full hover:border-gray-500 transition-all duration-300 hover:scale-105 bg-gray-800/50 backdrop-blur-sm"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>&copy; 2024 Your Name. Crafted with AI and creativity.</p>
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

export default Portfolio;