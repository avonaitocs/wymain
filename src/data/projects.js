export const projects = [
  // Working demos first
  {
    id: 1,
    title: "AI Order Generator",
    slug: "order-generator", 
    category: "productivity",
    description: "Generates optimized retail orders within budget constraints. Upload your catalog, set a budget, and get a smart product mix instantly.",
    longDescription: "An intelligent order generation platform that helps retailers create optimized orders based on budget constraints and product parameters. Upload your catalog and let AI generate the perfect order mix.",
    tech: ["React", "SheetJS", "AI Algorithm", "PDF Export"],
    image: "/screenshots/order-generator.png", // REPLACE WITH ACTUAL SCREENSHOT
    images: [
      "/screenshots/order-generator.png"
    ],
    github: "source-code",
    demo: "/order-generator",
    challenges: "Creating an intelligent algorithm that optimizes product selection within budget constraints",
    outcome: "Successfully generates optimized orders with Excel/PDF export capabilities",
    features: [
      "Smart catalog upload (CSV/JSON)",
      "Budget-based optimization",
      "Price range filtering", 
      "Excel & PDF export",
      "Real-time order generation"
    ]
  },
  {
    id: 7,
    title: "Snake Game",
    slug: "snake-game",
    category: "fun",
    description: "Classic Snake game built with React and Canvas. Shows rapid prototyping with modern web tech and game development concepts.",
    longDescription: "A modern take on the classic Snake game built with React and HTML5 Canvas. Features smooth gameplay, progressive difficulty, local high score tracking, and mobile-friendly controls. Demonstrates game development concepts, canvas manipulation, and responsive design.",
    tech: ["React", "HTML5 Canvas", "Local Storage", "CSS Animations"],
    image: "/screenshots/snake-game.png", // REPLACE WITH ACTUAL SCREENSHOT
    images: [
      "/screenshots/snake-game.png"
    ],
    github: "#",
    demo: "/snake-game",
    challenges: "Implementing smooth canvas-based game loop with collision detection and responsive controls",
    outcome: "Fully playable game with modern UI and mobile support, showcasing game development skills",
    features: [
      "Canvas-based smooth gameplay",
      "Progressive speed increase",
      "Collision detection system",
      "Mobile touch controls",
      "High score persistence",
      "Modern gradient styling",
      "Responsive design",
      "Keyboard and touch input"
    ]
  },
  // Other projects
  {
    id: 6,
    title: "AI-Powered E-commerce",
    slug: "ai-powered-ecommerce",
    category: "websites",
    description: "E-commerce platform with personalized product recommendations and intelligent search that learns from customer behavior.",
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
  },
  {
    id: 3,
    title: "Data Analysis Bot",
    slug: "data-analysis-bot",
    category: "bots",
    description: "Automated Discord bot that analyzes CSV files and generates statistical insights with charts on-demand.",
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
    id: 5,
    title: "ML Pipeline Manager",
    slug: "ml-pipeline-manager",
    category: "python",
    description: "Python framework that automates the machine learning workflow from data preprocessing to model deployment.",
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
    id: 2,
    title: "AI Assistant iOS App",
    slug: "ai-assistant-ios",
    category: "ios",
    description: "Native iOS app with voice recognition and intelligent task automation integrated with the iOS ecosystem.",
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
    
    id: 2,
    title: "Net Worth Tracker",
    slug: "net-worth-tracker",
    category: "macos",
    description: "A macOS app to track and visualize net worth with detailed financial summaries and trends.",
    longDescription: "A sleek macOS application designed to help users monitor their net worth over time. Features include real-time net worth calculation, 12-month trend visualization, monthly financial summaries, and a breakdown of assets and liabilities. Built with a user-friendly interface and modern design principles.",
    tech: ["React", "JavaScript", "CSS", "macOS", "Chart Visualization"],
    image: "/screenshots/net-worth-tracker.png", // REPLACE WITH ACTUAL SCREENSHOT
    images: [
      "/screenshots/net-worth-tracker.png"
    ],
    github: "#",
    demo: "/net-worth-tracker",
    challenges: "Integrating dynamic data updates and creating an intuitive chart-based trend visualization",
    outcome: "A fully functional net worth tracking tool with an engaging UI, offering users clear financial insights",
    features: [
      "Real-time net worth calculation",
      "12-month net worth trend chart",
      "Monthly financial summary",
      "Assets and liabilities breakdown",
      "User-friendly macOS interface",
      "Responsive design elements",
      "Data entry and update functionality"
    ]
}
];

export const categories = [
  { id: 'all', label: 'All Projects', icon: 'Globe' },
  { id: 'websites', label: 'Websites', icon: 'Monitor' },
  { id: 'ios', label: 'iOS Apps', icon: 'Smartphone' },
  { id: 'macos', label: 'macOS Apps', icon: 'Monitor' },
  { id: 'fun', label: 'Fun Stuff', icon: 'Code' },
  { id: 'productivity', label: 'Productivity', icon: 'Bot' }
];