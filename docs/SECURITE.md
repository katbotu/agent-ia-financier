# Sécurité et limites

## Développement versus production

La configuration de développement avec `PRESTATAIRE_TEST_ID` ne constitue pas une authentification. Une politique RLS protège les données uniquement si l'identité du prestataire est établie de façon fiable et si le rôle SQL ne peut pas contourner les politiques.

## Points prioritaires

1. Authentifier les utilisateurs et associer leur identité au prestataire côté serveur.
2. Appliquer les contrôles d'accès à toutes les routes, y compris les téléchargements.
3. Ne jamais exposer de clés API, de mots de passe, de fichiers `.env` ou de données réelles dans Git.
4. Remplacer les exports stockés uniquement en mémoire si plusieurs processus ou une persistance sont nécessaires.
5. Ajouter expiration et contrôle d'accès aux liens de documents.
6. Vérifier les paramètres d'outils, les bornes de dates et les formats.
7. Éviter de traiter les descriptions de transactions comme des instructions pour le LLM.
8. Tester l'isolation multi-prestataire avant publication publique.

## Avant `git push`

```powershell
git status
git diff --cached
```

Rechercher les clés et secrets dans les fichiers suivis ; supprimer et révoquer toute clé exposée avant de publier.
