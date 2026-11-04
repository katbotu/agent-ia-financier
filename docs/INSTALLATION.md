# Installation — Windows / PowerShell

## Prérequis

Python 3.10+ (vérifier la compatibilité de votre code), Docker Desktop, PostgreSQL dans un conteneur, clé OpenAI **ou** Ollama avec un modèle disponible.

## 1. Récupérer le dépôt

```powershell
git clone https://github.com/VOTRE-COMPTE/agent-ia-financier.git
cd agent-ia-financier
```

Remplacer `VOTRE-COMPTE` par le nom GitHub réel.

## 2. Préparer Python

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## 3. Configurer les variables

```powershell
Copy-Item .env.example .env
```

Remplir les valeurs locales. Ne jamais committer `.env`. Selon le code local, le chargement automatique de `.env` peut nécessiter `python-dotenv` ou un autre mécanisme de chargement.

## 4. Démarrer PostgreSQL

```powershell
docker ps -a
docker start agent-ia-postgres
```

Le nom du conteneur est celui utilisé pendant le développement ; l'adapter si nécessaire. Vérifier le port PostgreSQL publié, la base et le rôle de lecture. Le dépôt de documentation ne contient ni données financières réelles ni script complet de création du schéma : le fournir séparément après validation.

## 5. Lancer le serveur

```powershell
python -m uvicorn server:app --reload --port 8005
```

Ouvrir `http://127.0.0.1:8005/api/health` puis `http://127.0.0.1:8005/docs`.

## 6. Tests manuels

- Demander le chiffre d'affaires d'octobre 2026.
- Comparer septembre et octobre 2026.
- Générer un PDF comparatif et ouvrir l'URL retournée.
- Vérifier que les montants concordent avec PostgreSQL.

## Problèmes fréquents

- `OPENAI_API_KEY absente` : variable non chargée ou non définie.
- `502 Bad Gateway` : erreur de fournisseur IA ou du backend ; consulter les journaux.
- Erreur de connexion PostgreSQL : vérifier conteneur, port, identifiants et RLS.
- Lien PDF introuvable après redémarrage : les exports sont stockés temporairement en mémoire dans cette architecture.
