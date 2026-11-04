# Fichiers à ajouter avant publication

Ce paquet contient **la documentation, pas le serveur final**. Depuis le dossier du projet local testé, copier :

- `server.py` : la version exacte V2.2 fonctionnelle ;
- `static/` : HTML, CSS et JavaScript réellement utilisés ;
- éventuellement les scripts de création du schéma PostgreSQL **sans données privées ni secrets** ;
- tests automatisés après validation.

Vérifier les dépendances réelles dans `server.py`, puis ajuster `requirements.txt`. Vérifier les routes avec `/docs`. Vérifier que le serveur charge `.env` ou que les variables sont fournies par l'environnement.

## Publier sur GitHub après vérification

```powershell
git init
git add .
git status
git commit -m "docs: architecture et documentation agent IA financier"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/agent-ia-financier.git
git push -u origin main
```

Créer d'abord le dépôt GitHub vide, puis remplacer `VOTRE-COMPTE`. Ne pas exécuter le `push` avant d'avoir vérifié les fichiers et les secrets.
