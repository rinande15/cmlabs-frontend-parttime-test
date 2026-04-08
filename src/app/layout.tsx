import "./globals.css";

export const metadata = {
  title: "MealMaster",
  description: "Ingredients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Inter&family=Noto+Serif&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface">{children}</body>
    </html>
  );
}
