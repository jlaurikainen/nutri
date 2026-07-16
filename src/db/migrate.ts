import type { SQLiteDatabase } from "expo-sqlite";

export async function migrate(db: SQLiteDatabase) {
  const DB_VERSION = 7;

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

  // Dev drop table when fucking up
  if (currentVersion === -1) {
    await db.execAsync(`
      DROP TABLE IF EXISTS meal_templates;
      DROP TABLE IF EXISTS meals;
      DROP TABLE IF EXISTS user;
      DROP TABLE IF EXISTS user_weights;
    `);

    currentVersion += 1;
  }

  if (currentVersion === 6) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS meal_templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        calories INTEGER,
        carbs REAL,
        protein REAL,
        fat REAL,
        sugar REAL NOT NULL DEFAULT 0,
        fiber REAL NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        calories INTEGER,
        carbs REAL,
        protein REAL,
        fat REAL,
        date DATE DEFAULT NULL,
        sugar REAL NOT NULL DEFAULT 0,
        fiber REAL NOT NULL DEFAULT 0
      );

      CREATE INDEX IF NOT EXISTS idx_date ON meals(date);

      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activity INTEGER NOT NULL DEFAULT 0,
        height REAL NOT NULL DEFAULT 170,
        sex INTEGER NOT NULL DEFAULT 0,
        age INTEGER NOT NULL DEFAULT 25
      );

      CREATE TABLE IF NOT EXISTS user_weights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        weight REAL NOT NULL DEFAULT 70
      );
    `);
  }

  await db.execAsync(`PRAGMA user_version = ${DB_VERSION}`);
}
