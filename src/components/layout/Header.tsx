import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, userName, onLogout }) => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">AuthSecure</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {userName && <span className="text-sm text-muted-foreground">Welcome, {userName}</span>}
              <NavLink to="/dashboard" className={navLinkClasses}>
                <LayoutDashboard className="h-4 w-4 mr-1 inline-block" />
                Dashboard
              </NavLink>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/" className={navLinkClasses}>
                <LogIn className="h-4 w-4 mr-1 inline-block" />
                Login
              </NavLink>
              <NavLink to="/registration" className={navLinkClasses}>
                <UserPlus className="h-4 w-4 mr-1 inline-block" />
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;