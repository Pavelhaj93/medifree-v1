import Image from "next/image";
import { Badge } from "../ui/Badge";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const socialIcons = {
  radim: [
    {
      id: "facebook",
      href: "/images/social/facebook.svg",
      icon: <Facebook size={20} className="text-primary" />,
    },
    {
      id: "instagram",
      href: "/images/social/instagram.svg",
      icon: <Instagram size={20} className="text-primary" />,
    },
    {
      id: "linkedin",
      href: "/images/social/linkedin.svg",
      icon: <Linkedin size={20} className="text-primary" />,
    },
  ],
  michaela: [
    {
      id: "facebook",
      href: "/images/social/facebook.svg",
      icon: <Facebook size={20} className="text-primary" />,
    },
    {
      id: "instagram",
      href: "/images/social/instagram.svg",
      icon: <Instagram size={20} className="text-primary" />,
    },
    {
      id: "linkedin",
      href: "/images/social/linkedin.svg",
      icon: <Linkedin size={20} className="text-primary" />,
    },
  ],
};

const badges = {
  radim: [
    { id: "lifestyle", label: "Úprava životního stylu" },
    { id: "energy", label: "Navýšení hlading energie" },
    { id: "glucose", label: "Monitorace tělesných funkcí" },
    { id: "addiction", label: "Práce se závislostmi" },
    { id: "sleep", label: "Spánek" },
  ],
  michaela: [
    { id: "prevention", label: "Zdravotní prevence" },
    { id: "musculoskeletal", label: "Onemocnění pohybového aparátu" },
    { id: "chronic", label: "Chronické obtíže" },
    { id: "cyclicity", label: "Ženská cykličnost" },
    { id: "mental-health", label: "Dueševní zdraví" },
  ],
};

const topics = {
  radim: [
    { id: 1, label: "Přirozená cesta ke zdraví a volnosti" },
    {
      id: 2,
      label: "Propojení moderních technologií a alternativních přístupů",
    },
    { id: 3, label: "Telemedicína z pohodlí vašeho domova" },
  ],
  michaela: [
    { id: 1, label: "Komplexní přístup ke zdraví" },
    { id: 2, label: "Osobní konzultace" },
    { id: 3, label: "Přednášky a vzdělávání" },
  ],
};

type TherapistProps = {
  name: string;
  title: string;
  topics: { id: number; label: string }[];
  description: string;
  badgeList: { id: string; label: string }[];
  imageUrl: string;
  reverse?: boolean;
  pink?: boolean;
};

function Therapist({
  name,
  title,
  topics,
  description,
  badgeList,
  imageUrl,
  reverse = false,
  pink,
}: TherapistProps) {
  return (
    <section className="bg-gray-50 text-center md:text-left">
      <div className="grid md:grid-cols-2 gap-12 items-center container mx-auto px-4 md:px-10 py-16 md:py-32">
        <div className="mb-4 md:hidden">
          <Badge variant={pink ? "tertiary" : "primary"}>O nás</Badge>
        </div>
        <div
          className={`relative h-[400px] rounded-2xl overflow-hidden ${
            reverse ? "md:order-2" : ""
          }`}
        >
          {/* social icons in flex col in left right corner */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {socialIcons.radim.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="w-8 h-8 rounded-full bg-gray-50/80 flex items-center justify-center shadow-md z-10"
              >
                {item.icon}
              </a>
            ))}
          </div>
          <Image src={imageUrl} alt={name} fill className="object-cover" />
          {/* bottom name overlay */}
          <div className="absolute inset-0 flex h-12 self-end items-center justify-center p-4 bg-white">
            <h3
              className={`text-2xl text-center ${
                pink ? "text-tertiary" : "text-primary"
              } italic`}
            >
              {name}
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="mb-4 hidden md:block">
            <Badge variant={pink ? "tertiary" : "primary"}>O nás</Badge>
          </div>
          <h3 className="text-5xl mb-4">{title}</h3>

          <p className="text-gray-600 mb-4 leading-7">{description}</p>

          <div className="flex flex-wrap max-md:justify-center gap-4 mb-4">
            {badgeList.map((item) => (
              <Badge
                key={item.id}
                variant={pink ? "tertiary" : "primary"}
                className="uppercase"
              >
                <span
                  className={`w-2 h-2 ${
                    pink ? "bg-tertiary" : "bg-primary"
                  } rounded-full inline-block mr-2`}
                />
                {item.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TherapistSection() {
  return (
    <>
      <Therapist
        name="MUDr. Radim Svoboda"
        title="Přirozená cesta ke zdraví a volnosti"
        topics={topics.radim}
        description="Spojuji moderní technologie s alternativními přístupy založenými na nejnovějších vědeckých důkazech. Věřím, že cesta k optimálnímu zdraví vede přes hlubší pochopení vlastního těla – a právě to svým klientům umožňuji."
        badgeList={badges.radim}
        imageUrl="/images/placeholder.png"
      />
      <Therapist
        name="MUDr. Michaela Hnyková"
        title="Komplexní přístup ke zdraví"
        topics={topics.michaela}
        description="Jsem atestovaná rehabilitační lékařka, která se zaměřuje převážně na onemocnění pohybového aparátu a civilizační nemoci cestou komplexního přístupu. Propojuji postupy západní medicíny s postupy celostními, které jsou pro fyzické i psychické zdraví dlouhodobě udržitelné, bez nežádoucích účinků a s minimálními finančními náklady."
        badgeList={badges.michaela}
        imageUrl="/images/placeholder.png"
        reverse
        pink
      />
    </>
  );
}
