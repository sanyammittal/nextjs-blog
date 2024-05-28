import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

export const metadata = {
  title: "Blogging App",
  description: "I blogging app created by Sam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
