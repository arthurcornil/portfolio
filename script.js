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
