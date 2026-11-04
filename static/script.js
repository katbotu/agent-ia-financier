
"use strict";

// ==========================================
// ELEMENTS HTML
// ==========================================

const chatForm = document.getElementById("chatForm");
const promptInput = document.getElementById("prompt");
const messages = document.getElementById("messages");
const modelSelect = document.getElementById("modelSelect");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const backendStatus = document.getElementById("backendStatus");

const chatView = document.getElementById("chatView");
const benchmarkView = document.getElementById("benchmarkView");
const benchmarkForm = document.getElementById("benchmarkForm");
const benchmarkPrompt = document.getElementById("benchmarkPrompt");
const benchmarkBtn = document.getElementById("benchmarkBtn");
const benchmarkResults = document.getElementById("benchmarkResults");

let conversation = [];
let enCours = false;


// ==========================================
// OUTILS D'AFFICHAGE
// ==========================================

function creerElement(tag, classe, texte = "") {
    const element = document.createElement(tag);

    if (classe) {
        element.className = classe;
    }

    if (texte) {
        element.textContent = texte;
    }

    return element;
}


function ajouterMessage(role, texte = "") {
    const ligne = creerElement(
        "div",
        `message ${role}`
    );

    const avatar = creerElement(
        "div",
        "avatar",
        role === "user" ? "VOUS" : "IA"
    );

    const contenu = creerElement(
        "div",
        "message-content"
    );

    const corps = creerElement(
        "div",
        "message-text",
        texte
    );

    contenu.appendChild(corps);
    ligne.appendChild(avatar);
    ligne.appendChild(contenu);
    messages.appendChild(ligne);

    messages.scrollTop = messages.scrollHeight;

    return {
        ligne,
        contenu,
        corps
    };
}


function afficherErreur(element, texte) {
    const erreur = creerElement(
        "div",
        "error-box",
        texte
    );

    element.appendChild(erreur);
}


function afficherOutils(element, outils) {
    if (!outils || outils.length === 0) {
        return;
    }

    const titre = creerElement(
        "div",
        "tools-title",
        "Outils appelés par le LLM"
    );

    element.appendChild(titre);

    const conteneur = creerElement(
        "div",
        "tool-list"
    );

    outils.forEach(nom => {
        const badge = creerElement(
            "span",
            "tool-badge",
            nom
        );

        conteneur.appendChild(badge);
    });

    element.appendChild(conteneur);
}


// ==========================================
// DOCUMENTS PDF / CSV / XML
// ==========================================

function urlDocumentValide(url) {
    if (
        typeof url !== "string" ||
        !url.startsWith("/api/documents/")
    ) {
        return false;
    }

    return /^\/api\/documents\/[a-f0-9]{32}$/.test(url);
}


function afficherDocuments(element, documents) {
    if (!Array.isArray(documents)) {
        return;
    }

    documents.forEach(document => {
        if (!urlDocumentValide(document.url)) {
            return;
        }

        const carte = creerElement(
            "div",
            "document-card"
        );

        const titre = creerElement(
            "strong",
            "",
            `Rapport ${document.format.toUpperCase()}`
        );

        const description = creerElement(
            "p",
            "",
            document.comparaison
                ? "Comparaison financière"
                : "Indicateurs financiers sélectionnés"
        );

        const lien = creerElement(
            "a",
            "download-btn",
            "Télécharger le document"
        );

        lien.href = document.url;
        lien.download = (
            `rapport_financier.${document.format}`
        );

        carte.appendChild(titre);
        carte.appendChild(description);
        carte.appendChild(lien);

        if (document.format === "pdf") {
            const apercu = creerElement(
                "details",
                "pdf-details"
            );

            const resume = creerElement(
                "summary",
                "",
                "Afficher l'aperçu PDF"
            );

            const iframe = creerElement(
                "iframe",
                "pdf-frame"
            );

            iframe.title = "Aperçu du rapport PDF";

            apercu.appendChild(resume);
            apercu.appendChild(iframe);

            apercu.addEventListener(
                "toggle",
                () => {
                    if (
                        apercu.open &&
                        !iframe.src
                    ) {
                        iframe.src = document.url;
                    }
                }
            );

            carte.appendChild(apercu);
        }

        element.appendChild(carte);
    });
}


// ==========================================
// ENVOI DES QUESTIONS
// ==========================================

async function envoyerQuestion(question) {
    if (enCours) return;

    const texte = question.trim();

    if (!texte) return;

    enCours = true;
    sendBtn.disabled = true;

    ajouterMessage("user", texte);

    const reponseUI = ajouterMessage(
        "assistant",
        "L'agent analyse votre demande..."
    );

    conversation.push({
        role: "user",
        content: texte
    });

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: texte,
                modele: modelSelect.value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                typeof data.detail === "string"
                    ? data.detail
                    : "Erreur du serveur."
            );
        }

        reponseUI.corps.textContent =
            data.reponse ||
            "Le modèle n'a pas fourni de réponse.";

        afficherOutils(
            reponseUI.contenu,
            data.outils_utilises
        );

        afficherDocuments(
            reponseUI.contenu,
            data.documents
        );

        if (
            Array.isArray(data.erreurs_outils) &&
            data.erreurs_outils.length > 0
        ) {
            data.erreurs_outils.forEach(erreur => {
                afficherErreur(
                    reponseUI.contenu,
                    `${erreur.outil} : ${erreur.erreur}`
                );
            });
        }

        conversation.push({
            role: "assistant",
            content: data.reponse
        });

    } catch (erreur) {
        reponseUI.corps.textContent =
            "Impossible de traiter la demande.";

        afficherErreur(
            reponseUI.contenu,
            erreur.message
        );

    } finally {
        enCours = false;
        sendBtn.disabled = false;
        promptInput.focus();
        messages.scrollTop = messages.scrollHeight;
    }
}


// ==========================================
// FORMULAIRE CHAT
// ==========================================

chatForm.addEventListener(
    "submit",
    async event => {
        event.preventDefault();

        const question = promptInput.value.trim();

        if (!question) return;

        promptInput.value = "";

        await envoyerQuestion(question);
    }
);


promptInput.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();
            chatForm.requestSubmit();
        }
    }
);


clearBtn.addEventListener(
    "click",
    () => {
        messages.innerHTML = "";
        conversation = [];

        ajouterMessage(
            "assistant",
            "Nouvelle conversation. Que souhaitez-vous analyser ?"
        );
    }
);


// ==========================================
// QUESTIONS SUGGEREES
// ==========================================

document.querySelectorAll(
    "[data-question]"
).forEach(bouton => {
    bouton.addEventListener(
        "click",
        () => {
            const question =
                bouton.dataset.question;

            if (question) {
                promptInput.value = question;
                promptInput.focus();
            }
        }
    );
});


// ==========================================
// NAVIGATION
// ==========================================

document.querySelectorAll(
    "[data-view]"
).forEach(bouton => {
    bouton.addEventListener(
        "click",
        () => {
            const vue = bouton.dataset.view;

            const afficherChat = vue === "chat";

            chatView.hidden = !afficherChat;
            benchmarkView.hidden = afficherChat;

            document.querySelectorAll(
                "[data-view]"
            ).forEach(item => {
                item.classList.toggle(
                    "active",
                    item === bouton
                );
            });
        }
    );
});


// ==========================================
// BENCHMARK OPENAI / OLLAMA
// ==========================================

benchmarkForm.addEventListener(
    "submit",
    async event => {
        event.preventDefault();

        const question =
            benchmarkPrompt.value.trim();

        if (!question) return;

        benchmarkBtn.disabled = true;

        benchmarkResults.innerHTML = "";

        benchmarkResults.appendChild(
            creerElement(
                "p",
                "",
                "Comparaison des modèles en cours..."
            )
        );

        try {
            const response = await fetch(
                "/api/benchmark",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: question
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Erreur benchmark."
                );
            }

            benchmarkResults.innerHTML = "";

            (data.resultats || []).forEach(resultat => {
                const carte = creerElement(
                    "div",
                    "benchmark-card"
                );

                carte.appendChild(
                    creerElement(
                        "h3",
                        "",
                        resultat.modele.toUpperCase()
                    )
                );

                carte.appendChild(
                    creerElement(
                        "p",
                        "",
                        `Statut : ${resultat.statut}`
                    )
                );

                carte.appendChild(
                    creerElement(
                        "p",
                        "",
                        `Temps : ${resultat.temps_reponse_secondes} s`
                    )
                );

                carte.appendChild(
                    creerElement(
                        "pre",
                        "",
                        resultat.reponse ||
                        resultat.erreur ||
                        "Aucune réponse"
                    )
                );

                if (resultat.outils) {
                    afficherOutils(
                        carte,
                        resultat.outils
                    );
                }

                benchmarkResults.appendChild(carte);
            });

        } catch (erreur) {
            benchmarkResults.textContent =
                `Erreur : ${erreur.message}`;

        } finally {
            benchmarkBtn.disabled = false;
        }
    }
);


// ==========================================
// VERIFICATION FASTAPI
// ==========================================

async function verifierBackend() {
    try {
        const response = await fetch(
            "/api/health",
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Serveur indisponible");
        }

        const data = await response.json();

        backendStatus.textContent =
            data.status === "ok"
                ? "API connectée"
                : "API indisponible";

        backendStatus.className =
            data.status === "ok"
                ? "status online"
                : "status offline";

    } catch {
        backendStatus.textContent =
            "API déconnectée";

        backendStatus.className =
            "status offline";
    }
}


// ==========================================
// INITIALISATION
// ==========================================

ajouterMessage(
    "assistant",
    "Bonjour ! Je suis votre agent IA financier. " +
    "Je peux consulter vos données PostgreSQL, " +
    "comparer vos périodes et préparer des rapports."
);

verifierBackend();
