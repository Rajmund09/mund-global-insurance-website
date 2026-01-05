        document.addEventListener("DOMContentLoaded", function () {
            // Header scroll effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Mobile menu toggle
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Animate hamburger lines
                const spans = hamburger.querySelectorAll('span');
                if (hamburger.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('#nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                });
            });
            
            // Animate stats numbers
            function animateStats() {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
                        }
                    }, 30);
                });
            }
            
            // Animate stats when they come into view
            const statsSection = document.querySelector('.stats');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
            
            // Form submission
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                let isValid = true;
                
                // Simple validation
                for (let [key, value] of formData.entries()) {
                    if (!value.trim()) {
                        isValid = false;
                        break;
                    }
                }
                
                if (isValid) {
                    // Show success message
                    const submitBtn = contactForm.querySelector('.submit-btn');
                    const originalText = submitBtn.innerHTML;
                    
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.background = 'var(--success)';
                    
                    // Add animation
                    submitBtn.style.animation = 'none';
                    void submitBtn.offsetWidth; // Trigger reflow
                    submitBtn.style.animation = 'fadeInUp 0.5s ease-out';
                    
                    // Reset form
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.animation = '';
                    }, 3000);
                } else {
                    // Shake animation for error
                    contactForm.style.animation = 'none';
                    void contactForm.offsetWidth;
                    contactForm.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        contactForm.style.animation = '';
                    }, 500);
                }
            });
            
            // Newsletter form
            const newsletterForm = document.querySelector('.newsletter-form');
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const input = this.querySelector('input');
                const button = this.querySelector('button');
                
                if (input.value.trim()) {
                    const originalButtonHTML = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    button.style.background = 'var(--success)';
                    
                    input.value = 'Subscribed!';
                    input.style.color = 'var(--success)';
                    
                    setTimeout(() => {
                        input.value = '';
                        input.style.color = '';
                        button.innerHTML = originalButtonHTML;
                        button.style.background = '';
                    }, 2000);
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        if (navMenu.classList.contains('active')) {
                            hamburger.classList.remove('active');
                            navMenu.classList.remove('active');
                            const spans = hamburger.querySelectorAll('span');
                            spans[0].style.transform = 'none';
                            spans[1].style.opacity = '1';
                            spans[2].style.transform = 'none';
                        }
                    }
                });
            });
            
            // Button click animations
            document.querySelectorAll('.btn-primary, .btn-secondary, .sign-in, .submit-btn').forEach(button => {
                button.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });
            
            // ========== DEVELOPER CREDIT SYSTEM ==========
            // Console greeting for developers
            console.log('%c🚀 Premium Website Developed by Raj', 'color: #0066CC; font-size: 16px; font-weight: bold; padding: 5px 0;');
            console.log('%c📧 Contact: prabhushankarmund@gmail.com', 'color: #00A8FF; font-size: 14px;');
            console.log('%c💼 Need a similar premium website? Let\'s connect!', 'color: #10B981; font-size: 13px;');
            
            // Create toast notification
            function createDeveloperToast() {
                // Create toast element
                const toast = document.createElement('div');
                toast.className = 'dev-credit-toast';
                toast.innerHTML = `
                    <div class="dev-toast-content">
                        <div class="dev-toast-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="dev-toast-text">
                            <strong>Premium Website Developed</strong>
                            <span>Like this professional design? Let's build yours!</span>
                        </div>
                        <div class="dev-toast-actions">
                            <a href="mailto:prabhushankarmund@gmail.com?subject=Website Development Inquiry&body=Hello Raj, I saw your work and would like to discuss a project." 
                               class="dev-contact-btn">
                                <i class="fas fa-envelope"></i> Contact
                            </a>
                            <button class="dev-close-toast" aria-label="Close">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                `;
                
                // Add to body
                document.body.appendChild(toast);
                
                // Close button functionality
                const closeBtn = toast.querySelector('.dev-close-toast');
                closeBtn.addEventListener('click', () => {
                    toast.classList.add('toast-hiding');
                    setTimeout(() => toast.remove(), 300);
                });
                
                // Auto-remove after 15 seconds
                setTimeout(() => {
                    if (document.body.contains(toast)) {
                        toast.classList.add('toast-hiding');
                        setTimeout(() => toast.remove(), 300);
                    }
                }, 15000);
                
                // Show toast with delay
                setTimeout(() => {
                    toast.classList.add('toast-visible');
                }, 3000);
            }
            
            // Create and add footer credit
            function addFooterCredit() {
                const footerContainer = document.querySelector('.footer-bottom');
                if (footerContainer) {
                    const creditDiv = document.createElement('div');
                    creditDiv.className = 'developer-credit';
                    creditDiv.innerHTML = `
                        <p>
                            <i class="fas fa-code"></i>Website developed by <strong>Raj</strong> | 
                            <a href="mailto:prabhushankarmund@gmail.com?subject=Website Development Inquiry">
                                <i class="fas fa-envelope"></i>prabhushankarmund@gmail.com
                            </a> | 
                            <a href="tel:+91 7978567667">
                                <i class="fas fa-phone"></i>+91 7978567667
                            </a>
                        </p>
                        <p style="margin-top: 0.5rem; font-size: 0.85rem; opacity: 0.7;">
                            Need a professional website like this? Let's build something amazing together!
                        </p>
                    `;
                    
                    // Insert before footer bottom
                    footerContainer.parentNode.insertBefore(creditDiv, footerContainer);
                }
            }
            
            // Initialize developer credit
            setTimeout(() => {
                createDeveloperToast();
                addFooterCredit();
                
                // Add hover effect to toast for attention
                const toast = document.querySelector('.dev-credit-toast');
                if (toast) {
                    toast.addEventListener('mouseenter', () => {
                        toast.style.transform = 'translateX(0) scale(1.02)';
                    });
                    
                    toast.addEventListener('mouseleave', () => {
                        toast.style.transform = 'translateX(0) scale(1)';
                    });
                }
            }, 100);
        });
