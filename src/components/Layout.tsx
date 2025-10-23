
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, Calendar, Stethoscope, Users, BookOpen, User, Heart } from 'lucide-react';
import { Button } from './ui/button';

export default function Layout() {
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/', icon: Activity },
    { name: 'Biometrics', path: '/biometrics', icon: Heart },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Treatments', path: '/treatments', icon: Stethoscope },
    { name: 'Athletes', path: '/athletes', icon: Users },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SportsMed Pro
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 SportsMed Pro. Professional sports medicine management.
          </p>
        </div>
      </footer>
    </div>
  );
}