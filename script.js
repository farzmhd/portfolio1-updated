document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Navbar Scroll & Scrollspy Effect ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItemLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Navbar shrink effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scrollspy active link effect
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navItemLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Scroll Reveal using Intersection Observer ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: stop observing once revealed
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- Premium Card Hover Glow Effect ---
    const cards = document.querySelectorAll('.premium-card');
    
    document.addEventListener('mousemove', e => {
        for(const card of cards) {
            const rect = card.getBoundingClientRect(),
                  x = e.clientX - rect.left,
                  y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    });

    // --- Form Submission Prevention (Demo) ---
    const contactForm = document.getElementById('contactForm');
    const msg = document.getElementById('msg');
    
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            msg.textContent = "Message sent successfully! (Demo)";
            contactForm.reset();
            setTimeout(() => {
                msg.textContent = "";
            }, 3000);
        });
    }
});

// --- Graphic Design Artworks & Lightbox Modal ---
const graphicArtworks = [
    {
        src: 'graphic1.jpg',
        title: 'FC Barcelona vs Real Madrid Matchday Poster',
        desc: 'Dynamic multi-figure sports composition featuring Lamine Yamal & Raphinha with stadium atmospheric backdrop, lightning visual effects, and textured typography.',
        tags: ['Photoshop', 'Sports Graphics', 'Photo Manipulation', 'Typography']
    },
    {
        src: 'graphic2.jpg',
        title: 'Cristiano Ronaldo — "The GOAT" Creative Poster',
        desc: 'Minimalist, high-contrast creative celebration poster highlighting dramatic lighting, superhero cape visual metaphor, and crisp typography.',
        tags: ['Photoshop', 'Visual Metaphor', 'Sports Art', 'Creative Poster']
    }
];

let currentGraphicIndex = 0;

function switchGraphicImage(src, title, element, index) {
    const mainImg = document.getElementById('graphicMainImg');
    if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = src;
            mainImg.alt = title;
            mainImg.style.opacity = '1';
        }, 150);
    }
    currentGraphicIndex = typeof index === 'number' ? index : 0;
    const thumbs = document.querySelectorAll('.thumb-btn');
    thumbs.forEach(t => t.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }
}

function openGraphicModal(index) {
    if (typeof index === 'number') {
        currentGraphicIndex = index;
    }
    updateModalContent();
    const modal = document.getElementById('graphicModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeGraphicModal() {
    const modal = document.getElementById('graphicModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function changeModalSlide(direction) {
    currentGraphicIndex = (currentGraphicIndex + direction + graphicArtworks.length) % graphicArtworks.length;
    updateModalContent();
}

function updateModalContent() {
    const artwork = graphicArtworks[currentGraphicIndex];
    if (!artwork) return;
    
    const modalImg = document.getElementById('modalActiveImg');
    const modalTitle = document.getElementById('modalArtworkTitle');
    const modalDesc = document.getElementById('modalArtworkDesc');
    const modalCounter = document.getElementById('modalCounter');
    const modalTags = document.getElementById('modalArtworkTags');
    const downloadBtn = document.getElementById('modalDownloadBtn');
    
    if (modalImg) {
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = artwork.src;
            modalImg.alt = artwork.title;
            modalImg.style.opacity = '1';
        }, 150);
    }
    if (modalTitle) modalTitle.textContent = artwork.title;
    if (modalDesc) modalDesc.textContent = artwork.desc;
    if (modalCounter) modalCounter.textContent = `${currentGraphicIndex + 1} / ${graphicArtworks.length}`;
    if (downloadBtn) {
        downloadBtn.href = artwork.src;
        downloadBtn.setAttribute('download', `faraz_${artwork.src}`);
    }
    if (modalTags) {
        modalTags.innerHTML = artwork.tags.map(tag => `<span>${tag}</span>`).join('');
    }
}

// Keyboard shortcuts for modal navigation
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('graphicModal');
    if (modal && modal.classList.contains('active')) {
        if (e.key === 'Escape') closeGraphicModal();
        if (e.key === 'ArrowLeft') changeModalSlide(-1);
        if (e.key === 'ArrowRight') changeModalSlide(1);
    }
});

