import { Suspense } from "react";
import AppMenu from "@/components/ui/menu/AppMenu";

export const metadata = {
  title: "Items",
  description: "App to the management of items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <AppMenu title={"Items Financieros"} />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
