import type { SQLiteDatabase } from "expo-sqlite";

export async function migrate(db: SQLiteDatabase) {
  const DB_VERSION = 5;

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

  // Create meal_templates table and init a test template
  if (currentVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS meal_templates (
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

  // Create meals table and index the meals date
  if (currentVersion === 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS meals (
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

  // Timezones were causing issues in charts, change meals date to date only for saved meals
  if (currentVersion === 2) {
    await db.execAsync(`
      UPDATE meals
      SET date = date(date);
    `);

    currentVersion += 1;
  }

  // Create user and user_weights tables. Alter meals table date column to DATE instead of DATETIME. Redo date formatting for existing meals just in case
  if (currentVersion === 3) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activity INTEGER NOT NULL DEFAULT 0,
        height REAL NOT NULL DEFAULT 170,
        sex INTEGER NOT NULL DEFAULT 0
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_weights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        weight REAL NOT NULL DEFAULT 70
      );
    `);

    await db.execAsync(`
      DROP INDEX IF EXISTS idx_date;
      ALTER TABLE meals RENAME COLUMN date TO old_date;
    `);

    await db.execAsync(`
      ALTER TABLE meals ADD COLUMN date DATE DEFAULT NULL;
      CREATE INDEX idx_date ON meals(date);
    `);

    await db.execAsync(`
      UPDATE meals SET date = date(old_date);
    `);

    await db.execAsync(`
      ALTER TABLE meals DROP COLUMN old_date;
    `);

    currentVersion += 1;
  }

  // Add age column to user table and create default user
  if (currentVersion === 4) {
    await db.runAsync(`
      ALTER TABLE user ADD COLUMN age INTEGER NOT NULL DEFAULT 25;
    `);

    await db.runAsync(`
      INSERT INTO user DEFAULT VALUES;
    `);

    currentVersion += 1;
  }

  if (currentVersion === 5) {
    await db.runAsync(`
      ALTER TABLE meal_templates ADD COLUMN sugar REAL NOT NULL DEFAULT 0;

      UPDATE meal_templates SET sugar = 0;
    `);

    await db.runAsync(`
      ALTER TABLE meal_templates ADD COLUMN fiber REAL NOT NULL DEFAULT 0;

      UPDATE meal_templates SET fiber = 0;      
    `);

    await db.runAsync(`
      ALTER TABLE meals ADD COLUMN sugar REAL NOT NULL DEFAULT 0;

      UPDATE meals SET sugar = 0;
    `);

    await db.runAsync(`
      ALTER TABLE meals ADD COLUMN fiber REAL NOT NULL DEFAULT 0;

      UPDATE meals SET fiber = 0;
    `);

    currentVersion += 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DB_VERSION}`);
}
