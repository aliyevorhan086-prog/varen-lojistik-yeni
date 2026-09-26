import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import locations from '../../data/locations.json'; 
import Script from 'next/script';

export async function generateStaticParams() {
  return locations.map((location) => ({
    ilce: location.slug,
  }));
}

type Props = {
  params: Promise<{ ilce: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ilce } = await params;
  const location = locations.find((loc) => loc.slug === ilce);
  
  if (!location) {
    return { title: 'Sayfa Bulunamadı' };
  }

  return {
    title: `${location.name} Kurumsal Lojistik ve Şehirlerarası Nakliyat | Varen Lojistik`,
    description: `Varen Lojistik, ${location.name} lokasyonunda ticari yük taşımacılığı, sigortalı nakliyat ve tedarik zinciri çözümleri sunar. Profesyonel lojistik hizmetleri için fiyat teklifi alın.`,
  };
}

export default async function LocationPage({ params }: Props) {
  const { ilce } = await params;
  const location = locations.find((loc) => loc.slug === ilce);

  if (!location) {
    notFound(); 
  }

  // Dinamik WhatsApp Mesajı Oluşturma
  const waMessage = encodeURIComponent(`Merhaba, ${location.name} bölgesinden kurumsal lojistik / nakliyat hizmetiniz için fiyat almak istiyorum.`);
  const waLink = `https://wa.me/905421804660?text=${waMessage}`;
  const phoneLink = `tel:+905421804660`;

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    "name": `Varen Lojistik - ${location.name} Lojistik Merkezi`,
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
    <div className="bg-slate-50 min-h-screen font-sans">
      <Script
        id={`schema-${location.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      
      {/* Modern Kurumsal Hero Alanı */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1e3a8a] to-blue-900 text-white py-24 lg:py-32 px-4 relative overflow-hidden border-b-4 border-orange-500">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed389100a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="bg-orange-500 text-white text-sm font-bold tracking-wider uppercase py-1 px-4 rounded-full mb-6 shadow-lg">
            {location.name} Operasyon Merkezi
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {location.name} <span className="text-orange-400">Kurumsal Lojistik</span> Çözümleri
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            Varen Lojistik olarak, ticari operasyonlarınızı ve profesyonel taşımacılık ihtiyaçlarınızı uluslararası standartlarda ve tam sigorta güvencesiyle yönetiyoruz.
          </p>
        </div>
      </section>

      {/* Ana İçerik */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Sektörel İhtiyaçlara Özel Taşıma Mimarisi</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {location.name} bölgesinden Türkiye'nin 81 iline uzanan geniş hizmet ağımızla; zamanında teslimat, sıfır hasar prensibi ve şeffaf fiyatlandırma politikasıyla hareket ediyoruz. Tüm operasyonlarınız <strong>özel sigorta poliçesi</strong> ile güvence altına alınmaktadır.
          </p>
        </div>

        {/* Kartlar (Modern UI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Şehirlerarası Nakliyat",
              desc: `${location.name} çıkışlı tüm operasyonlarda modern araç filomuzla Türkiye geneline kesintisiz tedarik zinciri desteği.`
            },
            {
              title: "Kurumsal Ofis Taşımacılığı",
              desc: "İş süreçlerinizin aksamaması için donanımlarınızın barkodlanarak, planlı ve güvenli transferi."
            },
            {
              title: "Proje ve Ağır Yük Lojistiği",
              desc: "Hassas cihazlar, fuar kurulumları ve özel projeler için mühendislik standartlarında taşıma çözümleri."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-6 font-bold text-2xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                0{index + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Aksiyon (CTA) Bölümü */}
        <div className="bg-gradient-to-r from-slate-900 to-[#1e3a8a] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">{location.name} İçin Fiyat Teklifi Alın</h3>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg relative z-10">
            Operasyon detaylarınızı iletin, lojistik uzmanlarımız firmanıza özel en uygun planlamayı dakikalar içinde hazırlasın.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            {/* WhatsApp Butonu */}
            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold text-lg py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              WhatsApp'tan Fiyat Al
            </a>
            
            {/* Telefon Butonu */}
            <a 
              href={phoneLink} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Hemen Arayın
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}