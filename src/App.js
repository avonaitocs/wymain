import React, { useState } from 'react';
import { Lock, Plus, Copy, CheckCircle, Code } from 'lucide-react';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simple password - change this to whatever you want
  const ADMIN_PASSWORD = 'portfolio2025';

  const [formData, setFormData] = useState({
    title: '',
    category: 'websites',
    description: '',
    longDescription: '',
    tech: '',
    image: '',
    github: '',
    demo: '',
    challenges: '',
    outcome: '',
    features: ''
  });

  const categories = [
    { id: 'websites', label: 'Websites' },
    { id: 'ios', label: 'iOS Apps' },
    { id: 'macos', label: 'macOS Apps' },
    { id: 'python', label: 'Python' },
    { id: 'bots', label: 'Bots' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const generateProjectCode = () => {
    const slug = createSlug(formData.title);
    const techArray = formData.tech.split(',').map(tech => tech.trim()).filter(tech => tech);
    const featuresArray = formData.features.split('\n').map(feature => feature.trim()).filter(feature => feature);

    // Get next ID (you'll need to manually check and update this)
    const nextId = 'NEXT_ID'; // Placeholder - user will need to replace

    const projectObject = {
      id: nextId,
      title: formData.title,
      slug: slug,
      category: formData.category,
      description: formData.description,
      longDescription: formData.longDescription,
      tech: techArray,
      image: formData.image,
      github: formData.github,
      demo: formData.demo,
      challenges: formData.challenges,
      outcome: formData.outcome,
      features: featuresArray
    };

    const codeString = `{
  id: ${nextId}, // ← Replace NEXT_ID with the actual next number (e.g., 7, 8, 9...)
  title: "${projectObject.title}",
  slug: "${projectObject.slug}",
  category: "${projectObject.category}",
  description: "${projectObject.description}",
  longDescription: "${projectObject.longDescription}",
  tech: [${techArray.map(tech => `"${tech}"`).join(', ')}],
  image: "${projectObject.image}",
  github: "${projectObject.github}",
  demo: "${projectObject.demo}",
  challenges: "${projectObject.challenges}",
  outcome: "${projectObject.outcome}",
  features: [
${featuresArray.map(feature => `    "${feature}"`).join(',\n')}
  ]
}`;

    setGeneratedCode(codeString);
    setShowPreview(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'websites',
      description: '',
      longDescription: '',
      tech: '',
      image: '',
      github: '',
      demo: '',
      challenges: '',
      outcome: '',
      features: ''
    });
    setGeneratedCode('');
    setShowPreview(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 w-full max-w-md">
          <div className="text-center mb-6">
            <Lock className="mx-auto mb-4 text-blue-400" size={48} />
            <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
            <p className="text-gray-400">Enter password to manage projects</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 mb-4"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio Admin Panel
          </h1>
          <p className="text-gray-400">Add new projects to your portfolio</p>
        </div>

        {!showPreview ? (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Plus size={24} className="text-green-400" />
              Add New Project
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="My Awesome Project"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                {formData.title && (
                  <p className="text-xs text-gray-400 mt-1">
                    Slug: {createSlug(formData.title)}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Short Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Short Description *</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description for project cards..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Long Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Detailed Description *</label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => handleInputChange('longDescription', e.target.value)}
                  placeholder="Detailed description for project page..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium mb-2">Technologies *</label>
                <input
                  type="text"
                  value={formData.tech}
                  onChange={(e) => handleInputChange('tech', e.target.value)}
                  placeholder="React, Node.js, MongoDB (comma separated)"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium mb-2">Image URL *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL *</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Demo URL */}
              <div>
                <label className="block text-sm font-medium mb-2">Demo URL *</label>
                <input
                  type="url"
                  value={formData.demo}
                  onChange={(e) => handleInputChange('demo', e.target.value)}
                  placeholder="https://myproject.netlify.app"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Challenges */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Main Challenge *</label>
                <textarea
                  value={formData.challenges}
                  onChange={(e) => handleInputChange('challenges', e.target.value)}
                  placeholder="What was the main technical challenge you solved?"
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Outcome */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Outcome/Impact *</label>
                <textarea
                  value={formData.outcome}
                  onChange={(e) => handleInputChange('outcome', e.target.value)}
                  placeholder="What was the result or impact of this project?"
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Features */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Key Features *</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => handleInputChange('features', e.target.value)}
                  placeholder="Enter each feature on a new line..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Enter each feature on a separate line</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={generateProjectCode}
                disabled={!formData.title || !formData.description}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Code size={20} />
                Generate Code
              </button>
              <button
                onClick={resetForm}
                className="px-8 py-3 border border-gray-700 rounded-lg hover:border-gray-500 transition-all"
              >
                Reset Form
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="text-green-400" size={24} />
              Generated Project Code
            </h2>

            <div className="bg-gray-900 rounded-lg p-6 mb-6 relative">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{generatedCode}</code>
              </pre>
              <button
                onClick={copyToClipboard}
                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-all"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-2 text-yellow-400">📋 Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                <li>Copy the code above</li>
                <li>Open <code>src/data/projects.js</code></li>
                <li>Add a comma after the last project</li>
                <li>Paste this code as the new project</li>
                <li>Replace "NEXT_ID" with the actual next number</li>
                <li>Save the file and git push to deploy</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-8 py-3 border border-gray-700 rounded-lg hover:border-gray-500 transition-all"
              >
                ← Back to Form
              </button>
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all"
              >
                Add Another Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;