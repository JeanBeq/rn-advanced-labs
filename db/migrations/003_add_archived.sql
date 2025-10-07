-- Ajout de la colonne archived pour soft delete
ALTER TABLE robots ADD COLUMN archived INTEGER DEFAULT 0;
