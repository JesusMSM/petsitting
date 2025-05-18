document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.testimonial-container');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');

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
