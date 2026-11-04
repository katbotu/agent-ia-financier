# Architecture technique

## Vue d'ensemble

```mermaid
flowchart LR
    B[Navigateur] -->|HTTP| A[FastAPI /api/chat]
    A --> O[Orchestrateur agent_llm]
    O <--> M[OpenAI ou Ollama]
    O --> V[normaliser_arguments]
    V --> F[Registre FONCTIONS]
    F --> S[Requêtes SQL prédéfinies]
    S --> P[(PostgreSQL / RLS)]
    F --> D[Exports PDF CSV XML]
    D --> E[GET /api/documents/id]
    E --> B
```

## Séquence : comparaison et export

```mermaid
sequenceDiagram
    actor U as Utilisateur
    participant UI as Frontend
    participant API as FastAPI
    participant L as LLM
    participant PY as Python
    participant DB as PostgreSQL
    U->>UI: Compare septembre et octobre 2026 et crée un PDF
    UI->>API: POST /api/chat
    API->>L: Question + outils disponibles
    L-->>API: comparer_mois(arguments)
    API->>PY: normaliser_arguments puis comparer_mois
    PY->>DB: SELECT agrégats filtrés par RLS
    DB-->>PY: Montants
    PY-->>API: Comparaison calculée
    API->>L: Résultat de l'outil
    L-->>API: preparer_document_mensuel(arguments)
    API->>PY: Validation et préparation export
    PY-->>API: Identifiant et URL du document
    API->>L: Résultat export
    L-->>API: Explication
    API-->>UI: Texte + référence du document
    UI-->>U: Résultat et lien
```

## Séparation des responsabilités

| Composant | Responsabilité | Ne doit pas faire |
|---|---|---|
| LLM | Interpréter la demande, proposer un outil, expliquer | Inventer les montants ou accéder directement à SQL |
| FastAPI | Exposer l'API et orchestrer | Remplacer les contrôles d'accès |
| Python | Valider, calculer, générer les documents | Faire confiance aveuglément aux arguments du modèle |
| PostgreSQL | Stocker les données et appliquer RLS | Déterminer l'intention en langage naturel |

## RAG ou Tool Calling ?

Cette version est fondée sur le **Tool Calling** : le LLM demande l'exécution de fonctions métier. Elle ne comprend pas de pipeline RAG documentaire (ingestion, indexation, récupération de passages, contexte documentaire). Une recherche vectorielle pourrait être ajoutée ultérieurement pour des contrats et factures.
