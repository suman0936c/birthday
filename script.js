document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.birthday-card');
    const openButton = document.getElementById('open-card');
    const makeWishButton = document.getElementById('make-wish');
    const wishMessage = document.getElementById('wish-message');
    const recipientName = document.getElementById('recipient-name');
    const videoContainer = document.querySelector('.video-container iframe');
    const videoOverlay = document.querySelector('.video-overlay');

    // Get recipient name from URL parameter or use default
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Friend';
    recipientName.textContent = name;

    // Card flip animation
    openButton.addEventListener('click', () => {
        card.classList.add('open');
        createConfetti();
        playBirthdaySong();
    });

    // Make a wish interaction
    makeWishButton.addEventListener('click', () => {
        const wishes = [
            "May all your dreams come true! ✨",
            "Wishing you endless joy and happiness! 🌟",
            "Here's to another amazing year! 🎉",
            "May your day be as special as you are! 💫",
            "Sending you the biggest birthday hugs! 🤗",
            "You deserve all the happiness in the world! 🌈",
            "May your day be filled with love and laughter! 💝",
            "You make the world a better place! 🌍",
            "Wishing you a day as beautiful as your smile! 😊",
            "May all your wishes come true! ⭐"
        ];
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        wishMessage.textContent = randomWish;
        wishMessage.classList.remove('hidden');
        
        // Add sparkle effect
        createSparkles();
    });

    // Add confetti effect on card open
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd700', '#ff9f9f'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }

    function createSparkles() {
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    // Play birthday song
    function playBirthdaySong() {
        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audio.volume = 0.3;
        audio.play().catch(error => console.log('Audio play failed:', error));
    }

    // Handle video interaction
    videoOverlay.addEventListener('click', () => {
        const videoUrl = videoContainer.src;
        videoContainer.src = videoUrl.replace('autoplay=0', 'autoplay=1');
        videoOverlay.style.display = 'none';
    });

    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    card.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    card.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && card.classList.contains('open')) {
                card.classList.remove('open');
            } else if (swipeDistance < 0 && !card.classList.contains('open')) {
                card.classList.add('open');
                createConfetti();
                playBirthdaySong();
            }
        }
    }

    // Add hover effect to memory items
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            createSparkles();
        });
    });
}); 