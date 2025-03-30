// Add current year to footer
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Calendar navigation functionality
    const prevMonthButton = document.querySelector('.prev-month');
    const nextMonthButton = document.querySelector('.next-month');
    const currentMonthElement = document.querySelector('.current-month');
    
    if (prevMonthButton && nextMonthButton && currentMonthElement) {
        let currentDate = new Date();
        
        // Update calendar display
        function updateCalendarDisplay() {
            currentMonthElement.textContent = `${currentDate.getFullYear()}.${currentDate.getMonth() + 1}`;
        }
        
        // Previous month button
        prevMonthButton.addEventListener('click', function(e) {
            e.preventDefault();
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendarDisplay();
        });
        
        // Next month button
        nextMonthButton.addEventListener('click', function(e) {
            e.preventDefault();
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendarDisplay();
        });
    }
});
