import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ShoppingBag, TrendingUp, Store, Wrench } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import cityhubImg from "@/assets/cityhub-mall.webp";
import useSEO from "@/hooks/useSEO";
import cityhub1 from "@/assets/gallery/cityhub-1.webp";
import cityhub2 from "@/assets/gallery/cityhub-2.webp";
import cityhub3 from "@/assets/gallery/cityhub-3.webp";
import cityhub4 from "@/assets/gallery/cityhub-4.webp";
import cityhub5 from "@/assets/gallery/cityhub-5.webp";
import cityhub6 from "@/assets/gallery/cityhub-6.webp";
import cityhub7 from "@/assets/gallery/cityhub-7.webp";
import cityhub8 from "@/assets/gallery/cityhub-8.webp";

const galleryImages = [cityhub1, cityhub2, cityhub3, cityhub4, cityhub5, cityhub6, cityhub7, cityhub8];
const galleryVideos = ["9pl-SiE0VVk", "868YMiO0LJc", "82mVbp9nB6U", "VIvmPBqrLnk"];

const unitTypes = [
  { icon: ShoppingBag, label: "Commercial units for rent" },
  { icon: TrendingUp, label: "Retail properties for investment" },
  { icon: Store, label: "Retail shops for rent" },
  { icon: Wrench, label: "Service providers & specialty businesses" },
];

const whyInvest = [
  "Prime commercial hub in one of East Cairo's most dynamic urban districts",
  "Wide range of unit types, with commercial spaces starting from 29 m²",
  "Competitive prices with investor-friendly payment plans",
  "Integrated mall concept: shopping, dining, leisure, and entertainment",
  "Full range of services: hypermarket, restaurants, cinemas, children's entertainment",
];

const CityHubMall = () => {
  useSEO("City Hub Mall | Commercial Units for Rent in El Shorouk", "Explore prime business properties & spaces in City Hub Mall in El Shorouk offering commercial units for rent and sale at flexible prices.");

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-36 pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-3">ASWAQ Developments</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              City Hub Mall at El Shorouk
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              A premier integrated commercial and entertainment destination where profitable investment meets everyday lifestyle demand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-lg overflow-hidden aspect-[4/3]">
                <img src={cityhubImg} alt="City Hub Mall" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">City Hub Mall at El Shorouk City</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                City Hub El Shorouk Mall is a premier integrated commercial and entertainment destination. Strategically positioned in the heart of El Shorouk City, this modern mall delivers high-visibility commercial real estate designed for constant foot traffic and business activity.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                With a blend of retail spaces, dining, entertainment, and lifestyle offerings, City Hub presents a compelling opportunity for investors seeking commercial units for sale in one of East Cairo's fastest-growing districts.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">City Hub Mall Location</h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            Situated on El Nawadi Street in El Shorouk City, City Hub Mall benefits from a strategic position in a bustling residential and commercial corridor.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto p-6 bg-background rounded-lg"
          >
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
              <p className="text-foreground font-body text-sm text-left">
                Prime placement near major arteries like Suez Road, the Ring Road, and the Gamal Abdel Nasser Axis for effortless connectivity across Cairo.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1527093465797!2d31.34942880000001!3d30.061156900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f6d0024fbe5%3A0xa28dc2865dabbf10!2sCity%20Hub!5e0!3m2!1sen!2seg!4v1772535758532!5m2!1sen!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="City Hub Mall Location"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Available Units */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Commercial Units Available at City Hub Mall
          </h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            Explore available units for rent & sale at City Hub Mall ranging from 29 m² to 198 m².
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {unitTypes.map((type, i) => (
              <motion.div key={type.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-6 bg-cream rounded-lg"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <type.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body text-sm text-center">{type.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why Invest in City Hub Mall</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyInvest.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 bg-background rounded-lg"
              >
                <span className="text-accent font-bold">✓</span>
                <p className="text-foreground font-body text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MallGallerySection mallName="City Hub Mall" images={galleryImages} videos={galleryVideos} />

      <CTASection
        title="Invest in City Hub Mall Today"
        subtitle="Secure your commercial unit in a strategically positioned destination in El Shorouk City and benefit from high visibility, steady foot traffic, and flexible ownership options."
        buttonText="Request Unit Details"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default CityHubMall;
