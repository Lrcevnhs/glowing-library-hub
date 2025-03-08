
import { BackButton } from '@/components/BackButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TimeDisplay } from '@/components/TimeDisplay';
import { PageTransition } from '@/components/PageTransition';
import { Facebook, MapPin, Phone, School, Calendar, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="page-container bg-gradient-to-br from-library-light to-library-secondary dark:from-library-dark dark:to-black">
      <BackButton to="/library" />
      <ThemeToggle />
      <TimeDisplay />
      
      <PageTransition>
        <div className="section-container mt-20 max-w-3xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3 neon-text">
              About EVNHS
            </h1>
            <p className="text-lg text-foreground/80 mb-6">
              Equitable Village National High School
            </p>
          </header>
          
          <div className="glass-card p-8 mb-12 animate-fade-in-up">
            <div className="space-y-8">
              {/* School Logo/Heading */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
                  <School className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Equitable Village National High School</h2>
                <p className="text-muted-foreground mt-1">Las Piñas, Metro Manila</p>
              </div>
              
              {/* School Information */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">C2M2+6QJ, Tulips St, Las Piñas, 1740 Metro Manila</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Contact</h3>
                    <p className="text-muted-foreground">(02) 8802 3845</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <School className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">School ID</h3>
                    <p className="text-muted-foreground">320301</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Facebook className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Social Media</h3>
                    <a 
                      href="https://www.facebook.com/EquitableVillageNHS" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline transition-all"
                    >
                      facebook.com/EquitableVillageNHS
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Library Information */}
              <div className="bg-primary/5 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Library Hours
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">7:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">8:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Library Policies</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Books can be borrowed for up to 7 days</li>
                      <li>• Students must present school ID</li>
                      <li>• Lost books must be replaced</li>
                      <li>• Maintain silence in the library</li>
                      <li>• No food or drinks allowed</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* System Information */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-2">About This System</h3>
                <p className="text-muted-foreground">
                  This Library Management System was developed for Equitable Village National High School
                  to streamline book borrowing processes and maintain digital records of all transactions.
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Version 1.0.0</span>
                  <span>© {new Date().getFullYear()} EVNHS Library</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default About;
