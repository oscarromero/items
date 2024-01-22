import AppMenu from "@/components/ui/menu/AppMenu";

export const metadata = {
  title: "Items",
  description: "App to the management of items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppMenu title={"Items Financieros"} />
        {children}
      </body>
    </html>
  );
}
