/**
 * Street Dance Calendar - Date Utility Functions
 * Provides consistent date formatting and parsing functionality across the application
 * This avoids timezone-related issues when displaying dates
 */

// Format a date string (YYYY-MM-DD) to a long format (e.g., "May 4, 2025")
function formatDateLong(dateString) {
    if (!dateString) return '';
    
    // Split the date string into parts (YYYY-MM-DD)
    const [year, month, day] = dateString.split('-').map(Number);
    
    // Create date using local components (avoids timezone issues)
    const date = new Date(year, month - 1, day);
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format a date string (YYYY-MM-DD) to compact format (e.g., "2025.05.04")
function formatDateCompact(dateString) {
    if (!dateString) return '';
    
    // Directly extract components from the string
    const [year, month, day] = dateString.split('-').map(Number);
    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
}

// Format time from 24-hour format (HH:MM) to 12-hour format (e.g., "8:00 PM")
function formatTime(timeString) {
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':');
    let hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;
    
    return `${hour}:${minutes} ${period}`;
}

// Get the day number from a date string (YYYY-MM-DD)
function getDayFromDateString(dateString) {
    if (!dateString) return '';
    
    const [, , day] = dateString.split('-').map(Number);
    return day;
}

// Create a date string (YYYY-MM-DD) from year, month, and day
function createDateString(year, month, day) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Parse a date string to get a JavaScript Date object (timezone safe)
function parseDate(dateString) {
    if (!dateString) return null;
    
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}