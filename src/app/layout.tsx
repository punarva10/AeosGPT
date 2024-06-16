import "./globals.css";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "FanVerse",
  description: "FanVerse App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToasterContext />
          <Navbar />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
