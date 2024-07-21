import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/Header";
import { ReactElement } from "react";
import useIsMobile from "@/hooks/useIsMobile";

type Props = {
  children: ReactElement;
};

const DefaultLayout = ({ children }: Props) => {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col flex-1 w-full overflow-hidden min-h-screen h-full">
        <Header />
        <main
          className={`flex flex-col items-start w-full mb-16 ${isMobile ? "px-4" : "container"}`}
        >
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default DefaultLayout;
