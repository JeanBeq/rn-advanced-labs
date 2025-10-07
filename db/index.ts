import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

// Contenu des migrations SQL
const migrations = [
  // Migration 1: Création de la table
  `CREATE TABLE IF NOT EXISTS robots (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    year INTEGER NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('industrial', 'service', 'medical', 'educational', 'other')),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );`,
  
  // Migration 2: Ajout d'index
  `CREATE INDEX IF NOT EXISTS idx_robots_name ON robots(name);
   CREATE INDEX IF NOT EXISTS idx_robots_year ON robots(year);`,
  
  // Migration 3: Ajout colonne archived
  `ALTER TABLE robots ADD COLUMN archived INTEGER DEFAULT 0;`
];

/**
 * Ouvre la base de données et exécute les migrations
 */
export async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;

  // Ouvrir la base de données
  db = await SQLite.openDatabaseAsync('robots.db');

  // Obtenir la version actuelle
  const result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  const currentVersion = result?.user_version || 0;

  console.log(`Version actuelle de la DB: ${currentVersion}`);

  // Appliquer les migrations manquantes
  for (let i = currentVersion; i < migrations.length; i++) {
    const migrationSQL = migrations[i];
    
    await db.execAsync(migrationSQL);
    await db.execAsync(`PRAGMA user_version = ${i + 1}`);
    
    console.log(`Migration ${i + 1} appliquée`);
  }

  return db;
}

/**
 * Récupère l'instance de la base de données
 */
export function getDatabase(): SQLite.SQLiteDatabase {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}
