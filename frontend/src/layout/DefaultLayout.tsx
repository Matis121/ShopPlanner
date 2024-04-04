import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/Header";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col flex-1 w-full overflow-hidden min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Header />
        <main className="flex flex-col items-start w-full container mb-16">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default DefaultLayout;
