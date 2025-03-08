
// Function to get current Philippines time (UTC+8)
export const getPhilippinesTime = (): Date => {
  const now = new Date();
  
  // Get the UTC time in ms
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  
  // Philippines is UTC+8
  const philippinesTime = new Date(utcTime + (3600000 * 8));
  
  return philippinesTime;
};

// Format a date to a string in Philippines format
export const formatPhilippinesDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila'
  };
  
  return new Intl.DateTimeFormat('en-PH', options).format(date);
};

// Format time only in Philippines format
export const formatPhilippinesTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila'
  };
  
  return new Intl.DateTimeFormat('en-PH', options).format(date);
};

// Check if today is Saturday in Philippines
export const isSaturdayInPhilippines = (): boolean => {
  const philippinesTime = getPhilippinesTime();
  return philippinesTime.getDay() === 6; // 6 is Saturday
};

// Format date for display in forms and records
export const formatDateForDisplay = (date: Date): string => {
  return date.toLocaleString('en-PH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila'
  });
};

// Format date for sorting (YYYY-MM-DD HH:MM:SS)
export const formatDateForSorting = (date: Date): string => {
  return date.toLocaleString('en-PH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Manila'
  }).replace(/[/]/g, '-');
};
