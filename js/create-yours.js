document.addEventListener('DOMContentLoaded', function() {
    // Denim swatches selection
    const denimSwatches = document.querySelectorAll('.denim-swatch');
    denimSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Remove selected class from all swatches
            denimSwatches.forEach(s => s.classList.remove('selected'));
            // Add selected class to clicked swatch
            this.classList.add('selected');
            
            // Update product preview based on selected denim
            updateProductPreview();
        });
    });
    
    // Style options selection
    const styleOptions = document.querySelectorAll('.style-option');
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all style options
            styleOptions.forEach(o => o.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update product preview based on selected style
            updateProductPreview();
        });
    });
    
    // Feature items toggle
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Update price based on selected features
            updatePrice();
        });
    });
    
    // Navigation between steps
    const prevButton = document.querySelector('.prev-step');
    const nextButton = document.querySelector('.next-step');
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;
    
    prevButton.addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            updateStepsIndicator();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateStepsIndicator();
        }
    });
    
    function updateStepsIndicator() {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
    }
    
    // Update product preview based on selections
    function updateProductPreview() {
        const selectedDenim = document.querySelector('.denim-swatch.selected').getAttribute('data-color');
        const selectedStyle = document.querySelector('.style-option.selected').getAttribute('data-style');
        
        // Swap preview image based on style
        const imgEl = document.getElementById('product-preview-image');
        if (imgEl) {
            imgEl.src = selectedStyle === 'jacket' ? '../resources/jacket-preview.svg' : '../resources/jeans-preview.svg';
            imgEl.alt = selectedStyle === 'jacket' ? 'Customized Jacket' : 'Customized Jeans';
        }
        
        // Update price based on selections
        updatePrice();
    }
    
    // Update price based on selections and features
    function updatePrice() {
        // Base prices in ZAR
        let basePrice = 899; // jeans base
        
        // Add price for selected style
        const selectedStyle = document.querySelector('.style-option.selected').getAttribute('data-style');
        if (selectedStyle === 'jacket') {
            basePrice += 600; // jacket premium
        }
        
        // Add price for each active feature
        const activeFeatures = document.querySelectorAll('.feature-item.active');
        basePrice += activeFeatures.length * 120; // each add-on
        
        // Update price display in ZAR
        const formatZAR = (amount) => `R ${amount.toLocaleString('en-ZA')}`;
        document.querySelector('.price-amount').textContent = formatZAR(basePrice);
    }
    
    // Add to cart button
    const addToCartButton = document.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', function() {
        // In a real implementation, this would add the product to the cart
        alert('Product added to cart!');
    });
    
    // Initialize with default price
    updatePrice();
    
    // Initialize the feature icons to make them more interactive
    initializeFeatureIcons();
    
    // Function to set up feature icons
    function initializeFeatureIcons() {
        const featureIcons = document.querySelectorAll('.feature-icon');
        
        // Make sure the feature icons show the state visually
        featureItems.forEach(item => {
            const icon = item.querySelector('.feature-icon');
            
            // Add subtle pulse animation to icons
            if (icon) {
                icon.style.position = 'relative';
                
                // Add hover effect for better UX
                item.addEventListener('mouseover', () => {
                    if (!item.classList.contains('active')) {
                        icon.style.transform = 'scale(1.05)';
                    }
                });
                
                item.addEventListener('mouseout', () => {
                    if (!item.classList.contains('active')) {
                        icon.style.transform = 'scale(1)';
                    }
                });
            }
        });
    }
});
