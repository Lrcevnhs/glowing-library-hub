
import { useNavigate } from 'react-router-dom';
import { Book, History as HistoryIcon, Plus, ArrowLeftRight, InfoIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TimeDisplay } from '@/components/TimeDisplay';
import { PageTransition } from '@/components/PageTransition';

const Library = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Borrow / Return Book',
      description: 'Issue or return books to students',
      icon: <ArrowLeftRight className="h-10 w-10" />,
      path: '/borrow-return',
      delay: 0.1
    },
    {
      title: 'Add Book',
      description: 'Add new books to the library',
      icon: <Plus className="h-10 w-10" />,
      path: '/add-book',
      delay: 0.2
    },
    {
      title: 'History',
      description: 'View borrowing records',
      icon: <HistoryIcon className="h-10 w-10" />,
      path: '/history',
      delay: 0.3
    },
    {
      title: 'About',
      description: 'School information',
      icon: <InfoIcon className="h-10 w-10" />,
      path: '/about',
      delay: 0.4
    }
  ];

  return (
    <div className="page-container bg-gradient-to-br from-library-light to-library-secondary dark:from-library-dark dark:to-black">
      <ThemeToggle />
      <TimeDisplay />
      
      <PageTransition>
        <div className="section-container mt-20">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3 neon-text">
              EVNHS Library System
            </h1>
            <p className="text-lg text-foreground/80">
              Equitable Village National High School Library Menu
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {menuItems.map((item, index) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="glass-card p-8 text-left transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50 group"
                style={{ 
                  animationDelay: `${item.delay}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h2>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <footer className="mt-16 text-center text-sm text-foreground/60">
            <p>© {new Date().getFullYear()} EVNHS Library Management System</p>
          </footer>
        </div>
      </PageTransition>
    </div>
  );
};

export default Library;
