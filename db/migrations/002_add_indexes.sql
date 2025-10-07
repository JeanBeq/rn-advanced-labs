-- Ajout d'index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_robots_name ON robots(name);
CREATE INDEX IF NOT EXISTS idx_robots_year ON robots(year);
