document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Handles smooth page transitions.
     * When a link to another page is clicked, it fades the current page out
     * before navigating to the new page.
     */
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Apply to internal page links, excluding anchor links (#) and external/new tab links
        if (href && !href.startsWith('#') && href.includes('.html') && !link.hasAttribute('target')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // This duration should be slightly less than the CSS animation
            });
        }
    });

    /**
     * Handles smooth scrolling for on-page anchor links (e.g., in the main navigation).
     */
    const mainPageNavLinks = document.querySelectorAll('.main-nav a[href^="#"], a.btn[href^="#"]');
    mainPageNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /**
     * Handles the interactive image gallery on product pages.
     */
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails .thumb');
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Fade out the main image
                mainImage.style.opacity = 0;
                setTimeout(() => {
                    mainImage.src = this.src;
                    // Fade it back in
                    mainImage.style.opacity = 1;
                }, 200);

                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
            mainImage.style.transition = 'opacity 0.2s ease-in-out';
        });
    }
    
    /**
     * Animates elements into view as the user scrolls down the page.
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * --- API Integration for Contact Form ---
     * This is where you would add code to make the contact form functional.
     * To make this work, you need a backend server or a serverless function
     * to receive the form data and email it to you.
     */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission (which reloads the page)
            
            // Get user data from the form fields using their 'name' attributes
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            const dataToSend = { name, email, message };

            // For now, this just shows an alert.
            // In a real application, you would replace the alert with a fetch() call to your server.
            alert(`Thank you, ${name}! This is a demo and the form is not connected to a server.`);
            console.log('Form Data to be sent to API:', dataToSend);
            contactForm.reset();
            
            // === YOUR API CALL WOULD GO HERE ===
            // 1. Uncomment the code block below.
            // 2. Replace 'YOUR_API_ENDPOINT_URL' with the actual URL of your backend service.
            // This code sends the form data to your server as JSON.
            /*
            fetch('YOUR_API_ENDPOINT_URL', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Your message has been sent successfully!');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message.');
            });
            */
        });
    }
});