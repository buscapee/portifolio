// Animação de digitação
const palavras = ['Front-end', 'Back-end', 'Full-stack', 'Web'];
let palavraAtual = 0;
let letraAtual = 0;
let deletando = false;
const elementoDigitando = document.getElementById('digitando');

function digitar() {
    const palavra = palavras[palavraAtual];
    
    if (deletando) {
        elementoDigitando.textContent = palavra.substring(0, letraAtual - 1);
        letraAtual--;
    } else {
        elementoDigitando.textContent = palavra.substring(0, letraAtual + 1);
        letraAtual++;
    }

    if (!deletando && letraAtual === palavra.length) {
        deletando = true;
        setTimeout(digitar, 2000);
    } else if (deletando && letraAtual === 0) {
        deletando = false;
        palavraAtual = (palavraAtual + 1) % palavras.length;
        setTimeout(digitar, 500);
    } else {
        setTimeout(digitar, deletando ? 100 : 200);
    }
}

// Iniciar animação
digitar();

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de scroll para elementos
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            if (entry.target.classList.contains('habilidade-card')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.transform = 'translateX(0)';
                }
            }
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section, .projeto-card, .habilidade-card').forEach(element => {
    observer.observe(element);
});

// Adicionar classe ativa ao link de navegação atual
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Efeito de parallax no hero
const hero = document.querySelector('.hero');

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    
    hero.style.transform = `translate(${xPos}px, ${yPos}px)`;
});

// Animação de hover nos cards de habilidade
document.querySelectorAll('.habilidade-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    // Efeito de brilho ao passar o mouse
    card.addEventListener('mouseenter', () => {
        card.style.setProperty('--glow-color', 'rgba(0, 255, 136, 0.2)');
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--glow-color', 'transparent');
    });
});

// Formulário de Contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    try {
        // Desabilita o botão e mostra loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Enviando...</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;

        // Aqui você pode adicionar a lógica para enviar o formulário
        // Por exemplo, usando fetch para enviar para um backend
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação de envio

        // Mostra mensagem de sucesso
        submitBtn.innerHTML = `
            <span>Mensagem Enviada!</span>
            <i class="fas fa-check"></i>
        `;

        // Limpa o formulário
        contactForm.reset();

        // Restaura o botão após 3 segundos
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }, 3000);

    } catch (error) {
        // Mostra mensagem de erro
        submitBtn.innerHTML = `
            <span>Erro ao Enviar</span>
            <i class="fas fa-exclamation-circle"></i>
        `;

        // Restaura o botão após 3 segundos
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }, 3000);
    }
});
