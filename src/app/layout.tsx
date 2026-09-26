import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Bileşenlerimizi içeri aktarıyoruz
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

// SEO SEVİYESİ EN ÜST DÜZEYE ÇIKARILMIŞ METADATA
export const metadata: Metadata = {
  title: "Varen Lojistik | Şehir İçi ve Şehirler Arası Kurumsal Taşıma",
  description: "Türkiye'nin dört bir yanına kurumsal lojistik. Komple nakliyat, gümrük sevkiyatları, ekspres ticari yük ve sigortalı asansörlü evden eve taşımacılıkta güvenilir çözüm ortağınız.",
  keywords: [
    "lojistik", 
    "nakliyat", 
    "şehirler arası taşıma", 
    "istanbul lojistik", 
    "gümrük sevkiyatı", 
    "varen lojistik", 
    "evden eve nakliyat", 
    "asansörlü nakliyat", 
    "sigortalı taşıma"
  ],
  openGraph: {
    title: "Varen Lojistik | Yükünüz Bize, Zamanınız Size Kalsın",
    description: "Türkiye'nin 81 iline kesintisiz, güvenli ve hızlı lojistik destek sağlıyoruz.",
    url: "https://varenlojistik.com",
    siteName: "Varen Lojistik",
    locale: "tr_TR",
    type: "website",
  },
  alternates: {
    canonical: "https://varenlojistik.com",
  },
  // GOOGLE SİTE DOĞRULAMA KODU BURAYA EKLENDİ
  verification: {
    google: "google_dogrulama_kodunu_buraya_yapisitirin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // Google için Katmanlı (Schema Stacking) Yerel İşletme Markup Kodu
  const jsonLd = {
    "@context": "https://schema.org",
    // Algoritmayı domine etmek için 3 farklı otorite tipini birleştirdik
    "@type": ["MovingCompany", "LogisticsService", "LocalBusiness"],
    "name": "Varen Lojistik",
    "url": "https://varenlojistik.com",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "description": "İstanbul merkezli asansörlü, sigortalı evden eve ve şehirler arası Varen Lojistik firması.",
    "telephone": "+90 542 180 46 60",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": " ",
      "addressLocality": "Ataşehir",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.9890466,
      "longitude": 29.1171092
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "₺₺",
    // Yeni Eklenen Katmanlar: Hizmet Bölgesi ve Ticari Teklifler
    "areaServed": [
      {
        "@type": "Country",
        "name": "Turkey"
      }
    ],
    "makesOffer": {
      "@type": "Offer",
      "name": "Kurumsal Taşımacılık ve Şehirlerarası Lojistik",
      "description": "Profesyonel nakliyat, ofis taşıma ve uçtan uca tedarik zinciri yönetimi.",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "TRY"
      }
    }
  };

  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        {/* JSON-LD Script'i */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* Navbar her sayfanın en üstünde sabit duracak */}
        <Navbar />
        
        {/* Main içine üstten padding veriyoruz ki sabit Navbar içeriklerin üstünü kapatmasın. */}
        <main className="pt-20 flex-grow">{children}</main>
        
        {/* Footer her sayfanın en altında duracak */}
        <Footer />

        {/* TÜM SAYFALARDA SAĞ ALTTA SABİT DURACAK WHATSAPP BUTONU */}
        <FloatingWhatsApp />
        <a
          href="tel:+905421804660"
          className="fixed bottom-6 left-6 z-50 bg-[#1e3a8a] text-white p-3.5 md:p-4 rounded-full shadow-[0_4px_20px_rgba(30,58,138,0.5)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          title="Hemen Arayın"
        >
          <span className="absolute inset-0 rounded-full border-2 border-[#1e3a8a] animate-ping opacity-75"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:rotate-12 transition-transform"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>
      </body>
    </html>
  );
}