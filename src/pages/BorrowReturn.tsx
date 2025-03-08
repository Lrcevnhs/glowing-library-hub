
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BackButton } from '@/components/BackButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TimeDisplay } from '@/components/TimeDisplay';
import { PageTransition } from '@/components/PageTransition';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatDateForDisplay, getPhilippinesTime } from '@/utils/dateUtils';
import { StudentRecord, Book } from '@/utils/autoDeletion';
import { toast } from 'sonner';
import { ArrowRightLeft } from 'lucide-react';

const BorrowReturn = () => {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gradeSection, setGradeSection] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [formAction, setFormAction] = useState<'borrow' | 'return'>('borrow');
  
  // Storage state
  const [books] = useLocalStorage<Book[]>('books', []);
  const [records, setRecords] = useLocalStorage<StudentRecord[]>('borrowRecords', []);
  const [returnOptions, setReturnOptions] = useState<StudentRecord[]>([]);
  
  // Set return options based on currently borrowed books
  useEffect(() => {
    if (formAction === 'return') {
      const borrowedBooks = records.filter(record => record.status === 'Borrowed');
      setReturnOptions(borrowedBooks);
    }
  }, [formAction, records]);
  
  // Reset form fields
  const resetForm = () => {
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setGradeSection('');
    setSelectedBook('');
  };
  
  // Handle borrow submission
  const handleBorrow = () => {
    // Validation
    if (!firstName || !lastName || !gradeSection || !selectedBook) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const selectedBookObj = books.find(book => book.id === selectedBook);
    if (!selectedBookObj) {
      toast.error('Please select a valid book');
      return;
    }
    
    // Create new record
    const newRecord: StudentRecord = {
      id: uuidv4(),
      firstName,
      middleName,
      lastName,
      gradeSection,
      bookTitle: selectedBookObj.title,
      bookAuthor: selectedBookObj.author,
      dateBorrowed: formatDateForDisplay(getPhilippinesTime()),
      status: 'Borrowed'
    };
    
    // Update records
    setRecords([...records, newRecord]);
    
    // Show success message
    toast.success(`${selectedBookObj.title} has been borrowed successfully!`);
    
    // Reset form
    resetForm();
  };
  
  // Handle return submission
  const handleReturn = () => {
    // Validation
    if (!selectedBook) {
      toast.error('Please select a book to return');
      return;
    }
    
    // Update record status
    const updatedRecords = records.map(record => {
      if (record.id === selectedBook) {
        return {
          ...record,
          status: 'Returned',
          dateReturned: formatDateForDisplay(getPhilippinesTime())
        };
      }
      return record;
    });
    
    // Update records
    setRecords(updatedRecords);
    
    // Show success message
    const returnedBook = records.find(record => record.id === selectedBook);
    if (returnedBook) {
      toast.success(`${returnedBook.bookTitle} has been returned successfully!`);
    }
    
    // Reset form
    resetForm();
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formAction === 'borrow') {
      handleBorrow();
    } else {
      handleReturn();
    }
  };
  
  return (
    <div className="page-container bg-gradient-to-br from-library-light to-library-secondary dark:from-library-dark dark:to-black">
      <BackButton />
      <ThemeToggle />
      <TimeDisplay />
      
      <PageTransition>
        <div className="section-container mt-20 max-w-3xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3 neon-text">
              {formAction === 'borrow' ? 'Borrow a Book' : 'Return a Book'}
            </h1>
            <p className="text-lg text-foreground/80 mb-6">
              {formAction === 'borrow' 
                ? 'Fill out the form to borrow a book from the library' 
                : 'Select a book to return to the library'}
            </p>
            
            {/* Toggle between borrow and return */}
            <div className="flex justify-center mb-8">
              <div className="glass-card p-1 rounded-full flex">
                <button
                  type="button"
                  onClick={() => setFormAction('borrow')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    formAction === 'borrow'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-primary/10'
                  }`}
                >
                  Borrow
                </button>
                <button
                  type="button"
                  onClick={() => setFormAction('return')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    formAction === 'return'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-primary/10'
                  }`}
                >
                  Return
                </button>
              </div>
            </div>
          </header>
          
          <div className="glass-card p-8 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {formAction === 'borrow' ? (
                <>
                  {/* Student Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <span className="mr-2">Student Information</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                          First Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="middleName" className="block text-sm font-medium mb-1">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          id="middleName"
                          value={middleName}
                          onChange={(e) => setMiddleName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                          Last Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="gradeSection" className="block text-sm font-medium mb-1">
                        Grade & Section <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        id="gradeSection"
                        value={gradeSection}
                        onChange={(e) => setGradeSection(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        placeholder="e.g. Grade 10 - Einstein"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Book Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Book Selection</h2>
                    
                    <div>
                      <label htmlFor="book" className="block text-sm font-medium mb-1">
                        Select a Book <span className="text-destructive">*</span>
                      </label>
                      {books.length > 0 ? (
                        <select
                          id="book"
                          value={selectedBook}
                          onChange={(e) => setSelectedBook(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          required
                        >
                          <option value="">-- Select a book --</option>
                          {books.map((book) => (
                            <option key={book.id} value={book.id}>
                              {book.title} by {book.author}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-muted-foreground py-2">
                          No books available. Please add books first.
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date & Time
                      </label>
                      <div className="text-muted-foreground py-2 border px-4 rounded-lg bg-background/50">
                        {formatDateForDisplay(getPhilippinesTime())}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Return Book Form */
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Return a Book</h2>
                  
                  {returnOptions.length > 0 ? (
                    <div>
                      <label htmlFor="returnBook" className="block text-sm font-medium mb-1">
                        Select Book to Return <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="returnBook"
                        value={selectedBook}
                        onChange={(e) => setSelectedBook(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        required
                      >
                        <option value="">-- Select a book to return --</option>
                        {returnOptions.map((record) => (
                          <option key={record.id} value={record.id}>
                            {record.bookTitle} - Borrowed by {record.firstName} {record.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="text-muted-foreground p-4 border rounded-lg bg-muted/20">
                      There are no books currently borrowed.
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Return Date & Time
                    </label>
                    <div className="text-muted-foreground py-2 border px-4 rounded-lg bg-background/50">
                      {formatDateForDisplay(getPhilippinesTime())}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={(formAction === 'borrow' && books.length === 0) || 
                           (formAction === 'return' && returnOptions.length === 0)}
                  className="w-full button-glow bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                  <span>
                    {formAction === 'borrow' ? 'Borrow Book' : 'Return Book'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default BorrowReturn;
