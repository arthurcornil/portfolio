const NAV_HEIGHT = 80;

document.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('nav a[href^="#"], .prevent-select a[href^="#"]');

	window.scrollTo({
		top: 1,
		behavior: 'instant'
	});
	window.scrollTo({
		top: 0,
		behavior: 'instant'
	});
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                scrollToCorrectPosition(targetElement);
            }
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                if (typeof triggerMenu === 'function') {
                    triggerMenu(); 
                }
            }
        });
    });
});

function scrollToCorrectPosition(targetElement) {
    const heroSection = document.querySelector('.min-h-screen');
    const parallaxContainer = document.getElementById('parallaxedSection');
    const internalOffset = targetElement.offsetTop;
	const heroHeight = heroSection.offsetHeight; 
    const structuralAnchorPosition = heroHeight + internalOffset;
	console.log(heroHeight, internalOffset, structuralAnchorPosition);

    let requiredScrollPosition = (structuralAnchorPosition - NAV_HEIGHT) / 2;
    let finalScrollPosition = requiredScrollPosition;
    finalScrollPosition = Math.max(0, finalScrollPosition);
    window.scrollTo({
        top: finalScrollPosition,
        behavior: 'smooth'
    });
}
