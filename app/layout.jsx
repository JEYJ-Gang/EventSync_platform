import "./globals.css";
import "@/styles/home.css";
import Navbar from "./dashboard/components/Navbar.jsx";

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
        <body className="app-layout">
        <Navbar />
        {children}
        </body>
        </html>
    );
}