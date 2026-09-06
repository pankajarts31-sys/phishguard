import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PhishGuard — Advanced Phishing Detection & Education Platform",
  description:
    "Interactive phishing simulation and real-time URL detection platform. Analyze suspicious URLs, train your phishing detection skills, and stay protected from cyber threats.",
  keywords: "phishing detection, cybersecurity, URL analyzer, phishing training, security education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Background mesh gradient */}
        <div className="mesh-bg" />
        <div className="grid-bg" style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} />

        <Navbar />

        <main style={{ paddingTop: 72, minHeight: '100vh' }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
