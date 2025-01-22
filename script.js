const projects = new Map();
projects.set('troopflow', {
    title: 'Troopflow',
    subtitle: 'Plateforme de gestion pour les unités scoutes',
    source: 'troopflow.png',
    description: "En tant que scout, je m'étais rendu compte que les gérants d'unités pourraient mieux optimiser leur temps en automatisant certains processus. J'ai donc créé une plateforme de gestion qui vise à automatiser la gestion des paiements, proposer un système de partage de photos et un calendrier où les parents peuvent annoncer l'absence de leurs enfants.",
    link: "https://troopflow.com",
    stack: ['SvelteKit', 'Tailwind']
});
projects.set('scouts', {
    title: 'Site 10HB',
    subtitle: 'Site vitrine et CMS',
    source: 'scouts.png',
    description: "J'ai réalisé une refonte totale du site de cette unité scoute. Il est accompagné d'une plateforme qui permet de gérer son contenu. Les animateurs peuvent y annoncer les dates des réunions, partager les carnets de camp ou modifier les infos du staff.",
    link: "https://scoutsincourt.be",
    stack: ['Symfony']
});
projects.set('propic', {
    title: 'ProPic',
    subtitle: 'Outil de création de photo de profil',
    source: 'propic.png',
    description: "L'outil permet de facilement et rapidement créer une photo de profil professionnelle. L'utilisateur upload une photo de lui-même, le fond est supprimé et remplacé par une couleur au choix. ProPic est complètement gratuit et open source.",
    link: "https://propic-livid.vercel.app",
    stack: ['SvelteKit', 'Tailwind']
});

const techStack = new Map();
techStack.set('SvelteKit', 'bg-orange-600');
techStack.set('Tailwind', 'bg-blue-600');
techStack.set('Symfony', 'bg-blue-800');

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

function openModal(projectName) {
    const modal = document.querySelector('#projectModal');
    const project = projects.get(projectName);
    modal.querySelector('.project-title').innerText = project.title;
    modal.querySelector('.project-subtitle').innerText = project.subtitle;
    modal.querySelector('.project-logo').src = `assets/${project.source}`;
    modal.querySelector('.project-description').innerText = project.description;
    modal.querySelector('.project-link').href = project.link;
    const stackElement = modal.querySelector('.project-stack');
    stackElement.replaceChildren();
    for (let tech of project.stack) {
        const techElement = document.createElement('div');
        const color = techStack.get(tech);
        techElement.classList.add('px-3', 'py-1', 'rounded-full', color);
        techElement.innerText = tech;
        stackElement.appendChild(techElement);
    }
    modal.showModal();
}

async function sendMessage(event, form) {
    event.preventDefault();
    let formData = new FormData(form);
    let message = `${formData.get('name')}\n${formData.get('email')}\n${formData.get('message')}`;
    messageFormData = new FormData();
    messageFormData.append('message', message)
    await fetch('https://tracker.troopflow.com/notify.php', {
        method: "POST",
        body: messageFormData
    })
}

document.querySelector('#projectModal').addEventListener('click', function(event) {
    if (event.target === this) {
        this.close();
    }
});
