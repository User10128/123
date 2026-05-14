const translations = {
    "Play vs AI": { "en-US": "Play vs AI", "en-GB": "Play vs AI", "es": "Jugar contra IA", "fr": "Jouer contre l'IA", "de": "Gegen KI spielen", "nl": "Speel tegen AI" },
    "Local Multiplayer": { "en-US": "Local Multiplayer", "en-GB": "Local Multiplayer", "es": "Multijugador local", "fr": "Multijoueur local", "de": "Lokaler Mehrspielermodus", "nl": "Lokale multiplayer" },
    "Rules & Instructions": { "en-US": "Rules & Instructions", "en-GB": "Rules & Instructions", "es": "Reglas e Instrucciones", "fr": "Règles et Instructions", "de": "Regeln & Anweisungen", "nl": "Regels & Instructies" },
    "Personal Stats": { "en-US": "Personal Stats", "en-GB": "Personal Stats", "es": "Estadísticas personales", "fr": "Statistiques personnelles", "de": "Persönliche Statistiken", "nl": "Persoonlijke statistieken" },
    "Delete High Scores": { "en-US": "Delete High Scores", "en-GB": "Delete High Scores", "es": "Borrar puntajes altos", "fr": "Supprimer les meilleurs scores", "de": "Highscores löschen", "nl": "Hoge scores verwijderen" },
    "Select Difficulty": { "en-US": "Select Difficulty", "en-GB": "Select Difficulty", "es": "Seleccionar dificultad", "fr": "Sélectionner la difficulté", "de": "Schwierigkeit wählen", "nl": "Selecteer Moeilijkheidsgraad" },
    "Easy": { "en-US": "Easy", "en-GB": "Easy", "es": "Fácil", "fr": "Facile", "de": "Einfach", "nl": "Makkelijk" },
    "Medium": { "en-US": "Medium", "en-GB": "Medium", "es": "Medio", "fr": "Moyen", "de": "Mittel", "nl": "Gemiddeld" },
    "Hard": { "en-US": "Hard", "en-GB": "Hard", "es": "Difícil", "fr": "Difficile", "de": "Schwer", "nl": "Moeilijk" },
    "Rules": { "en-US": "Rules", "en-GB": "Rules", "es": "Reglas", "fr": "Règles", "de": "Regeln", "nl": "Regels" },
    "Quit": { "en-US": "Quit", "en-GB": "Quit", "es": "Salir", "fr": "Quitter", "de": "Beenden", "nl": "Stoppen" },
    "How to Play": { "en-US": "How to Play", "en-GB": "How to Play", "es": "Cómo jugar", "fr": "Comment jouer", "de": "Spielanleitung", "nl": "Hoe te spelen" },
    "Got it": { "en-US": "Got it", "en-GB": "Got it", "es": "Entendido", "fr": "Compris", "de": "Verstanden", "nl": "Begrepen" },
    "Are you sure?": { "en-US": "Are you sure?", "en-GB": "Are you sure?", "es": "¿Estás seguro?", "fr": "Êtes-vous sûr(e) ?", "de": "Bist du sicher?", "nl": "Weet je het zeker?" },
    "Cancel": { "en-US": "Cancel", "en-GB": "Cancel", "es": "Cancelar", "fr": "Annuler", "de": "Abbrechen", "nl": "Annuleren" },
    "Yes": { "en-US": "Yes", "en-GB": "Yes", "es": "Sí", "fr": "Oui", "de": "Ja", "nl": "Ja" },
    "Game Over": { "en-US": "Game Over", "en-GB": "Game Over", "es": "Fin del juego", "fr": "Fin de partie", "de": "Spiel vorbei", "nl": "Spel voorbij" },
    "Play Again": { "en-US": "Play Again", "en-GB": "Play Again", "es": "Jugar de nuevo", "fr": "Rejouer", "de": "Nochmal spielen", "nl": "Opnieuw spelen" },
    "Main Menu": { "en-US": "Main Menu", "en-GB": "Main Menu", "es": "Menú principal", "fr": "Menu principal", "de": "Hauptmenü", "nl": "Hoofdmenu" },
    "Language": { "en-US": "Language", "en-GB": "Language", "es": "Idioma", "fr": "Langue", "de": "Sprache", "nl": "Taal" },
    "Matchmaking": { "en-US": "Matchmaking", "en-GB": "Matchmaking", "es": "Búsqueda de partida", "fr": "Recherche de partie", "de": "Spielersuche", "nl": "Matchmaking" },
    "Standard": { "en-US": "Standard", "en-GB": "Standard", "es": "Estándar", "fr": "Standard", "de": "Standard", "nl": "Standaard" },
    "Wild Mode": { "en-US": "Wild Mode", "en-GB": "Wild Mode", "es": "Modo salvaje", "fr": "Mode sauvage", "de": "Wild-Modus", "nl": "Wild-modus" },
    "Global Rankings": { "en-US": "Global Rankings", "en-GB": "Global Rankings", "es": "Clasificación global", "fr": "Classement mondial", "de": "Globale Rangliste", "nl": "Wereldranglijst" },
    "Friends": { "en-US": "Friends", "en-GB": "Friends", "es": "Amigos", "fr": "Amis", "de": "Freunde", "nl": "Vrienden" },
    "Social Hub": { "en-US": "Social Hub", "en-GB": "Social Hub", "es": "Centro social", "fr": "Centre social", "de": "Gespächsmittelpunkt", "nl": "Sociaal centrum" },
    "Settings": { "en-US": "Settings", "en-GB": "Settings", "es": "Ajustes", "fr": "Paramètres", "de": "Einstellungen", "nl": "Instellingen" },
    "Sign In": { "en-US": "Sign In", "en-GB": "Sign In", "es": "Iniciar sesión", "fr": "Se connecter", "de": "Anmelden", "nl": "Aanmelden" },
    "Sign Out": { "en-US": "Sign Out", "en-GB": "Sign Out", "es": "Cerrar sesión", "fr": "Se déconnecter", "de": "Abmelden", "nl": "Afmelden" }
};

const languages = [
    { id: "en-US", name: "English (US)" },
    { id: "en-GB", name: "English (UK)" },
    { id: "es", name: "Spanish" },
    { id: "fr", name: "French" },
    { id: "de", name: "German" },
    { id: "nl", name: "Dutch" }
];

let currentLang = localStorage.getItem('appLang') || 'en-US';

function walkAndTranslate(node) {
    if (node.nodeType === 3) {
        const text = node.nodeValue.trim();
        // If we hadn't saved orig text, do it now
        if (text && !node.parentElement.hasAttribute('data-orig-text')) {
            // Check if it matches any known EN string or any known string in translations
            let matchedEnKey = null;
            if (translations[text]) {
                matchedEnKey = text;
            } else {
                for (const key in translations) {
                    for (const langId in translations[key]) {
                        if (translations[key][langId] === text) {
                            matchedEnKey = key;
                            break;
                        }
                    }
                    if (matchedEnKey) break;
                }
            }
            if (matchedEnKey) {
                node.parentElement.setAttribute('data-orig-text', matchedEnKey);
            }
        }
        
        let origKey = node.parentElement ? node.parentElement.getAttribute('data-orig-text') : null;
        if (origKey && translations[origKey] && translations[origKey][currentLang]) {
            node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), translations[origKey][currentLang]);
        }
    } else if (node.nodeType === 1) {
        if (node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
            for (let i = 0; i < node.childNodes.length; i++) {
                walkAndTranslate(node.childNodes[i]);
            }
        }
    }
}

window.applyTranslations = function() {
    walkAndTranslate(document.body);
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
        const span = btn.querySelector('span');
        if (span && origTextOf(span) === 'Language') {
            const tr = translations["Language"][currentLang] || "Language";
            span.innerText = tr;
        }
    });
};

function origTextOf(node) {
    return node.getAttribute('data-orig-text') || node.innerText.trim();
}

window.showLanguagePicker = function() {
    const modalAttr = 'modal-language';
    let modal = document.getElementById(modalAttr);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalAttr;
        modal.className = "fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 transition-opacity";
        
        let btnsHtml = languages.map(l => 
            \`<button onclick="window.setLanguage('\${l.id}')" class="btn-primary w-full py-3 mb-2 \${currentLang===l.id?'ring-2 ring-teal-400':''}"><span data-orig-text="\${l.name}">\${l.name}</span></button>\`
        ).join('');
        
        modal.innerHTML = \`
            <div class="glass-panel p-6 sm:p-8 rounded-2xl max-w-sm w-full text-center">
                <h3 class="text-2xl text-teal-400 mb-6 font-light uppercase tracking-widest" data-orig-text="Language">\${translations["Language"][currentLang] || "Language"}</h3>
                <div class="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-2 pb-4 pt-2">
                    \${btnsHtml}
                </div>
                <div class="mt-4 pt-4 border-t border-teal-500/20">
                    <button onclick="document.getElementById('\${modalAttr}').classList.add('hidden')" class="glass-btn px-6 py-2 w-full" data-orig-text="Cancel">\${translations["Cancel"][currentLang] || "Cancel"}</button>
                </div>
            </div>
        \`;
        document.body.appendChild(modal);
    } else {
        modal.querySelector('h3').innerText = translations["Language"][currentLang] || "Language";
        modal.querySelector('.glass-btn').innerText = translations["Cancel"][currentLang] || "Cancel";
        
        // update rings
        const btns = modal.querySelectorAll('.btn-primary');
        btns.forEach(btn => {
            if (btn.getAttribute('onclick').includes(currentLang)) {
                btn.classList.add('ring-2', 'ring-teal-400');
            } else {
                btn.classList.remove('ring-2', 'ring-teal-400');
            }
        });

        modal.classList.remove('hidden');
    }
};

window.setLanguage = async function(langId) {
    currentLang = langId;
    localStorage.setItem('appLang', langId);
    
    // Save to firebase profile if available
    if (window.isRegisteredUser && window.isRegisteredUser() && window.db && window.fbUser) {
        try {
            const { doc, setDoc } = await import('firebase/firestore');
            const docRef = doc(window.db, 'artifacts', window.appId, 'public', 'data', 'profiles', window.fbUser.uid);
            await setDoc(docRef, { language: langId }, { merge: true });
        } catch(e) { }
    }
    
    window.applyTranslations();
    const modal = document.getElementById('modal-language');
    if (modal) modal.classList.add('hidden');
};

// Initial apply
document.addEventListener('DOMContentLoaded', () => {
    // wait a frame for DOM to paint
    setTimeout(window.applyTranslations, 100);
});

// For index.html, hook into Firebase auth login if needed
const origToggle = window.toggleAuthMode;
if (origToggle) {
    // When profile loads, if data.language exists, load it
    // That's handled in index.html naturally if we modify updatePublicProfile or similar.
}
