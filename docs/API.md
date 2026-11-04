# Référence API (à vérifier avec la version locale finale)

| Méthode | Route | Rôle |
|---|---|---|
| GET | `/api/health` | Vérification du service |
| GET | `/api/kpi` | Indicateurs financiers |
| POST | `/api/chat` | Question en langage naturel |
| GET | `/api/documents/{identifiant}` | Télécharger un export préparé |
| GET | `/api/test-comparaison` | Test technique de comparaison (V2.2 décrite) |

La forme exacte des corps JSON et des réponses doit être relevée dans `server.py` avant publication de la référence API définitive. La documentation OpenAPI générée par FastAPI est consultable à `/docs`.

## Outils métier déclarés au LLM

- `obtenir_kpi` : KPI d'une période.
- `obtenir_kpi_mensuel` : KPI d'un mois.
- `comparer_periodes` : comparaison de deux intervalles.
- `comparer_mois` : comparaison de deux mois.
- `obtenir_transactions` : liste de transactions.
- `preparer_document` : export d'une période.
- `preparer_document_mensuel` : export d'un ou deux mois.

Ne pas confondre ces **fonctions internes** avec des routes HTTP publiques.
