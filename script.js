// Personal Website JavaScript - Enhanced Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initFormValidation();
    initNavigationHighlight();
    initPerformanceOptimizations();
});

/**
 * Smooth scrolling functionality for navigation links
 */
function initSmoothScrolling() {
    // Add smooth scrolling to all anchor links that point to sections
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form validation for contact form
 */
function initFormValidation() {
    const form = document.querySelector('form');
    if (!form) return;
    
    // Add validation to form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // If validation passes, you could submit the form
            showSuccessMessage();
            // form.submit(); // Uncomment to actually submit
        }
    });
    
    // Real-time validation on input change
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearErrors(this);
        });
    });
}

/**
 * Validate entire form
 */
function validateForm() {
    const form = document.querySelector('form');
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name || field.getAttribute('name') || 'field';
    
    // Clear previous errors
    clearErrors(field);
    
    // Check if field is required (all fields are required in this form)
    if (!value) {
        showError(field, `${capitalizeFirst(fieldName)} is required`);
        return false;
    }
    
    // Specific validation based on field type
    switch (fieldType) {
        case 'email':
            if (!isValidEmail(value)) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'text':
            if (fieldName.toLowerCase().includes('name')) {
                if (value.length < 2) {
                    showError(field, 'Name must be at least 2 characters long');
                    return false;
                }
                if (!/^[a-zA-Z\s]+$/.test(value)) {
                    showError(field, 'Name can only contain letters and spaces');
                    return false;
                }
            }
            if (fieldName.toLowerCase().includes('phone') || fieldName.toLowerCase().includes('number')) {
                if (!isValidPhone(value)) {
                    showError(field, 'Please enter a valid phone number');
                    return false;
                }
            }
            break;
    }
    
    // Textarea validation
    if (field.tagName.toLowerCase() === 'textarea') {
        if (value.length < 10) {
            showError(field, 'Message must be at least 10 characters long');
            return false;
        }
    }
    
    return true;
}

/**
 * Show error message for a field
 */
function showError(field, message) {
    const formGroup = field.closest('.form-group') || field.parentElement;
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * Clear errors for a field
 */
function clearErrors(field) {
    const formGroup = field.closest('.form-group') || field.parentElement;
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Show success message after form submission
 */
function showSuccessMessage() {
    const form = document.querySelector('form');
    if (!form) return;
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background-color: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        text-align: center;
        font-weight: 500;
    `;
    successDiv.textContent = 'Thank you! Your message has been sent successfully.';
    
    // Insert before form
    form.parentNode.insertBefore(successDiv, form);
    
    // Reset form
    form.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone number validation helper
 */
function isValidPhone(phone) {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it's a valid length (10-15 digits)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
}

/**
 * Capitalize first letter helper
 */
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Navigation highlight based on scroll position
 */
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id], .section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                highlightNavigation();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Performance optimizations
 */
function initPerformanceOptimizations() {
    // Lazy load images
    lazyLoadImages();
    
    // Optimize animations for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition', 'none');
    }
}

/**
 * Lazy loading for images
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

/**
 * Utility function to add smooth scroll behavior to any element
 */
function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - offset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Export functions for external use if needed
window.PersonalSite = {
    scrollToElement,
    validateForm,
    showSuccessMessage
};

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        background-color: var(--primary-color);
        color: white;
    }
    
    .success-message {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);