-- ==========================================
-- AGENT IA FINANCIER
-- INITIALISATION DE LA BASE POSTGRESQL
-- ==========================================

-- 1. Table des transactions

CREATE TABLE IF NOT EXISTS public.transactions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    prestataire_id BIGINT NOT NULL,

    date_transaction DATE NOT NULL,

    description VARCHAR(200),

    montant NUMERIC(12,2) NOT NULL
        CHECK (montant >= 0),

    type_transaction VARCHAR(20) NOT NULL
        CHECK (
            type_transaction IN ('revenu', 'depense')
        )
);

-- 2. Index pour accélérer les recherches

CREATE INDEX IF NOT EXISTS idx_transactions_prestataire
ON public.transactions (prestataire_id);

CREATE INDEX IF NOT EXISTS idx_transactions_date
ON public.transactions (date_transaction);

-- 3. Créer un rôle de lecture pour FastAPI

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_roles
        WHERE rolname = 'agent_lecture'
    ) THEN
        CREATE ROLE agent_lecture LOGIN;
    END IF;
END
$$;

-- Mot de passe transmis par Docker à l'initialisation.
-- Ne pas inscrire de mot de passe réel dans GitHub.

DO $$
BEGIN
    EXECUTE format(
        'ALTER ROLE agent_lecture PASSWORD %L',
        current_setting('app.db_password')
    );
END
$$;

-- 4. Permissions minimales

GRANT CONNECT ON DATABASE agent_ia
TO agent_lecture;

GRANT USAGE ON SCHEMA public
TO agent_lecture;

GRANT SELECT ON public.transactions
TO agent_lecture;

-- 5. Activer Row Level Security

ALTER TABLE public.transactions
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.transactions
FORCE ROW LEVEL SECURITY;

-- 6. Politique d'isolation par prestataire

DROP POLICY IF EXISTS
transactions_isolation
ON public.transactions;

CREATE POLICY transactions_isolation
ON public.transactions
FOR SELECT
TO agent_lecture
USING (
    prestataire_id =
    NULLIF(
        current_setting(
            'app.prestataire_id',
            true
        ),
        ''
    )::BIGINT
);