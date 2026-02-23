import { ThemeProvider } from "@react-navigation/native";
import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { type SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { useUniwind } from "uniwind";
import { NAV_THEME } from "../lib/theme";

interface DBVersionQuery {
  user_version: number;
}

async function migrateIfNeeded(db: SQLiteDatabase) {
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

    await db.execAsync(`PRAGMA user_version = ${DB_VERSION}`);
  }

  return db.execAsync("");
}

const RootLayout = () => {
  const { theme } = useUniwind();

  return (
    <SQLiteProvider databaseName="nutri.db" onInit={migrateIfNeeded}>
      <ThemeProvider value={NAV_THEME[theme]}>
        <Stack />
        <PortalHost />
      </ThemeProvider>
    </SQLiteProvider>
  );
};

export default RootLayout;
