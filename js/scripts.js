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
    const videoOverlay = document.querySelector('.video-overlay');

    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            videoOverlay.style.opacity = '0';
        } else {
            video.pause();
            videoOverlay.style.opacity = '1';
        }
    });

    video.addEventListener('play', () => {
        videoOverlay.style.opacity = '0';
    });

    video.addEventListener('pause', () => {
        videoOverlay.style.opacity = '1';
    });

    video.addEventListener('ended', () => {
        videoOverlay.style.opacity = '1';
    });
});