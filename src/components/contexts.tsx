import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SQLiteProvider } from "expo-sqlite";
import type { PropsWithChildren } from "react";
import { useUniwind } from "uniwind";
import { migrate } from "../db/migrate";
import { NAV_THEME } from "../lib/theme";

const client = new QueryClient();

export const Contexts = (props: PropsWithChildren) => {
  const { theme } = useUniwind();

  return (
    <QueryClientProvider client={client}>
      <SQLiteProvider databaseName="nutri.db" onInit={migrate}>
        <ThemeProvider value={NAV_THEME[theme]}>{props.children}</ThemeProvider>
      </SQLiteProvider>
    </QueryClientProvider>
  );
};
