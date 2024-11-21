let currentIndex = 0;
const visibleImages = 3; 
const imageWidth = 300; 
let interval;

function moveSlider(direction) {
    const photos = document.querySelector('.photos');
    const totalImages = photos.children.length;
    const maxIndex = totalImages - visibleImages;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = maxIndex;
    } else if (currentIndex > maxIndex) {
        currentIndex = 0;
    }

    photos.style.transform = 'translateX(' + (-currentIndex * imageWidth) + 'px)';
}

function autoSlide() {
    interval = setInterval(() => moveSlider(1), 3000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

document.addEventListener("DOMContentLoaded", () => {
    autoSlide();
    document.querySelector('.photos-container').addEventListener('mouseover', stopAutoSlide);
    document.querySelector('.photos-container').addEventListener('mouseout', autoSlide);
});