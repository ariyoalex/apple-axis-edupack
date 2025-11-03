document.addEventListener('DOMContentLoaded', () => {
    // Hero image carousel
    const mainProductImage = document.getElementById('main-product-image');
    const navDots = document.querySelectorAll('.dot');
    const images = [
        'images/bag-main.png',
        'images/bag-top.png',
        'images/bag-left.png',
        'images/bag-right.png',
        'images/bag-back.png'
    ];

    let currentIndex = 0;
    let autoPlayInterval;

    function updateImage(newIndex) {
        currentIndex = (newIndex + images.length) % images.length;
        mainProductImage.src = images[currentIndex];

        navDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            updateImage(currentIndex + 1);
        }, 3000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateImage(index);
            resetAutoPlay();
        });
    });

    startAutoPlay();

    mainProductImage.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    mainProductImage.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // Video controls
    const video = document.getElementById('previewVideo');
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.getElementById('videoOverlay');

    if (playButton && video && videoOverlay) {
        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                videoOverlay.style.opacity = '0';
                videoOverlay.style.pointerEvents = 'none';
            } else {
                video.pause();
                videoOverlay.style.opacity = '1';
                videoOverlay.style.pointerEvents = 'auto';
            }
        });

        video.addEventListener('play', () => {
            videoOverlay.style.opacity = '0';
            videoOverlay.style.pointerEvents = 'none';
        });

        video.addEventListener('pause', () => {
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto';
        });

        video.addEventListener('ended', () => {
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto';
        });

        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .spec-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
});
