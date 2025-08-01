import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import ManagePosts from './pages/ManagePosts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Menu } from 'lucide-react';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Mobile header */}
                  <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
                    <button
                      onClick={toggleSidebar}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Menu className="h-6 w-6" />
                    </button>
                  </div>
                  
                  {/* Page content */}
                  <main className="flex-1 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/create-post" element={<CreatePost />} />
                      <Route path="/manage-posts" element={<ManagePosts />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
