export const projects = [
    {
      id: 1,
      title: "AI Chat Interface",
      slug: "ai-chat-interface",
      category: "websites",
      description: "Modern web interface for AI conversation with real-time responses and context awareness",
      longDescription: "A sophisticated web application that provides an intuitive interface for AI-powered conversations. Features real-time message streaming, context-aware responses, and a beautiful, responsive design. Built with modern React patterns and optimized for performance.",
      tech: ["React", "Node.js", "OpenAI API", "WebSockets"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      images: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80",
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80"
      ],
      github: "#",
      demo: "#",
      challenges: "Implementing real-time streaming responses while maintaining context across conversations",
      outcome: "Successfully deployed application serving 1000+ daily conversations with 99.9% uptime",
      features: [
        "Real-time message streaming",
        "Context-aware conversations",
        "Dark/light theme support", 
        "Message history persistence",
        "Responsive mobile design"
      ]
    },
    {
      id: 2,
      title: "AI Assistant iOS App",
      slug: "ai-assistant-ios",
      category: "ios",
      description: "Native iOS app with voice recognition and intelligent task automation",
      longDescription: "A comprehensive iOS application that brings AI assistance to your pocket. Featuring advanced voice recognition, natural language processing, and seamless integration with iOS ecosystem. The app can automate various tasks and provide intelligent suggestions based on user behavior.",
      tech: ["Swift", "Core ML", "Speech Framework", "CloudKit"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80"
      ],
      github: "#",
      demo: "#",
      challenges: "Optimizing Core ML models for on-device processing while maintaining accuracy",
      outcome: "App Store release with 4.8-star rating and 10,000+ downloads in first month",
      features: [
        "Voice command recognition",
        "Smart task automation",
        "Widget support",
        "Offline functionality",
        "Integration with iOS shortcuts"
      ]
    },
    {
      id: 3,
      title: "Data Analysis Bot",
      slug: "data-analysis-bot",
      category: "bots",
      description: "Automated bot that processes large datasets and generates insights using machine learning",
      longDescription: "An intelligent Discord bot that can analyze CSV files, generate statistical insights, and create visualizations on-demand. Users can upload datasets and receive comprehensive analysis reports with charts, trends, and actionable insights.",
      tech: ["Python", "Pandas", "Scikit-learn", "Discord.py"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80"
      ],
      github: "#",
      demo: "#",
      challenges: "Processing large datasets efficiently while maintaining responsive bot interactions",
      outcome: "Successfully analyzing 50+ datasets daily across multiple Discord servers",
      features: [
        "Automated data processing",
        "Statistical analysis generation",
        "Data visualization creation",
        "Natural language queries",
        "Export to multiple formats"
      ]
    },
    {
      id: 4,
      title: "Smart Desktop Assistant",
      slug: "smart-desktop-assistant",
      category: "macos",
      description: "macOS application with AI-powered file organization and workflow automation",
      longDescription: "A powerful macOS application that intelligently organizes your files and automates repetitive workflows. Using machine learning algorithms, it learns from user behavior to suggest optimal file organization and can automatically sort documents based on content analysis.",
      tech: ["Swift", "AppKit", "Create ML", "Automator"],
      image: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      images: [
        "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80"
      ],
      github: "#",
      demo: "#",
      challenges: "Balancing automation with user control while ensuring file safety",
      outcome: "Improved user productivity by 40% with intelligent file organization",
      features: [
        "AI-powered file organization",
        "Workflow automation",
        "Smart folder suggestions",
        "Duplicate file detection",
        "Batch processing capabilities"
      ]
    },
    {
      id: 5,
      title: "ML Pipeline Manager",
      slug: "ml-pipeline-manager",
      category: "python",
      description: "Python framework for managing machine learning pipelines with automated model training",
      longDescription: "A comprehensive Python framework that streamlines the machine learning lifecycle from data preprocessing to model deployment. Features automated hyperparameter tuning, experiment tracking, and seamless integration with popular ML libraries.",
      tech: ["Python", "TensorFlow", "FastAPI", "Docker"],
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      images: [
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80",
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80"
      ],
      github: "#",
      demo: "#",
      challenges: "Creating a flexible framework that works with various ML algorithms and datasets",
      outcome: "Reduced model development time by 60% with automated pipeline management",
      features: [
        "Automated model training",
        "Experiment tracking",
        "Hyperparameter optimization",
        "Model versioning",
        "API deployment automation"
      ]
    },
    {
      id: 6,
      title: "AI-Powered E-commerce",
      slug: "ai-powered-ecommerce",
      category: "websites",
      description: "E-commerce platform with AI recommendations and intelligent search functionality",
      longDescription: "A modern e-commerce platform that leverages AI to enhance user experience through personalized product recommendations, intelligent search capabilities, and dynamic pricing optimization. Built with scalability and performance in mind.",
      tech: ["Next.js", "TailwindCSS", "Python", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&crop=entropy&auto=format&q=80",
      images: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&crop=entropy&auto=format&q=80"
      ],
      github: "#",
      demo: "#",
      challenges: "Implementing real-time recommendations while maintaining fast page load times",
      outcome: "Increased conversion rates by 35% with AI-powered personalization",
      features: [
        "Personalized recommendations",
        "Intelligent search",
        "Dynamic pricing",
        "Inventory optimization",
        "Customer behavior analytics"
      ]
    }
  ];
  
  export const categories = [
    { id: 'all', label: 'All Projects', icon: 'Globe' },
    { id: 'websites', label: 'Websites', icon: 'Monitor' },
    { id: 'ios', label: 'iOS Apps', icon: 'Smartphone' },
    { id: 'macos', label: 'macOS Apps', icon: 'Monitor' },
    { id: 'python', label: 'Python', icon: 'Code' },
    { id: 'bots', label: 'Bots', icon: 'Bot' }
  ];