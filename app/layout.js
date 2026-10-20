import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/SkipLink";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { MotionProvider } from "@/context/MotionContext";
import { profile } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL(profile.siteUrl.startsWith("http") ? profile.siteUrl : "https://example.com"),
  title: "Md Aman | Full-Stack Developer",
  description: profile.tagline,
  openGraph: {
    title: "Md Aman | Full-Stack Developer",
    description: profile.tagline,
    url: profile.siteUrl,
    siteName: "Md Aman — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Aman | Full-Stack Developer",
    description: profile.tagline,
  },
  alternates: {
    canonical: profile.siteUrl,
  },
};

export const viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.siteUrl,
    jobTitle: profile.role,
    email: profile.email,
    description: profile.tagline,
    image: `${profile.siteUrl}/images/aman-2.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Patna",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.college,
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: profile.college,
    },
    sameAs: [
      "https://github.com/md-aman012",
      "https://www.linkedin.com/in/md-aman-76000a324/",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <noscript>
          {/* Reveal wrappers animate in on scroll, but their resting state is
              already visible — this is just a safety net for the animation. */}
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;filter:none !important}`}</style>
        </noscript>
        <MotionProvider>
          <SkipLink />
          <Nav />
          <main id="main">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
