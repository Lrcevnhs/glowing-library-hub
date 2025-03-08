
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BackButton } from '@/components/BackButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TimeDisplay } from '@/components/TimeDisplay';
import { PageTransition } from '@/components/PageTransition';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Book } from '@/utils/autoDeletion';
import { toast } from 'sonner';
import { BookPlus, Trash2 } from 'lucide-react';

const AddBook = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  
  // Books storage
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !author) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Create new book
    const newBook: Book = {
      id: uuidv4(),
      title,
      author
    };
    
    // Add book to storage
    setBooks([...books, newBook]);
    
    // Show success message
    toast.success(`"${title}" has been added to the library!`);
    
    // Reset form
    setTitle('');
    setAuthor('');
  };
  
  // Handle book deletion
  const handleDeleteBook = (id: string) => {
    // Remove book from storage
    setBooks(books.filter(book => book.id !== id));
    
    // Show success message
    toast.success('Book has been removed from the library');
  };
  
  return (
    <div className="page-container bg-gradient-to-br from-library-light to-library-secondary dark:from-library-dark dark:to-black">
      <BackButton />
      <ThemeToggle />
      <TimeDisplay />
      
      <PageTransition>
        <div className="section-container mt-20 max-w-4xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3 neon-text">
              Add Book
            </h1>
            <p className="text-lg text-foreground/80 mb-6">
              Add new books to the library collection or remove existing ones
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Add Book Form */}
            <div className="glass-card p-8 animate-fade-in-left">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <BookPlus className="mr-2 h-5 w-5" />
                <span>Add New Book</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Book Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Enter book title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="author" className="block text-sm font-medium mb-1">
                    Author <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Enter author name"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full button-glow bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center"
                >
                  <BookPlus className="mr-2 h-5 w-5" />
                  Add Book
                </button>
              </form>
            </div>
            
            {/* Book List */}
            <div className="glass-card p-8 animate-fade-in-right">
              <h2 className="text-xl font-semibold mb-6">Library Collection</h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {books.length > 0 ? (
                  books.map((book) => (
                    <div 
                      key={book.id} 
                      className="flex items-center justify-between p-4 border rounded-lg bg-background/40 hover:bg-background/60 transition-colors duration-200"
                    >
                      <div>
                        <h3 className="font-medium">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">by {book.author}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteBook(book.id)}
                        className="text-muted-foreground hover:text-destructive p-2 rounded-full transition-colors duration-200"
                        aria-label={`Delete ${book.title}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No books in the library yet.</p>
                    <p className="text-sm mt-2">Add your first book using the form.</p>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground mt-6 text-center">
                {books.length > 0 && (
                  <p>{books.length} book{books.length !== 1 ? 's' : ''} in the library</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default AddBook;
