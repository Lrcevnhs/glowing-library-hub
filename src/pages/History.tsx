
import { useState, useEffect } from 'react';
import { BackButton } from '@/components/BackButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TimeDisplay } from '@/components/TimeDisplay';
import { PageTransition } from '@/components/PageTransition';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { StudentRecord, searchStudentRecords, deleteStudentRecord } from '@/utils/autoDeletion';
import { toast } from 'sonner';
import { Search, Download, Trash2, XCircle, CheckCircle2 } from 'lucide-react';

const History = () => {
  // Load records from localStorage
  const [records] = useLocalStorage<StudentRecord[]>('borrowRecords', []);
  
  // States for filtering and display
  const [filteredRecords, setFilteredRecords] = useState<StudentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StudentRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Initialize filtered records
  useEffect(() => {
    setFilteredRecords(records);
  }, [records]);
  
  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    const results = searchStudentRecords(searchQuery, records);
    setSearchResults(results);
    setIsSearching(true);
    
    if (results.length === 0) {
      toast.info("No matching records found");
    }
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };
  
  // Handle delete record
  const handleDeleteRecord = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
      const success = deleteStudentRecord(id);
      
      if (success) {
        // Update filtered records
        setFilteredRecords(prev => prev.filter(record => record.id !== id));
        
        // Update search results if applicable
        if (isSearching) {
          setSearchResults(prev => prev.filter(record => record.id !== id));
        }
        
        toast.success('Record deleted successfully');
      } else {
        toast.error('Failed to delete record');
      }
    }
  };
  
  // Export records to CSV
  const exportToCSV = () => {
    try {
      // Create CSV content
      const headers = ['First Name', 'Middle Name', 'Last Name', 'Grade & Section', 'Book Title', 'Author', 'Date Borrowed', 'Date Returned', 'Status'];
      
      let csvContent = headers.join(',') + '\n';
      
      // Add records
      const displayedRecords = isSearching ? searchResults : filteredRecords;
      displayedRecords.forEach(record => {
        const row = [
          `"${record.firstName}"`,
          `"${record.middleName || ''}"`,
          `"${record.lastName}"`,
          `"${record.gradeSection}"`,
          `"${record.bookTitle}"`,
          `"${record.bookAuthor}"`,
          `"${record.dateBorrowed}"`,
          `"${record.dateReturned || ''}"`,
          `"${record.status}"`
        ];
        csvContent += row.join(',') + '\n';
      });
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      // Create a link and click it
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `library-records-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Records exported successfully');
    } catch (error) {
      console.error('Error exporting records:', error);
      toast.error('Failed to export records');
    }
  };
  
  // Displayed records based on search state
  const displayedRecords = isSearching ? searchResults : filteredRecords;
  
  return (
    <div className="page-container bg-gradient-to-br from-library-light to-library-secondary dark:from-library-dark dark:to-black">
      <BackButton />
      <ThemeToggle />
      <TimeDisplay />
      
      <PageTransition>
        <div className="section-container mt-20">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3 neon-text">
              Borrowing History
            </h1>
            <p className="text-lg text-foreground/80 mb-6">
              View and manage all book borrowing records
            </p>
          </header>
          
          <div className="glass-card p-6 md:p-8 animate-fade-in-up">
            {/* Search and Actions Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 flex items-center gap-2 bg-background/50 border rounded-lg px-3 py-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search by student name..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 flex items-center"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </button>
                
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 flex items-center"
                  disabled={displayedRecords.length === 0}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
            
            {/* Records Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/10 text-left">
                    <th className="px-4 py-3 rounded-tl-lg">Student Name</th>
                    <th className="px-4 py-3">Grade & Section</th>
                    <th className="px-4 py-3">Book</th>
                    <th className="px-4 py-3">Date Borrowed</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedRecords.length > 0 ? (
                    displayedRecords.map((record, index) => (
                      <tr 
                        key={record.id} 
                        className={`border-b last:border-0 hover:bg-primary/5 ${
                          index % 2 === 0 ? 'bg-background/50' : 'bg-background/30'
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{record.firstName} {record.lastName}</div>
                            {record.middleName && (
                              <div className="text-xs text-muted-foreground">M.I.: {record.middleName}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">{record.gradeSection}</td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{record.bookTitle}</div>
                            <div className="text-xs text-muted-foreground">by {record.bookAuthor}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{record.dateBorrowed}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            record.status === 'Borrowed'
                              ? 'bg-library-warning/10 text-library-warning'
                              : 'bg-library-success/10 text-library-success'
                          }`}>
                            {record.status === 'Borrowed' ? (
                              <>
                                <span className="mr-1 relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-library-warning opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-library-warning"></span>
                                </span>
                                Borrowed
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Returned
                              </>
                            )}
                          </span>
                          {record.status === 'Returned' && record.dateReturned && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {record.dateReturned}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteRecord(record.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded"
                            aria-label="Delete record"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        {isSearching 
                          ? 'No matching records found. Try a different search term.' 
                          : 'No borrowing records available.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Records Summary */}
            <div className="mt-6 text-sm text-muted-foreground">
              {displayedRecords.length > 0 && (
                <div className="flex justify-between items-center">
                  <p>
                    {isSearching
                      ? `Found ${searchResults.length} matching records`
                      : `Showing ${filteredRecords.length} records`}
                  </p>
                  <p>
                    Last updated: {new Date().toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default History;
