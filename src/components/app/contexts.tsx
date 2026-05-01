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
        <ThemeProvider
          value={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              card: "#f7fff7", // expo-router stack header background
              text: "#1c1c1e", // expo-router stack header text/icon color
            },
            fonts: {
              ...DefaultTheme.fonts,
              bold: { fontFamily: "SpaceGrotesk-Bold", fontWeight: "bold" },
              medium: { fontFamily: "SpaceGrotesk-medium", fontWeight: "500" },
              regular: {
                fontFamily: "SpaceGrotesk-Regular",
                fontWeight: "normal",
              },
            },
          }}
        >
          {props.children}
        </ThemeProvider>
      </SQLiteProvider>
    </QueryClientProvider>
  );
};
