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
projects.set('owm', {
    title: 'Orbital Washing Machine',
    subtitle: 'Mini-jeu',
    source: 'owm.png',
    description: "Orbital Washing Machine est un mini-jeu dans lequel le joueur doit maintenir une machine à laver en orbite. Le jeu est développé en C avec la librairie Raylib.",
    link: "https://github.com/arthurcornil/orbital-washing-machine",
    stack: ['C', 'Raylib']
});
projects.set('fdf', {
    title: 'FDF',
    subtitle: 'Visualisation 3D fil de fer',
    source: 'fdf.png',
    description: "Projet réalisé à l'école 42 consistant à afficher des modèles 3D fil de fer (wireframe) à partir de fichiers de données. Le programme, développé en C, lit et interprète des fichiers de coordonnées pour générer une représentation graphique interactive.",
    link: "https://github.com/arthurcornil/fdf",
    stack: ['C']
});

const techStack = new Map();
techStack.set('SvelteKit', 'bg-orange-600');
techStack.set('Tailwind', 'bg-blue-600');
techStack.set('Symfony', 'bg-blue-800');
techStack.set('C', 'bg-blue-600');
techStack.set('Raylib', 'bg-slate-950');

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
        method: "post",
        body: messageFormData
    });

    let inputs = Array.from(form.querySelectorAll('input'));
    inputs.push(form.querySelector('textarea'));
    inputs.forEach(input => {
        input.value = ''
    });

    showToast();
}

function showToast() {
    const toast = document.getElementById('sentMessageToast');
    toast.classList.add('fade-in');
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.remove('fade-in');
        toast.classList.add('fade-out');

        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('fade-out');
        }, 500);
    }, 3000);
}

document.querySelector('#projectModal').addEventListener('click', function(event) {
    if (event.target === this) {
        this.close();
    }
});
