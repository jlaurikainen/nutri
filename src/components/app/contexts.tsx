import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SQLiteProvider } from "expo-sqlite";
import type { PropsWithChildren } from "react";
import { migrate } from "@/src/db/migrate";

const client = new QueryClient();

export const Contexts = (props: PropsWithChildren) => {
  return (
    <QueryClientProvider client={client}>
      <SQLiteProvider databaseName="nutri.db" onInit={migrate}>
        <ThemeProvider value={DefaultTheme}>{props.children}</ThemeProvider>
      </SQLiteProvider>
    </QueryClientProvider>
  );
};
