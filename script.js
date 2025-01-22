const countdownDate = new Date("2025-01-23T00:00:00").getTime(); // Date cible : 23 janvier 2025 à minuit

function checkDate() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance > 0) {
        showCountdown();
    } else {
        showBirthdayContent();
    }
}

function showCountdown() {
    document.getElementById('countdown-version').classList.remove('hidden');
    document.getElementById('birthday-version').classList.add('hidden');

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            showBirthdayContent();
        }
    }
}

function showBirthdayContent() {
    document.getElementById('countdown-version').classList.add('hidden');
    document.getElementById('birthday-version').classList.remove('hidden');
    launchConfetti();
}

function launchConfetti() {
    const confettiSettings = { target: 'confetti-canvas', max: 200, size: 2 };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}

// Empêcher les captures d'écran et les enregistrements vidéo
document.addEventListener('keydown', (e) => {
    if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
        e.preventDefault();
        alert('Les captures d\'écran et enregistrements vidéo sont désactivés sur ce site.');
    }
});

// Désactiver le clic droit et les gestes de sélection
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('Le clic droit est désactivé sur ce site.');
});

document.addEventListener('selectstart', (e) => {
    e.preventDefault();
});

// Détecter les tentatives de capture d'écran sur mobile
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        alert('Les captures d\'écran sont désactivées sur ce site.');
    }
});

// Vérifier la date au chargement de la page
checkDate();





// Gestion des messages
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageList = document.getElementById('messages');
const messageSection = document.getElementById('message-list');

// Charger les messages depuis le localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messageList.innerHTML = ''; // Vider la liste actuelle
    messages.forEach((message) => {
        const li = document.createElement('li');
        li.textContent = message;
        messageList.appendChild(li);
    });
}

// Ajouter un message
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
        messageInput.value = ''; // Vider le champ de texte
        loadMessages(); // Recharger les messages
    }
});

// Afficher les messages pour Zitachou
const showMessagesButton = document.createElement('button');
showMessagesButton.textContent = 'Voir les messages';
showMessagesButton.style.marginTop = '20px';
showMessagesButton.style.padding = '10px 20px';
showMessagesButton.style.background = '#ff758c';
showMessagesButton.style.color = 'white';
showMessagesButton.style.border = 'none';
showMessagesButton.style.borderRadius = '5px';
showMessagesButton.style.cursor = 'pointer';
showMessagesButton.style.transition = 'background 0.3s ease';

showMessagesButton.addEventListener('click', () => {
    messageSection.classList.toggle('hidden');
    loadMessages(); // Charger les messages lorsque la section est affichée
});

messageForm.appendChild(showMessagesButton);

// Masquer la section des messages par défaut
messageSection.classList.add('hidden');





const media = [
    { type: 'video', src: 'vid.mp4' },
    { type: 'photo', src: 'poto.jpg' },
    // Ajoute plus de médias ici
];

media.forEach(item => {
    if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        document.querySelector('.videos').appendChild(video);
    } else if (item.type === 'photo') {
        const img = document.createElement('img');
        img.src = item.src;
        document.querySelector('.photos').appendChild(img);
    }
});


async function submitMessage(message) {
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });
    return response.json();
}


// Vérification côté serveur
async function checkPassword(password) {
    const response = await fetch('/api/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });
    return response.json();
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = passwordInput.value.trim();
    const result = await checkPassword(password);

    if (result.success) {
        loginForm.classList.add('hidden');
        messageList.classList.remove('hidden');
        loadMessages();
    } else {
        alert('Mot de passe incorrect. Accès refusé.');
    }
});







