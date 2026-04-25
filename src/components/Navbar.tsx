import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings as SettingsIcon, LayoutGrid, Terminal, Cpu } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="navbar-brand">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)', 
                padding: '7px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-bright)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}>
                <Terminal size={18} color="#fafafa" strokeWidth={2.5} />
              </div>
              <span>AlgoSolved AI</span>
            </Link>
          </div>

          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>AI System Active</span>
          </div>
        </div>

        <ul className="navbar-nav">
          <li>
            <Link to="/problems" className={`nav-item ${isActive('/problems') ? 'active' : ''}`}>
              <LayoutGrid size={16} />
              Problems
            </Link>
          </li>
          <li>
            <Link to="/settings" className={`nav-item ${isActive('/settings') ? 'active' : ''}`}>
              <SettingsIcon size={16} />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
