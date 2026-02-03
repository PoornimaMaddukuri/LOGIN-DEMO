// ========================= 
// DOM ELEMENTS & INITIALIZATION
// =========================

const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const submitBtn = document.querySelector('button[type="submit"]');
const formBox = document.querySelector('.form-box');
const container = document.querySelector('.container');

// ========================= 
// INTERACTIVE FEATURES
// =========================

class FormInteractivity {
    constructor() {
        this.setupEventListeners();
        this.addMouseTrackingEffect();
    }

    setupEventListeners() {
        // Input focus effects
        inputs.forEach((input, index) => {
            input.addEventListener('focus', () => {
                this.onInputFocus(input);
            });

            input.addEventListener('blur', () => {
                this.onInputBlur(input);
            });

            input.addEventListener('input', () => {
                this.onInputChange(input);
            });
        });

        // Form submission
        if (form) {
            form.addEventListener('submit', (e) => {
                this.onFormSubmit(e);
            });
        }

        // Button hover effects
        if (submitBtn) {
            submitBtn.addEventListener('mouseenter', () => {
                submitBtn.style.transform = 'scale(1.02)';
            });

            submitBtn.addEventListener('mouseleave', () => {
                submitBtn.style.transform = 'scale(1)';
            });
        }
    }

    onInputFocus(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.style.animation = 'glow 0.6s ease-in-out infinite';
        }
    }

    onInputBlur(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.style.animation = 'none';
        }
    }

    onInputChange(input) {
        // Add a subtle pulse effect when typing
        input.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
        
        setTimeout(() => {
            input.style.boxShadow = '';
        }, 300);
    }

    onFormSubmit(e) {
        // Add submit animation
        submitBtn.style.animation = 'bounce 0.5s ease-out';
        
        setTimeout(() => {
            submitBtn.style.animation = '';
        }, 500);
    }

    // Mouse tracking effect for the form box
    addMouseTrackingEffect() {
        if (!formBox) return;

        document.addEventListener('mousemove', (e) => {
            const rect = formBox.getBoundingClientRect();
            
            // Check if mouse is within form box bounds
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Create a subtle light reflection effect
                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;

                formBox.style.backgroundImage = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.08) 0%, transparent 50%)`;
            }
        });

        formBox.addEventListener('mouseleave', () => {
            formBox.style.backgroundImage = '';
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new FormInteractivity();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Validate email format with visual feedback
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('change', () => {
            if (emailInput.value && !isValidEmail(emailInput.value)) {
                emailInput.classList.add('input-error');
            } else {
                emailInput.classList.remove('input-error');
            }
        });
    }

    // Initialize password strength indicator
    initPasswordStrength();
});

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Password strength indicator
function initPasswordStrength() {
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        let strengthIndicator = null;

        passwordInput.addEventListener('input', (e) => {
            const strength = getPasswordStrength(e.target.value);
            
            if (!strengthIndicator) {
                strengthIndicator = document.createElement('div');
                strengthIndicator.className = 'password-strength';
                passwordInput.parentElement.appendChild(strengthIndicator);
            }

            strengthIndicator.textContent = strength.text;
            strengthIndicator.style.color = strength.color;
            strengthIndicator.style.fontSize = '11px';
            strengthIndicator.style.marginTop = '6px';
            strengthIndicator.style.fontWeight = '600';
            strengthIndicator.style.animation = 'slideInUp 0.3s ease-out';
        });
    }
}

// Password strength checker
function getPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
        { text: 'Very Weak', color: '#f56565' },
        { text: 'Weak', color: '#f6ad55' },
        { text: 'Fair', color: '#f6e05e' },
        { text: 'Good', color: '#68d391' },
        { text: 'Strong', color: '#38a169' },
        { text: 'Very Strong', color: '#276749' }
    ];

    return levels[Math.min(strength, levels.length - 1)];
}

// ========================= 
// INPUT VALIDATION
// =========================

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.type === 'email' && input.value) {
            if (!isValidEmail(input.value)) {
                input.style.borderColor = '#f56565';
            } else {
                input.style.borderColor = '#48bb78';
                input.style.boxShadow = '0 0 0 3px rgba(72, 187, 120, 0.1)';
            }
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#667eea';
    });
});

// ========================= 
// KEYBOARD NAVIGATION
// =========================

document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === 'INPUT') {
            activeElement.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.25)';
        }
    }

    // Enter key to submit on last input
    if (e.key === 'Enter' && document.activeElement === inputs[inputs.length - 1]) {
        if (form) {
            form.submit();
        }
    }
});

// ========================= 
// PAGE VISIBILITY EFFECTS
// =========================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.opacity = '0.8';
    } else {
        // Resume when tab becomes visible
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    }
});

// ========================= 
// INPUT PLACEHOLDER INTERACTION
// =========================

inputs.forEach(input => {
    const originalPlaceholder = input.placeholder;

    input.addEventListener('focus', () => {
        if (originalPlaceholder) {
            input.placeholder = '✓ ' + originalPlaceholder;
        }
    });

    input.addEventListener('blur', () => {
        input.placeholder = originalPlaceholder;
    });
});

// ========================= 
// FORM ANIMATIONS
// =========================

// Stagger form group animations
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach((group, index) => {
    group.style.animationDelay = `${index * 0.1}s`;
});

// Button click ripple effect
if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = submitBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        submitBtn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// ========================= 
// SMOOTH TRANSITIONS
// =========================

// Add smooth transitions when elements come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observe form elements
document.querySelectorAll('input, button, .form-footer').forEach(el => {
    el.style.opacity = '0.9';
    observer.observe(el);
});

// ========================= 
// ACCESSIBILITY ENHANCEMENTS
// =========================

// Disable animations if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.body.style.animation = 'none';
}

// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================= 
// PERFORMANCE OPTIMIZATION
// =========================

// Throttle mouse movement for better performance
let lastMouseMove = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMouseMove > 16) { // ~60fps
        lastMouseMove = now;
    }
}, { passive: true });
