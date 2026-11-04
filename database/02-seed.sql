
-- =============================================
-- AGENT IA FINANCIER
-- DONNEES FICTIVES - 8 PRESTATAIRES
-- 48 TRANSACTIONS
-- =============================================

INSERT INTO public.transactions
(prestataire_id, date_transaction, description, montant, type_transaction)
VALUES

-- PRESTATAIRE 1 : ALPHA CONSULTING
(1, '2026-09-03', 'Mission conseil A', 2500.00, 'revenu'),
(1, '2026-09-12', 'Formation', 350.00, 'depense'),
(1, '2026-09-20', 'Conseil entreprise', 1800.00, 'revenu'),
(1, '2026-10-04', 'Mission conseil B', 3200.00, 'revenu'),
(1, '2026-10-15', 'Logiciels', 400.00, 'depense'),
(1, '2026-10-24', 'Audit client', 2100.00, 'revenu'),

-- PRESTATAIRE 2 : NOVA DIGITAL
(2, '2026-09-05', 'Site e-commerce', 1800.00, 'revenu'),
(2, '2026-09-11', 'Hébergement', 120.00, 'depense'),
(2, '2026-09-22', 'Maintenance web', 600.00, 'revenu'),
(2, '2026-10-06', 'Application web', 2600.00, 'revenu'),
(2, '2026-10-14', 'Licence logiciel', 200.00, 'depense'),
(2, '2026-10-25', 'Maintenance web', 850.00, 'revenu'),

-- PRESTATAIRE 3 : DATAVISION
(3, '2026-09-02', 'Dashboard Power BI', 1400.00, 'revenu'),
(3, '2026-09-16', 'Outils analytiques', 180.00, 'depense'),
(3, '2026-09-27', 'Analyse statistique', 900.00, 'revenu'),
(3, '2026-10-03', 'Projet Machine Learning', 2200.00, 'revenu'),
(3, '2026-10-17', 'Serveur cloud', 300.00, 'depense'),
(3, '2026-10-29', 'Audit Data', 1300.00, 'revenu'),

-- PRESTATAIRE 4 : GREENTECH SOLUTIONS
(4, '2026-09-04', 'Installation système', 3500.00, 'revenu'),
(4, '2026-09-13', 'Achat matériel', 1200.00, 'depense'),
(4, '2026-09-21', 'Maintenance technique', 900.00, 'revenu'),
(4, '2026-10-05', 'Projet infrastructure', 4200.00, 'revenu'),
(4, '2026-10-18', 'Équipements', 1500.00, 'depense'),
(4, '2026-10-28', 'Support technique', 1100.00, 'revenu'),

-- PRESTATAIRE 5 : HORIZON MARKETING
(5, '2026-09-06', 'Campagne publicitaire', 1600.00, 'revenu'),
(5, '2026-09-15', 'Publicité sponsorisée', 500.00, 'depense'),
(5, '2026-09-26', 'Stratégie SEO', 800.00, 'revenu'),
(5, '2026-10-07', 'Campagne digitale', 2300.00, 'revenu'),
(5, '2026-10-19', 'Budget publicité', 700.00, 'depense'),
(5, '2026-10-27', 'Audit marketing', 950.00, 'revenu'),

-- PRESTATAIRE 6 : PIXEL STUDIO
(6, '2026-09-03', 'Identité visuelle', 1100.00, 'revenu'),
(6, '2026-09-14', 'Logiciels design', 150.00, 'depense'),
(6, '2026-09-23', 'Création logo', 450.00, 'revenu'),
(6, '2026-10-08', 'Design application', 1800.00, 'revenu'),
(6, '2026-10-16', 'Matériel graphique', 350.00, 'depense'),
(6, '2026-10-30', 'Maquette UX/UI', 950.00, 'revenu'),

-- PRESTATAIRE 7 : CLOUDEXPERT
(7, '2026-09-01', 'Migration cloud', 2800.00, 'revenu'),
(7, '2026-09-17', 'Infrastructure serveur', 650.00, 'depense'),
(7, '2026-09-25', 'Support DevOps', 1200.00, 'revenu'),
(7, '2026-10-02', 'Déploiement Docker', 3400.00, 'revenu'),
(7, '2026-10-20', 'Hébergement cloud', 800.00, 'depense'),
(7, '2026-10-26', 'Maintenance infrastructure', 1500.00, 'revenu'),

-- PRESTATAIRE 8 : SMARTFINANCE
(8, '2026-09-03', 'Prestation web', 1200.00, 'revenu'),
(8, '2026-09-12', 'Abonnement logiciel', 150.00, 'depense'),
(8, '2026-09-19', 'Analyse financière', 800.00, 'revenu'),
(8, '2026-10-02', 'Développement application', 1500.00, 'revenu'),
(8, '2026-10-18', 'Abonnement cloud', 200.00, 'depense'),
(8, '2026-10-23', 'Mission Data Analyst', 1000.00, 'revenu');
