function triggerMenu() {
    const menu = document.querySelector('#mobileMenu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        return ;
    }
    menu.classList.add('hidden');
}

