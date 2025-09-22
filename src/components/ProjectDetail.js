import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Code, Monitor, Smartphone, Bot, Globe } from 'lucide-react';
import { projects, categories } from '../data/projects';
import { openSourceCodeViewer } from '../utils/SourceCodeViewer';

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