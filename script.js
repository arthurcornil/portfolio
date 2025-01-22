function wave() {
    const hand = document.querySelector('#hand');
    hand.classList.add('wave');
    hand.addEventListener("animationend", () => {
        hand.classList.remove("wave");
    }, { once: true });
}

function animateSticker() {
    const sticker = document.querySelector('#sticker');
    sticker.classList.add('spin');
    sticker.addEventListener("animationend", () => {
        sticker.classList.remove("spin");
    }, { once: true });
}

function triggerMenu() {
    const menu = document.querySelector('#mobileMenu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        return ;
    }
    menu.classList.add('hidden');
}

const menu = document.querySelector('#mobileMenu');
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => triggerMenu());
});
