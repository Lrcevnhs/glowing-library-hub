
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TimeDisplay } from '@/components/TimeDisplay';

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);
    
    // Simulate loading effect
    setTimeout(() => {
      navigate('/library');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-library-light to-library-secondary dark:from-library-dark dark:to-black transition-colors duration-500">
      <ThemeToggle />
      <TimeDisplay />
      
      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        {/* Logo/Header */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 animate-fade-in text-library-primary dark:text-library-primary">
            EVNHS
            <span className="neon-text"> LIBRARY</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Equitable Village National High School
          </p>
        </div>
        
        {/* Main Content */}
        <div className="glass-card p-10 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-xl mb-8">
            Welcome to the EVNHS Library Management System. 
            Access and manage book borrowing records with ease.
          </p>
          
          <button
            onClick={handleEnter}
            disabled={loading}
            className="button-glow relative bg-library-primary text-white text-xl font-medium py-4 px-12 rounded-full transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
            ) : (
              'Enter Library'
            )}
          </button>
        </div>
        
        {/* School Info */}
        <div className="text-sm text-foreground/70 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p>© {new Date().getFullYear()} Equitable Village National High School</p>
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full bg-library-primary/20 blur-3xl -top-20 -left-20 animate-float"></div>
        <div className="absolute w-96 h-96 rounded-full bg-library-accent/10 blur-3xl bottom-20 -right-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default Index;
