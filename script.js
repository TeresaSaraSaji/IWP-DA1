let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

document.querySelector('.next-btn').addEventListener('click', function() {
    moveToNextSlide();
});

document.querySelector('.prev-btn').addEventListener('click', function() {
    moveToPreviousSlide();
});

function updateSlidePosition() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${-100 * currentSlide}%)`;
    });
}

function moveToNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
}

function moveToPreviousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
}

updateSlidePosition();

// Sticky Navbar
window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("sticky", window.scrollY > 0);
});

// Smooth Scroll
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in Effect
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    observer.observe(element);
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

window.addEventListener("scroll", function() {
    const statsSection = document.querySelector('.stats-section');
    const statsTop = statsSection.offsetTop;

    if (!counterStarted && window.scrollY >= statsTop - window.innerHeight / 2) {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const speed = 100;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 50);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        counterStarted = true;
    }
});

// Modal
const modal = document.getElementById("modal");
const openModalBtn = document.querySelector(".open-modal-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");

openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
