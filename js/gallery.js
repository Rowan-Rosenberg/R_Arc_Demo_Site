// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('visible');
                }
            });
        });
    });
    
    // Initialize all items as visible
    galleryItems.forEach(item => {
        item.classList.add('visible');
    });
    
    // Add click handlers for items (future enhancement)
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            console.log(`Clicked on: ${productName}`);
            // Could open a modal or navigate to product detail page
        });
    });
});
