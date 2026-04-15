import { Providers } from "./providers";

export const metadata = {
  title: "Stareon Official Dashboard",
  description: "Panel Kontrol Bot Stareon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#020617' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
