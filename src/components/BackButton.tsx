
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to?: string;
}

export const BackButton = ({ to = '/library' }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(to);
  };
  
  return (
    <button 
      onClick={handleClick}
      aria-label="Go back"
      className="fixed top-6 left-6 p-3 rounded-full glass-card button-glow z-50 float-animation"
    >
      <ArrowLeft className="h-6 w-6 text-foreground" />
      <span className="sr-only">Back</span>
    </button>
  );
};
