import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Monitor, Bot, Globe, ExternalLink, Mail, Linkedin, Zap, Clock, TrendingUp } from 'lucide-react';
import { projects, categories } from '../data/projects';

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

  return (
    <div>
      {/* Hero Section - Redesigned */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="animate-on-scroll" id="hero-title">
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                I Turn AI Into Real Business Results
                <span className="block text-3xl md:text-4xl mt-4 text-gray-300">
                  (So You Don't Have To Learn It)
                </span>
              </h1>
              <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Most business owners know AI matters but don't have time to figure it out. I build the websites, apps, and automations that save you time and money.
              </p>
              <div className={`flex flex-wrap justify-center gap-4 text-base transition-all duration-1000 delay-500 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30 flex items-center gap-2">
                  <Clock size={18} />
                  Save Time
                </span>
                <span className="px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 flex items-center gap-2">
                  <TrendingUp size={18} />
                  Cut Costs
                </span>
                <span className="px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 flex items-center gap-2">
                  <Zap size={18} />
                  Modern Solutions
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-500/10 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>

      {/* How I Work Section - NEW */}
      <div className="container mx-auto px-6 py-16 border-b border-gray-800">
        <div className="animate-on-scroll max-w-4xl mx-auto" id="how-it-works">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-1000 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            How I Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Listen & Understand</h3>
              <p className="text-gray-400">I learn about your business challenges and goals. No tech jargon required.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Build with AI</h3>
              <p className="text-gray-400">I leverage AI tools to rapidly create solutions that would traditionally take months.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Deliver Results</h3>
              <p className="text-gray-400">You get working solutions that save time and reduce labor costs, without the learning curve.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section - Moved up */}
      <div className="container mx-auto px-6 py-20">
        <div className="animate-on-scroll mb-16" id="portfolio-header">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-1000 ${isVisible['portfolio-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Projects Built with AI
          </h2>
          <p className={`text-gray-400 text-center max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible['portfolio-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Real examples of what AI-powered development can achieve
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
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-gray-700/50 rounded-md text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-700/50 rounded-md text-gray-300">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3 relative z-20">
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

      {/* Contact Section - Simplified CTA */}
      <div className="animate-on-scroll py-20 border-t border-gray-800 bg-gradient-to-b from-transparent to-gray-900/50" id="contact">
        <div className={`container mx-auto px-6 text-center transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Talk About Your Project</h2>
          <p className="text-gray-300 text-lg mb-4 max-w-2xl mx-auto">
            Not sure if AI can help your business?
          </p>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I offer free 15-minute chats to explore ideas and see if we're a good fit.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <a
              href="mailto:mgwyman@gmail.com"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 text-lg font-semibold"
            >
              <Mail size={20} />
              Start a Conversation
            </a>
            <a
              href="https://linkedin.com"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-gray-700 rounded-full hover:border-gray-500 transition-all duration-300 hover:scale-105 bg-gray-800/50 backdrop-blur-sm"
            >
              <Linkedin size={20} />
              Connect on LinkedIn
            </a>
          </div>
          
          <p className="text-sm text-gray-500">
            mgwyman@gmail.com • Based in Montreal
          </p>
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