// Menú móvil
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Slider de testimonios
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(n) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (n + testimonials.length) % testimonials.length;

    testimonials[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Cambio automático de testimonios cada 5 segundos
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Formulario de reserva
const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Aquí normalmente se enviarían los datos a un servidor
    // Por ahora solo mostraremos un mensaje de confirmación
    alert('¡Gracias por tu reserva! Te contactaremos pronto para confirmar los detalles de tu experiencia con los elementos.');
    reservationForm.reset();

    // También podríamos enviar los datos a un correo o base de datos
    const formData = new FormData(reservationForm);
    console.log('Datos del formulario:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
});

// Fecha mínima para el formulario (hoy)
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').setAttribute('min', today);

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de aparición para elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
document.querySelectorAll('.element-card, .service-card, .therapist-card').forEach(el => {
    observer.observe(el);
});