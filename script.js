/**
 * Personal Site - JavaScript for Interactivity
 * Features: Smooth scrolling navigation, form validation, animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initFormValidation();
    initAnimations();
    
    console.log('Personal site JavaScript loaded successfully');
});

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add active state visual feedback
                this.style.color = '#ffd700';
                setTimeout(() => {
                    this.style.color = '';
                }, 1000);
            }
        });
    });
}

/**
 * Form validation for contact form
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const formFields = {
        name: {
            element: document.getElementById('name'),
            rules: [
                { test: value => value.trim().length > 0, message: 'Name is required' },
                { test: value => value.trim().length >= 2, message: 'Name must be at least 2 characters' }
            ]
        },
        email: {
            element: document.getElementById('email'),
            rules: [
                { test: value => value.trim().length > 0, message: 'Email is required' },
                { test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Please enter a valid email address' }
            ]
        },
        subject: {
            element: document.getElementById('subject'),
            rules: [
                { test: value => value.trim().length > 0, message: 'Subject is required' },
                { test: value => value.trim().length >= 5, message: 'Subject must be at least 5 characters' }
            ]
        },
        message: {
            element: document.getElementById('message'),
            rules: [
                { test: value => value.trim().length > 0, message: 'Message is required' },
                { test: value => value.trim().length >= 10, message: 'Message must be at least 10 characters' }
            ]
        }
    };
    
    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (field.element) {
            field.element.addEventListener('blur', () => validateField(fieldName, formFields));
            field.element.addEventListener('input', () => clearFieldError(fieldName));
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isValid = validateForm(formFields);
        
        if (isValid) {
            submitForm(formFields);
        }
    });
}

/**
 * Validate individual field
 */
function validateField(fieldName, formFields) {
    const field = formFields[fieldName];
    const value = field.element.value;
    const formGroup = field.element.closest('.form-group');
    
    // Clear previous errors
    clearFieldError(fieldName);
    
    // Run validation rules
    for (let rule of field.rules) {
        if (!rule.test(value)) {
            showFieldError(formGroup, rule.message);
            return false;
        }
    }
    
    return true;
}

/**
 * Validate entire form
 */
function validateForm(formFields) {
    let isValid = true;
    
    Object.keys(formFields).forEach(fieldName => {
        if (!validateField(fieldName, formFields)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Show field error
 */
function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

/**
 * Clear field error
 */
function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    if (field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
}

/**
 * Submit form (simulation)
 */
function submitForm(formFields) {
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showSuccessMessage('Thank you! Your message has been sent successfully.');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear any remaining errors
        Object.keys(formFields).forEach(fieldName => {
            clearFieldError(fieldName);
        });
        
    }, 2000); // Simulate 2 second processing time
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    let successElement = document.querySelector('.success-message');
    
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'success-message';
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(successElement, form);
    }
    
    successElement.textContent = message;
    successElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 5000);
}

/**
 * Initialize scroll animations
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    // Create intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Utility function to add loading animation to elements
 */
function addLoadingAnimation(element) {
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
}

/**
 * Utility function to remove loading animation from elements
 */
function removeLoadingAnimation(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

/**
 * Add smooth hover effects to project cards
 */
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

/**
 * Add active navigation highlighting based on scroll position
 */
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === currentSection) {
            link.classList.add('active');
        }
    });
});