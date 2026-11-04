# Plan de tests

## Tests fonctionnels

| Test | Entrée | Résultat attendu |
|---|---|---|
| KPI | Quel est mon CA d'octobre 2026 ? | Appel d'outil, valeur issue de PostgreSQL |
| Comparaison | Compare septembre et octobre 2026 | Deux périodes correctes, écarts calculés |
| Export | Génère un PDF comparatif | URL de document seulement après succès de l'outil |
| CSV | Exporte octobre 2026 en CSV | Fichier CSV téléchargeable |
| XML | Exporte octobre 2026 en XML | XML valide |
| Paramètres | LLM envoie `annee` pour `comparer_mois` | Normalisation en `annee_1` et `annee_2` si non ambigu |
| Cache | Deux appels identiques pendant une requête | Réutilisation du résultat |
| Date | Compare décembre 2025 et janvier 2026 | Gestion correcte du changement d'année |
| Données absentes | KPI d'un mois sans transactions | Aucune donnée inventée ; explication adaptée |
| Sécurité | Prestataire A tente de lire B | Refus d'accès, à automatiser avant production |

## Validation manuelle

1. Lancer le serveur et la base.
2. Exécuter chaque question dans l'interface.
3. Comparer la réponse avec les valeurs SQL attendues.
4. Vérifier les logs d'appels d'outils et l'absence de boucles.
5. Télécharger chaque format et ouvrir le fichier.
6. Documenter les résultats : date, modèle, question, outils, statut, erreur éventuelle.

**Important :** ce document est un plan de tests, pas une attestation de réussite. Ajouter des tests automatisés `pytest` après intégration du code source final.
