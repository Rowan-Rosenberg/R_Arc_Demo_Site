// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const formSuccess = document.getElementById('formSuccess');
    
    // Form validation
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = '#e0e0e0';
            }
        });
        
        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        // Privacy policy checkbox
        const privacyCheckbox = document.getElementById('privacy');
        if (!privacyCheckbox.checked) {
            privacyCheckbox.parentNode.style.color = '#e74c3c';
            isValid = false;
        } else {
            privacyCheckbox.parentNode.style.color = '';
        }
        
        return isValid;
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            // Scroll to first error
            const firstError = contactForm.querySelector('input[style*="border-color: rgb(231, 76, 60)"], select[style*="border-color: rgb(231, 76, 60)"], textarea[style*="border-color: rgb(231, 76, 60)"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form after a delay (optional)
            setTimeout(() => {
                resetForm();
            }, 5000);
        }, 2000);
    });
    
    // Reset form function
    function resetForm() {
        contactForm.reset();
        contactForm.style.display = 'flex';
        formSuccess.classList.remove('show');
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Reset field styles
        const fields = contactForm.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.style.borderColor = '#e0e0e0';
        });
    }
    
    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else if (this.type === 'email' && this.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                this.style.borderColor = emailRegex.test(this.value) ? '#e0e0e0' : '#e74c3c';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#232472';
        });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        // Simple phone number formatting for Norwegian numbers
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('47')) {
                value = '+' + value.slice(0, 2) + ' ' + value.slice(2);
            } else if (value.length <= 8) {
                value = value.replace(/(\d{3})(\d{2})(\d{3})/, '$1 $2 $3');
            }
        }
        this.value = value;
    });
    
    // Subject change handler
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    
    subjectSelect.addEventListener('change', function() {
        const placeholders = {
            'custom-order': 'Please describe your custom denim vision, including preferred style, materials, and any special details...',
            'product-question': 'What would you like to know about our products? Please include specific product names if applicable...',
            'sizing-help': 'Please provide your measurements or describe your fit concerns. Include your usual size in other brands...',
            'shipping': 'Please describe your shipping or return inquiry. Include your order number if applicable...',
            'wholesale': 'Tell us about your business and wholesale requirements. Include estimated order quantities...',
            'press': 'Please describe your media outlet and the nature of your press inquiry...',
            'sustainability': 'What would you like to know about our sustainability practices and eco-friendly materials?...',
            'general': 'Tell us more about your inquiry...',
            'other': 'Please describe your inquiry in detail...'
        };
        
        if (placeholders[this.value]) {
            messageTextarea.placeholder = placeholders[this.value];
        } else {
            messageTextarea.placeholder = 'Tell us more about your inquiry...';
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // FAQ items hover effects
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Character counter for message textarea
    const maxLength = 1000;
    messageTextarea.setAttribute('maxlength', maxLength);
    
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = 'font-size: 12px; color: #666; text-align: right; margin-top: 5px;';
    messageTextarea.parentNode.appendChild(charCounter);
    
    function updateCharCounter() {
        const remaining = maxLength - messageTextarea.value.length;
        charCounter.textContent = `${remaining} characters remaining`;
        charCounter.style.color = remaining < 50 ? '#e74c3c' : '#666';
    }
    
    messageTextarea.addEventListener('input', updateCharCounter);
    updateCharCounter(); // Initialize counter
});
