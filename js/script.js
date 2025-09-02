document.addEventListener('DOMContentLoaded', function() {
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const originalCards = Array.from(document.querySelectorAll('.testimonial-card'));
    
    function setupInfiniteScroll() {
        // Clear the grid first to avoid duplicates on resize
        while (testimonialGrid.firstChild) {
            testimonialGrid.removeChild(testimonialGrid.firstChild);
        }
        
        // Add the original cards
        originalCards.forEach(card => {
            testimonialGrid.appendChild(card.cloneNode(true));
        });
        
        // Calculate the total width of all original cards
        const totalCardsWidth = Array.from(testimonialGrid.children).reduce((total, card) => {
            const style = window.getComputedStyle(card);
            const width = parseFloat(style.width);
            const marginRight = parseFloat(style.marginRight);
            const marginLeft = parseFloat(style.marginLeft);
            return total + width + marginRight + marginLeft;
        }, 0);
        
        // Set initial starting position off-screen
        testimonialGrid.style.left = '0px';
        
        // Clone cards to create enough to fill the container twice
        // (we need at least 2 sets for smooth infinite scrolling)
        const containerWidth = testimonialsContainer.offsetWidth;
        const setsNeeded = Math.ceil((containerWidth * 2) / totalCardsWidth) + 1;
        
        // Clone card sets
        for (let i = 0; i < setsNeeded; i++) {
            originalCards.forEach(card => {
                testimonialGrid.appendChild(card.cloneNode(true));
            });
        }
        
        // Set the CSS variable for the animation
        testimonialGrid.style.setProperty('--total-width', `${totalCardsWidth}px`);
        
        // Make sure the total width is at least the container width to ensure proper scrolling
        const minWidth = containerWidth * 2;
        if (totalCardsWidth < minWidth) {
            const additionalCards = Math.ceil((minWidth - totalCardsWidth) / (totalCardsWidth / originalCards.length));
            for (let i = 0; i < additionalCards; i++) {
                const cardToClone = originalCards[i % originalCards.length];
                testimonialGrid.appendChild(cardToClone.cloneNode(true));
            }
        }
        
        // Reset animation
        testimonialGrid.style.animation = 'none';
        setTimeout(() => {
            testimonialGrid.style.animation = 'scroll 30s linear infinite';
        }, 10);
    }
    
    // Initial setup
    setupInfiniteScroll();
    
    // Update on window resize
    window.addEventListener('resize', setupInfiniteScroll);
    
    // Check if animation needs to be paused when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            testimonialGrid.style.animationPlayState = 'paused';
        } else {
            testimonialGrid.style.animationPlayState = 'running';
        }
    });
    
    // Testimonial form functionality
    const stars = document.querySelectorAll('.star-input .star');
    let currentRating = 0;
    
    // Handle star rating selection
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            currentRating = value;
            
            // Reset all stars
            stars.forEach(s => s.classList.remove('active'));
            
            // Activate stars up to the clicked one
            for (let i = 0; i < stars.length; i++) {
                if (i < value) {
                    stars[i].classList.add('active');
                }
            }
        });
    });
    
    // Handle form submission
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const name = document.getElementById('name').value.trim();
            const testimonialText = document.getElementById('testimonial').value.trim();
            
            // Simple form validation
            if (!name) {
                alert('Please enter your name.');
                return;
            }
            
            if (currentRating === 0) {
                alert('Please select a rating.');
                return;
            }
            
            if (!testimonialText) {
                alert('Please enter your testimonial.');
                return;
            }
            
            // For demo purposes, show a success message
            alert('Thank you for your testimonial! In a real site, this would be saved to a database.');
            
            // Clear the form
            document.getElementById('name').value = '';
            document.getElementById('testimonial').value = '';
            currentRating = 0;
            stars.forEach(s => s.classList.remove('active'));
        });
    }
});
