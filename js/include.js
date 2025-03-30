// include.js
document.addEventListener('DOMContentLoaded', function() {
    // Include HTML functionality
    function includeHTML() {
        const includes = document.querySelectorAll('[data-include]');
        let loadedCount = 0;
        
        // If no includes found, just set the year
        if (includes.length === 0) {
            setCurrentYear();
            return;
        }
        
        includes.forEach(include => {
            const file = include.getAttribute('data-include');
            
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error loading ${file}: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    include.innerHTML = html;
                    
                    // Run any scripts that were in the included HTML
                    const scripts = include.querySelectorAll('script');
                    scripts.forEach(script => {
                        const newScript = document.createElement('script');
                        
                        if (script.src) {
                            newScript.src = script.src;
                        } else {
                            newScript.textContent = script.textContent;
                        }
                        
                        document.head.appendChild(newScript);
                    });
                    
                    // Increment the counter
                    loadedCount++;
                    
                    // If all includes are loaded
                    if (loadedCount === includes.length) {
                        // Set active class for navigation based on current page
                        setActiveNavItem();
                        
                        // Set current year in footer
                        setCurrentYear();
                    }
                })
                .catch(error => {
                    console.error(error);
                    include.innerHTML = `<p>Error loading ${file}</p>`;
                    
                    // Increment the counter even on error
                    loadedCount++;
                    
                    // If all includes are loaded (even with errors)
                    if (loadedCount === includes.length) {
                        setActiveNavItem();
                        setCurrentYear();
                    }
                });
        });
    }
    
    // Set the active navigation item
    function setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (currentPage.includes('index')) {
            document.getElementById('nav-home')?.classList.add('active');
        } else if (currentPage.includes('calendar')) {
            document.getElementById('nav-calendar')?.classList.add('active');
        } else if (currentPage.includes('about')) {
            document.getElementById('nav-about')?.classList.add('active');
        }
    }
    
    // Set current year in footer
    function setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // Run the include function
    includeHTML();
});