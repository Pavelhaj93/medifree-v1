import type { ServiceItemProps } from "@/components/sections/services/ServicesItemSection";

export const services: ServiceItemProps[] = [
  {
    id: "service1",
    tag: "konzultace",
    title: "Telemedicína",
    description:
      "Získejte přístup k odborné péči odkudkoli. Naše telemedicínské služby vám umožňují konzultace s našimi specialisty z pohodlí vašeho domova.",
    features: [
      {
        id: 1,
        label: "Osobní konzultace s odborníky",
      },
      {
        id: 2,
        label: "Rychlý přístup k péči bez čekání",
      },
      {
        id: 3,
        label: "Bezpečná komunikace z domova",
      },
    ],

    idealFor: "Osoby preferující pohodlné konzultace bez nutnosti cestování.",
    imageSrc: "/images/services/telemedicine.png",
    price: "od 900 Kč/sezení",
  },
  {
    id: "service2",
    tag: "Životní styl",
    title: "Individuální úprava životního stylu",
    description:
      "Naše služby zahrnují individuální úpravy životního stylu, které vám pomohou dosáhnout vašich cílů a zlepšit kvalitu vašeho života.",
    features: [
      {
        id: 1,
        label: "Osobní plán zdravého životního stylu",
      },
      {
        id: 2,
        label: "Poradenství v oblasti výživy a pohybu",
      },
      {
        id: 3,
        label: "Podpora při změně návyků",
      },
    ],
    idealFor: "Každého, kdo chce zlepšit své zdraví a pohodu.",
    imageSrc: "/images/services/lifestyle.png",
    price: "od 800 Kč/sezení",
  },
  {
    id: "service3",
    tag: "Monitoring",
    title: "Kontinuální monitorace hladiny cukru v krvi",
    description:
      "Naše služby zahrnují kontinuální monitoraci hladiny cukru v krvi, která vám pomůže lépe řídit vaše zdraví a prevenci onemocnění.",
    features: [
      {
        id: 1,
        label: "Osobní plán sledování",
      },
      {
        id: 2,
        label: "Sledování hladiny glukózy v reálném čase",
      },
      {
        id: 3,
        label: "Individuální analýzy a doporučení",
      },
      {
        id: 4,
        label: "Prevence komplikací při cukrovce",
      },
    ],
    idealFor: "Diabetiky a osoby ohrožené vysokou hladinou cukru.",
    imageSrc: "/images/services/glucose.png",
    price: "od 1 200 Kč/měsíc",
  },
  {
    id: "service4",
    tag: "Laboratorní vyšetření",
    title: "Doporučení a konzultace laboratorních vyšetření",
    description:
      "Naše služby zahrnují doporučení a konzultace laboratorních vyšetření, které vám pomohou lépe porozumět vašemu zdraví a potřebám.",
    features: [
      {
        id: 1,
        label: "Osobní doporučení laboratorních testů",
      },
      {
        id: 2,
        label: "Analýza výsledků krevních testů",
      },
      {
        id: 3,
        label: "Odborné konzultace s lékaři",
      },
    ],
    idealFor:
      "Osoby trpící chronickými onemocněními nebo potřebující prevenci.",
    imageSrc: "/images/services/lab.png",
    price: "od 1 000 Kč/konzultace",
  },
];
