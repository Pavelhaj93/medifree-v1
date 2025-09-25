import HeroSection from "@/app/components/others/HeroSection";
import AboutUsTherapistSection from "@/app/components/sections/about-us/AboutUsTherapistSection";

export const metadata = {
  title: "O nás - Medifree",
  description:
    "Seznamte se s týmem odborníků v Medifree, kteří jsou zde, aby vám pomohli na vaší cestě k lepšímu zdraví a pohodě. Naši lékaři jsou kvalifikovaní profesionálové s vášní pro poskytování vysoce kvalitní péče.",
};

export default function TherapistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection
        badge="O nás"
        title="Naše cíle a hodnoty"
        description=" Naším cílem je poskytovat komplexní a personalizovanou péči, která
          podporuje zdraví a pohodu našich klientů. Věříme v sílu edukace a
          individuálního přístupu, abychom pomohli každému dosáhnout jeho
          optimálního zdraví."
      />
      <AboutUsTherapistSection />
    </div>
  );
}
