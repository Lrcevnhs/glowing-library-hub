
import { getPhilippinesTime, isSaturdayInPhilippines } from './dateUtils';
import { toast } from 'sonner';

// Types
export interface StudentRecord {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gradeSection: string;
  bookTitle: string;
  bookAuthor: string;
  dateBorrowed: string;
  dateReturned?: string;
  status: 'Borrowed' | 'Returned';
}

export interface Book {
  id: string;
  title: string;
  author: string;
}

// Check and perform auto-deletion if it's Saturday
export const checkAndPerformAutoDeletion = () => {
  if (isSaturdayInPhilippines()) {
    const lastDeletionDate = localStorage.getItem('lastDeletionDate');
    const today = getPhilippinesTime().toDateString();
    
    // Only delete once per Saturday
    if (lastDeletionDate !== today) {
      performWeeklyDeletion();
      localStorage.setItem('lastDeletionDate', today);
    }
  }
};

// Clear returned records older than 30 days
export const performWeeklyDeletion = () => {
  try {
    // Get records from localStorage
    const recordsJSON = localStorage.getItem('borrowRecords');
    if (!recordsJSON) return;
    
    const records: StudentRecord[] = JSON.parse(recordsJSON);
    const now = getPhilippinesTime();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Filter out records that are both 'Returned' and older than 30 days
    const filteredRecords = records.filter(record => {
      if (record.status !== 'Returned') return true;
      
      const returnDate = new Date(record.dateReturned || record.dateBorrowed);
      return returnDate >= thirtyDaysAgo;
    });
    
    // Save the filtered records back to localStorage
    localStorage.setItem('borrowRecords', JSON.stringify(filteredRecords));
    
    // Show toast notification
    const deletedCount = records.length - filteredRecords.length;
    if (deletedCount > 0) {
      toast.success(`Auto-deletion complete: ${deletedCount} old records removed.`);
    }
  } catch (error) {
    console.error('Error during auto-deletion:', error);
    toast.error('Error during weekly auto-deletion');
  }
};

// Search for student records by name
export const searchStudentRecords = (
  query: string, 
  records: StudentRecord[]
): StudentRecord[] => {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  return records.filter(record => {
    const fullName = `${record.firstName} ${record.middleName} ${record.lastName}`.toLowerCase();
    
    // Check if any search term is included in the full name
    return searchTerms.some(term => fullName.includes(term));
  });
};

// Delete a specific student record by ID
export const deleteStudentRecord = (id: string): boolean => {
  try {
    // Get records from localStorage
    const recordsJSON = localStorage.getItem('borrowRecords');
    if (!recordsJSON) return false;
    
    const records: StudentRecord[] = JSON.parse(recordsJSON);
    const filteredRecords = records.filter(record => record.id !== id);
    
    // Save the filtered records back to localStorage
    localStorage.setItem('borrowRecords', JSON.stringify(filteredRecords));
    
    return records.length !== filteredRecords.length;
  } catch (error) {
    console.error('Error deleting student record:', error);
    return false;
  }
};
