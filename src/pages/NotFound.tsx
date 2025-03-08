
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PageTransition } from '@/components/PageTransition';
import { ThemeToggle } from '@/components/ThemeToggle';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-library-light to-library-secondary dark:from-library-dark dark:to-black">
      <ThemeToggle />
      
      <PageTransition>
        <div className="glass-card p-12 text-center max-w-md">
          <h1 className="text-6xl font-bold mb-4 neon-text">404</h1>
          <p className="text-xl text-foreground mb-8">Oops! Page not found</p>
          
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors button-glow"
          >
            Return to Home
          </button>
        </div>
      </PageTransition>
    </div>
  );
};

export default NotFound;
