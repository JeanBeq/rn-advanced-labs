import uuid from 'react-native-uuid';
import { getDatabase } from '../db';
import type { Robot } from '../types/robot';

// Type pour la création d'un robot (sans id, dates générées)
export type CreateRobotInput = Omit<Robot, 'id' | 'created_at' | 'updated_at' | 'archived'>;

// Type pour la mise à jour (tous les champs optionnels sauf id)
export type UpdateRobotInput = Partial<Omit<Robot, 'id' | 'created_at' | 'updated_at'>>;

/**
 * Crée un nouveau robot dans la base de données
 */
export async function create(input: CreateRobotInput): Promise<Robot> {
  const db = getDatabase();
  const id = uuid.v4() as string;
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO robots (id, name, label, year, type, created_at, updated_at, archived)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
    [id, input.name, input.label, input.year, input.type, now, now]
  );

  return {
    id,
    ...input,
    created_at: now,
    updated_at: now,
    archived: false,
  };
}

/**
 * Met à jour un robot existant
 */
export async function update(id: string, changes: UpdateRobotInput): Promise<Robot> {
  const db = getDatabase();
  const now = new Date().toISOString();

  // Construire la requête dynamiquement
  const fields = Object.keys(changes);
  const setClause = fields.map((field) => `${field} = ?`).join(', ');
  const values = [...Object.values(changes), now, id];

  await db.runAsync(
    `UPDATE robots SET ${setClause}, updated_at = ? WHERE id = ?`,
    values
  );

  const robot = await getById(id);
  if (!robot) throw new Error('Robot not found after update');
  
  return robot;
}

/**
 * Supprime un robot (hard delete)
 */
export async function remove(id: string): Promise<void> {
  const db = getDatabase();
  await db.runAsync('DELETE FROM robots WHERE id = ?', [id]);
}

/**
 * Archive un robot (soft delete)
 */
export async function archive(id: string): Promise<void> {
  const db = getDatabase();
  const now = new Date().toISOString();
  await db.runAsync(
    'UPDATE robots SET archived = 1, updated_at = ? WHERE id = ?',
    [now, id]
  );
}

/**
 * Récupère un robot par son ID
 */
export async function getById(id: string): Promise<Robot | null> {
  const db = getDatabase();
  const robot = await db.getFirstAsync<Robot>(
    'SELECT * FROM robots WHERE id = ? AND archived = 0',
    [id]
  );
  return robot || null;
}

/**
 * Liste les robots avec filtrage et tri
 */
export async function list(options?: {
  q?: string; // Recherche par nom
  sort?: 'name' | 'year';
  limit?: number;
  offset?: number;
}): Promise<Robot[]> {
  const db = getDatabase();
  const { q, sort = 'name', limit = 100, offset = 0 } = options || {};

  let query = 'SELECT * FROM robots WHERE archived = 0';
  const params: any[] = [];

  // Filtre de recherche
  if (q) {
    query += ' AND name LIKE ?';
    params.push(`%${q}%`);
  }

  // Tri
  query += ` ORDER BY ${sort} ASC`;

  // Pagination
  query += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const robots = await db.getAllAsync<Robot>(query, params);
  return robots;
}

/**
 * Récupère tous les robots (pour export)
 */
export async function getAll(): Promise<Robot[]> {
  const db = getDatabase();
  const robots = await db.getAllAsync<Robot>(
    'SELECT * FROM robots WHERE archived = 0 ORDER BY name ASC'
  );
  return robots;
}
