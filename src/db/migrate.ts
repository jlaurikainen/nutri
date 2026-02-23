import type { SQLiteDatabase } from "expo-sqlite";

interface DBVersionQuery {
  user_version: number;
}

export async function migrate(db: SQLiteDatabase) {
  const DB_VERSION = 1;

  const versionQuery = await db.getFirstAsync<DBVersionQuery>(
    "PRAGMA user_version",
  );

  if (versionQuery === null) {
    return;
  }

  if (versionQuery.user_version >= DB_VERSION) {
    return;
  }

  if (versionQuery.user_version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE meal_templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        calories INTEGER,
        carbs REAL,
        protein REAL,
        fat REAL
      );
    `);

    await db.execAsync(`
      INSERT INTO meal_templates (
        name,
        calories,
        carbs,
        protein,
        fat
      )
      VALUES (
        'Test Template',
        650,
        72.5,
        45.0,
        8.5
      );
    `);

    await db.execAsync(`PRAGMA user_version = ${DB_VERSION}`);
  }

  return db.execAsync("");
}
