import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import AdminPanel from './components/AdminPanel';
import OrderGenerator from './components/OrderGenerator';
import SnakeGame from './components/SnakeGame';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/order-generator" element={<OrderGenerator />} />
          <Route path="/snake-game" element={<SnakeGame />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;