import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProps } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  Menu, 
  X,
  BarChart3,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import logo from '../assets/images/MindofAmin.jpg';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      current: location.pathname === '/'
    },
    {
      name: 'Create Post',
      href: '/create-post',
      icon: Plus,
      current: location.pathname === '/create-post'
    },
    {
      name: 'Manage Posts',
      href: '/manage-posts',
      icon: FileText,
      current: location.pathname === '/manage-posts'
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static
        w-64 border-r border-gray-200
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Mind of Admin Logo" 
              className="h-[100px] w-[150px] rounded-lg "
            />
            {/* <h1 className="text-lg font-bold text-gray-800">Mind of Admin</h1> */}
          </Link>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${item.current
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {user?.displayName || user?.email || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@mindofadmin.com'}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 