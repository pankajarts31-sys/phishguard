import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PhishGuard — Intelligent Phishing Detection & Security Intelligence",
  description:
    "Next-generation heuristic URL analyzer and interactive security simulation engine. Real-time threat telemetry and anti-phishing defense.",
  keywords: "phishing detection, cybersecurity, URL analyzer, phishing training, security intelligence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Subtle engineering grid background */}
        <div className="subtle-grid" />
        
        <Navbar />

        <main style={{ paddingTop: 64, minHeight: 'calc(100vh - 120px)' }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
