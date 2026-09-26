import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import locations from '@/data/locations.json'; 
import Script from 'next/script';

export async function generateStaticParams() {
  return locations.map((location) => ({
    ilce: location.slug,
  }));
}

export async function generateMetadata({ params }: { params: { ilce: string } }): Promise<Metadata> {
  const location = locations.find((loc) => loc.slug === params.ilce);
  
  if (!location) {
    return { title: 'Sayfa Bulunamadı' };
  }

  return {
    title: `${location.name} Kurumsal Lojistik ve Şehirlerarası Nakliyat | Varen Lojistik`,
    description: `Varen Lojistik, ${location.name} lokasyonunda ticari yük taşımacılığı, sigortalı nakliyat ve tedarik zinciri çözümleri sunar. Profesyonel lojistik hizmetleri için fiyat teklifi alın.`,
  };
}

export default function LocationPage({ params }: { params: { ilce: string } }) {
  const location = locations.find((loc) => loc.slug === params.ilce);

  if (!location) {
    notFound();
  }

  // Arama motorları için lokasyona ve posta koduna tam entegre edilmiş hizmet şeması
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    "name": `Varen Lojistik - ${location.name} Lojistik ve Operasyon Merkezi`,
    "image": "https://varenlojistik.com/logo.png",
    "description": `${location.name} bölgesi için entegre lojistik, depolama, tedarik zinciri yönetimi ve kurumsal nakliyat operasyonları.`,
    "telephone": "+905421804660",
    "areaServed": {
      "@type": "Place",
      "name": location.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location.name,
        "addressCountry": "TR",
        "postalCode": location.postalCode
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.lat,
        "longitude": location.lng
      }
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "Varen Lojistik",
      "telephone": "+905421804660",
      "priceRange": "₺₺₺"
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Script
        id={`schema-${location.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      
      {/* Kurumsal Hero (Karşılama) Alanı */}
      <section className="bg-[#1e3a8a] text-white py-20 lg:py-28 px-4 relative overflow-hidden">
        {/* Opsiyonel: Arka plana hafif şeffaf bir lojistik/tır görseli eklenebilir */}
        <div className="absolute inset-0 opacity-10 bg-black"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {location.name} Kurumsal Lojistik Çözümleri
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            Varen Lojistik olarak, {location.name} lokasyonundaki ticari operasyonlarınızı ve profesyonel taşımacılık ihtiyaçlarınızı uluslararası standartlarda yönetiyoruz.
          </p>
        </div>
      </section>

      {/* Ana İçerik ve Vizyon */}
      <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sektörel İhtiyaçlara Özel Taşıma Mimarisi</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {location.name} bölgesinden Türkiye'nin 81 iline uzanan geniş hizmet ağımızla; zamanında teslimat, sıfır hasar prensibi ve şeffaf fiyatlandırma politikasıyla hareket ediyoruz. İster tam kapasite ticari yük taşımacılığı, ister kurumsal ofis yer değişimi olsun, tüm operasyonlarınız özel sigorta poliçesi ile güvence altına alınmaktadır.
          </p>
        </div>

        {/* Kurumsal Hizmetler Izgarası (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-lg flex items-center justify-center mb-6 font-bold text-2xl border border-blue-100">01</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Şehirlerarası Nakliyat</h3>
            <p className="text-gray-600 leading-relaxed">
              {location.name} çıkışlı veya varışlı tüm operasyonlarda modern araç filomuzla Türkiye geneline kesintisiz tedarik zinciri ve güvenli sevkiyat desteği.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-lg flex items-center justify-center mb-6 font-bold text-2xl border border-blue-100">02</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Kurumsal Ofis Taşımacılığı</h3>
            <p className="text-gray-600 leading-relaxed">
              İş süreçlerinizin aksamaması için hafta sonu veya planlı gece operasyonları dahil, donanımlarınızın barkodlanarak güvenli transferi.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-lg flex items-center justify-center mb-6 font-bold text-2xl border border-blue-100">03</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Proje ve Ağır Yük Lojistiği</h3>
            <p className="text-gray-600 leading-relaxed">
              Hassas sanayi ekipmanları, medikal cihazlar, fuar kurulumları ve asansörlü taşıma gerektiren özel projeler için mühendislik standartlarında çözümler.
            </p>
          </div>
        </div>

        {/* Harekete Geçirici Mesaj (Call to Action) */}
        <div className="bg-[#1e3a8a] rounded-2xl p-10 md:p-14 text-center text-white shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{location.name} Lokasyonu İçin Maliyet Analizi İsteyin</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Operasyon detaylarınızı iletin, uzman lojistik planlama ekibimiz firmanıza özel en uygun fiyat teklifini ve süreç analizini hızla hazırlasın.
          </p>
          <a href="tel:+905421804660" className="inline-flex items-center justify-center bg-white text-[#1e3a8a] font-bold text-lg py-4 px-10 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-md">
            Operasyon Ekibiyle Görüşün
          </a>
        </div>
      </section>
    </div>
  );
}