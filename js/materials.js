// Materials Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const materialItems = document.querySelectorAll('.material-item');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items with animation
            materialItems.forEach(item => {
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
    materialItems.forEach(item => {
        item.classList.add('visible');
    });
    
    // Add click handlers for material items
    materialItems.forEach(item => {
        item.addEventListener('click', function() {
            const materialName = this.querySelector('h3').textContent;
            const weight = this.querySelector('.weight').textContent;
            const composition = this.querySelector('.composition').textContent;
            
            // Show material details (could be a modal in the future)
            console.log(`Material: ${materialName}`);
            console.log(`Weight: ${weight}`);
            console.log(`Composition: ${composition}`);
            
            // Could open a modal with detailed specifications:
            // - Thread count
            // - Weave pattern
            // - Care instructions
            // - Sustainability certifications
            // - Price per yard
        });
    });
    
    // Smooth scroll behavior for better UX
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sustainability items for scroll animation
    const sustainabilityItems = document.querySelectorAll('.sustainability-item');
    sustainabilityItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});
