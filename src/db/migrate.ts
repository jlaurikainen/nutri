import type { SQLiteDatabase } from "expo-sqlite";

export async function migrate(db: SQLiteDatabase) {
  const DB_VERSION = 3;

  const versionQuery = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );

  if (versionQuery === null) {
    return;
  }

  let currentVersion = versionQuery.user_version;

  if (currentVersion >= DB_VERSION) {
    return;
  }

  if (currentVersion === 0) {
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

    currentVersion += 1;
  }

  if (currentVersion === 1) {
    await db.execAsync(`
      CREATE TABLE meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        calories INTEGER,
        carbs REAL,
        protein REAL,
        fat REAL,
        date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execAsync("CREATE INDEX idx_date ON meals(date);");

    currentVersion += 1;
  }

  if (currentVersion === 2) {
    await db.execAsync(`
      UPDATE meals
      SET date = date(date);
    `);

    currentVersion += 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DB_VERSION}`);
}
