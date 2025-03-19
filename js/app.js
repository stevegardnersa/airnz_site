document.addEventListener('DOMContentLoaded', () => {
    const bottomPanel = document.querySelector('.bottom-panel');
    const mainContent = document.querySelector('.main-content');
    const navItems = document.querySelectorAll('.nav-item');
    const backArrow = document.querySelector('.back-arrow');
    const tapCircle = document.querySelector('.tap-circle');
    const ringContainer = document.querySelector('.ring-container');
    const rings = document.querySelectorAll('.ring-1, .ring-2');
    const audio1 = new Audio('./audio/voice_1.mp3');
    const audio2 = new Audio('./audio/voice_2.mp3');

    let isAnimating = false;
    let hasPlayedAudio = false;

    audio1.addEventListener('ended', () => {
        const userConfirmed = confirm("This is where you could, for example, ask to find an affordable flight to Seattle in mid April.");
        if (userConfirmed) {
            isAnimating = true;
            mainContent.classList.add('animate');
            handleConfirmation();
        } else {
            isAnimating = false;
            hasPlayedAudio = false;
            mainContent.classList.remove('animate');
        }
    });

    function handleConfirmation() {
        audio2.play();
    }

    audio2.addEventListener('ended', () => {
        isAnimating = false;
        hasPlayedAudio = false;
        mainContent.classList.remove('animate');
    });

    tapCircle.addEventListener('click', () => {
        isAnimating = !isAnimating;
        if (!hasPlayedAudio) {
            hasPlayedAudio = true
            audio1.play();
        }

        rings.forEach(ring => {
            if (isAnimating) {
                mainContent.classList.add('animate');
            } else {
                mainContent.classList.remove('animate');
            }
        });
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            bottomPanel.classList.add('expanded');
        });
    });

    backArrow.addEventListener('click', () => {
        bottomPanel.classList.remove('expanded');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!bottomPanel.contains(e.target) &&
            bottomPanel.classList.contains('expanded')) {
            bottomPanel.classList.remove('expanded');
        }
    });
});