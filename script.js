document.addEventListener('DOMContentLoaded', function () {
    // Handle hash navigation with UTM parameters
    const handleHashNavigation = () => {
        // Get the full URL and parse it
        const url = new URL(window.location.href);
        const hash = url.hash;

        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                // Add a small delay to ensure the page is fully loaded
                setTimeout(() => {
                    // Calculate the offset to account for fixed header
                    const headerOffset = 70; // Height of your fixed header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    };

    // Handle initial page load
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    const container = document.querySelector('.testimonial-container');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');

    // Only initialize testimonial slider if elements exist
    if (container && testimonials.length > 0 && prevBtn && nextBtn && dotsContainer) {
        let currentIndex = 0;
        const totalTestimonials = testimonials.length;

        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            container.scrollTo({
                left: testimonials[index].offsetLeft,
                behavior: 'smooth'
            });
            updateDots();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            goToSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            goToSlide(currentIndex);
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-advance slides every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);

        // Pause auto-advance when hovering over the slider
        container.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        container.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        container.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide();
            }
        }
    }

    // Add passive event listeners for scroll events
    document.addEventListener('scroll', function () {
        // Your scroll handling code
    }, { passive: true });

    // Add passive event listeners for touch events
    document.addEventListener('touchstart', function () {
        // Your touch handling code
    }, { passive: true });

    document.addEventListener('touchmove', function () {
        // Your touch move handling code
    }, { passive: true });
});

function sendEmail(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const service = form.querySelector('select').value;
    const message = form.querySelector('textarea').value;

    const subject = `New Pet Sitting Request from ${name}`;
    const body = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}

        Message:
        ${message}
        `.trim();

    const mailtoLink = `mailto:maria_romar@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Photo Gallery Slideshow
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.slideshow-dots');
    const prevBtn = document.querySelector('.slideshow-nav.prev');
    const nextBtn = document.querySelector('.slideshow-nav.next');

    // Only initialize slideshow if elements exist
    if (slides.length > 0 && dots && prevBtn && nextBtn) {
        let currentSlide = 0;
        let slideInterval;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dots.appendChild(dot);
        });

        const dotElements = document.querySelectorAll('.dot');

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                dotElements[index].classList.remove('active');
            });
            slides[currentSlide].classList.add('active');
            dotElements[currentSlide].classList.add('active');
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
            resetInterval();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        // Event listeners
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        // Start automatic slideshow
        resetInterval();

        // Pause slideshow on hover
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slideshowContainer.addEventListener('mouseleave', resetInterval);
        }
    }
});

// Mobile Slideshow Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slideshow-nav.prev');
    const nextButton = document.querySelector('.slideshow-nav.next');
    const dotsContainer = document.querySelector('.slideshow-dots');

    // Only initialize if all required elements exist
    if (slideshowContainer && slides.length > 0 && prevButton && nextButton && dotsContainer) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlideshow() {
            slideshowContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlideshow();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlideshow();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlideshow();
        }

        // Event listeners
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Auto-advance slides every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);

        // Pause auto-advance when hovering over slideshow
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });

        // Touch events for swipe
        let touchStartX = 0;
        let touchEndX = 0;

        slideshowContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slideshowContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide(); // Swipe left
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide(); // Swipe right
            }
        }
    }
});

// Mobile Photo Slideshow
function initMobilePhotoSlideshow() {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) return;

    const gridItems = gridContainer.querySelectorAll('.grid-item');
    if (gridItems.length === 0) return;

    // Only proceed if we're in mobile view
    if (window.innerWidth > 768) {
        // Remove any existing mobile navigation elements
        const existingNav = gridContainer.querySelector('.mobile-slider-nav');
        const existingDots = gridContainer.parentNode.querySelector('.mobile-slider-dots');
        if (existingNav) existingNav.remove();
        if (existingDots) existingDots.remove();

        // Remove active class from all items
        gridItems.forEach(item => item.classList.remove('active'));
        return;
    }

    // Remove any existing mobile navigation elements before adding new ones
    const existingNav = gridContainer.querySelector('.mobile-slider-nav');
    const existingDots = gridContainer.parentNode.querySelector('.mobile-slider-dots');
    if (existingNav) existingNav.remove();
    if (existingDots) existingDots.remove();

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'mobile-slider-nav prev';
    prevButton.innerHTML = '❮';

    const nextButton = document.createElement('button');
    nextButton.className = 'mobile-slider-nav next';
    nextButton.innerHTML = '❯';

    // Create dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'mobile-slider-dots';

    // Create dots
    gridItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'mobile-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Add navigation elements to the container
    gridContainer.appendChild(prevButton);
    gridContainer.appendChild(nextButton);
    gridContainer.parentNode.appendChild(dotsContainer);

    let currentSlide = 0;

    // Show first slide
    gridItems[0].classList.add('active');

    function updateSlides() {
        gridItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentSlide) {
                item.classList.add('active');
            }
        });

        // Update dots
        const dots = dotsContainer.querySelectorAll('.mobile-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % gridItems.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + gridItems.length) % gridItems.length;
        updateSlides();
    }

    // Add event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance when user interacts
    gridContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    gridContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    gridContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    gridContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }
}

// Initialize mobile photo slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobilePhotoSlideshow();

    // Re-initialize on window resize
    window.addEventListener('resize', () => {
        initMobilePhotoSlideshow();
    });
});

// FAQ Section Functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other questions
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
            });

            // Toggle current question
            question.setAttribute('aria-expanded', !isExpanded);
        });
    });
}); 
