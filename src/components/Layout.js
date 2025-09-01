import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {children}
      
      {/* Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>&copy; 2025 WYMaiN</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;