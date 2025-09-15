import Image from "next/image";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Calendar,
  GraduationCap,
  Heart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/sanity/lib/live";
import { personQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { Arrow } from "@radix-ui/react-select";

export default async function AboutUsTherapistSection() {
  const { data: radim } = await sanityFetch({
    query: personQuery,
    params: { slug: "mudr-radim-svoboda" },
  });

  const { data: michaela } = await sanityFetch({
    query: personQuery,
    params: { slug: "mudr-michaela-hnykova" },
  });

  console.log("ttt radim", radim);

  return (
    <>
      <section id={radim?.slug as unknown as string} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Image and credentials */}
            <div className="space-y-6">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={
                    urlForImage(radim?.mainImage)
                      ?.height(800)
                      .width(800)
                      .fit("crop")
                      .url() as string
                  }
                  alt={radim?.name || "Therapist"}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Atestovaný lékař s praxí na interních a
                          rehabilitačních klinikách
                        </p>
                        <p className="text-sm text-gray-600">
                          MUDr. v oboru medicíny
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials and certifications */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-4">
                  Odborné kvalifikace a certifikace
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-sm">
                      Atestovaný lékař s praxí na interních a rehabilitačních
                      klinikách
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-sm">
                      Specialista na kognitivně-behaviorální terapii
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-primary" />
                    <span className="text-sm">
                      Certifikace v oblasti péče o trauma
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-primary" />
                    <span className="text-sm">
                      Pokročilé školení v oblasti duševního zdraví a wellness
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - About text */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-medium mb-2">{radim?.name}</h2>
                <p className="text-primary font-medium mb-4">
                  {radim?.specialization}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Ahoj, jsem lékař s několikaletou praxí na interních a
                  rehabilitačních klinikách v ČR. Mám dokončený interní kmen a
                  atestaci z rehabilitace.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Již před studiem medicíny mě zaujalo jak razantně se mohou
                  lišit naše nálady, hladina energie, vzhled nebo i schopnost
                  soustředění, produktivita a kreativita v různých dnech.
                  Postupně jsem si začal všímat, že nesouvisí jen s tím co se
                  děje v okolí, ale z větší části s naším denním režimem,
                  výživou (fyzickou i duševní), pohybem, kontrolou pozornosti.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Jednotlivé oblasti jsem postupně objevoval dle aktuálních
                  trendů a vše si testoval přibližně od roku 2012. Během práce
                  na interní klinice jsem si uvědomil, že přirozenou prioritou
                  veřejného zdravotnictví v ČR jsou závažné stavy ohrožující
                  život a nezbývá prostor či finance na preventivní opatření.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Moje vize</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Během práce na interní klinice jsem si uvědomil, že přirozenou
                  prioritou veřejného zdravotnictví v ČR jsou závažné stavy
                  ohrožující život a nezbývá prostor či finance na preventivní
                  opatření.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  A právě v prevenci vidím smysl jak na úrovni jednotlivce, tak
                  v úlevě zdravotnictví jako celku. Mou prioritou je výběr
                  jednoduchých, dostupných metod pro každého bez komerční
                  zátěže. Zároveň se chci zaměřit na principy, kterým se u nás
                  nevěnuje příliš pozornosti.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Věnuji se tématům výživy, pohybu, vnitřní práce - kontroly
                  pozornosti vč. problematiky návyků (dopaminu) a optimalizaci
                  hladiny testosteronu u mužů.
                </p>
              </div>

              <div className="bg-primary/5 rounded-xl p-6">
                <h3 className="text-xl font-medium mb-3">Moje mise</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Aktuálně se také soustředím na účinky přírody na organismus a
                  jak je co nejlépe využít i v rámci městského života ke
                  zlepšení soustředění, kreativity a celkové pohody.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Rád bych nabídl alternativu lidem, u kterých lékař zvažuje
                  nasazení léků (vysoký krevní tlak, cukrovka II.typu, obezita,
                  antidepresiva,..) ve smyslu řešení změnou životního stylu dle
                  aktuálních vědeckých poznatků.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {radim?.topics?.map((topic) => (
                  <Badge key={topic}>
                    <span className="w-2 h-2 bg-primary rounded-full inline-block mr-2" />
                    {topic}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button>
                  Domluvit konzultaci s Radimem
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                {/* <Button
                variant="outline"
                className="rounded-full border-[#8D3F38] text-[#8D3F38] hover:bg-[#8D3F38] hover:text-white bg-transparent"
              >
                View Specializations
              </Button> */}
              </div>
            </div>
          </div>

          {/* Specializations for Dr. Johnson
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-2xl font-medium text-center mb-12">Dr. Johnson's Specializations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-[#8D3F38]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-[#8D3F38]" />
                </div>
                <h4 className="font-medium mb-2">Anxiety & Depression</h4>
                <p className="text-sm text-gray-600">
                  Evidence-based treatments for mood disorders and anxiety conditions
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-[#8D3F38]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-[#8D3F38]" />
                </div>
                <h4 className="font-medium mb-2">Trauma Recovery</h4>
                <p className="text-sm text-gray-600">Specialized trauma-informed care and EMDR therapy</p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-[#8D3F38]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-[#8D3F38]" />
                </div>
                <h4 className="font-medium mb-2">Couples Therapy</h4>
                <p className="text-sm text-gray-600">Relationship counseling and communication improvement</p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-[#8D3F38]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-[#8D3F38]" />
                </div>
                <h4 className="font-medium mb-2">Mindfulness & Wellness</h4>
                <p className="text-sm text-gray-600">Holistic approaches to mental health and well-being</p>
              </div>
            </div>
          </div> */}

          {/* Video Introduction Section */}
          {radim?.video && (
            <div className="mt-16 pt-16 border-t border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-medium mb-4">
                  Osobní message od Radima
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Poznejte mě osobně a zjistěte, jak mohu pomoci na vaší cestě
                  ke zdraví a pohodě.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                  <video
                    controls
                    poster={radim.video.thumbnailUrl}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    <source
                      src="https://cdn.sanity.io/files/rmirl1zi/test/43f5dba90201186204d50e906b03dba8b5cbb2d8.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video overlay info */}
                  {/* <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {radim.video.duration}
                  </div> */}
                </div>

                <div className="text-center mt-6">
                  <h4 className="font-medium text-lg mb-2">
                    Vítejte v Medifree
                  </h4>
                  <p className="text-sm text-gray-500">
                    Podívejte se na krátké video, kde se s vámi Radim podělí o
                    svou vizi a přístup k péči o vaše zdraví.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Second Therapist - Dr. Michael Chen */}
      <section
        id={michaela?.slug as unknown as string}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Right side - About text (order reversed for visual variety) */}
            <div className="space-y-6 order-2 lg:order-1">
              <div>
                <h2 className="text-3xl font-medium mb-2">{michaela?.name}</h2>
                <p className="text-tertiary font-medium mb-4">
                  {michaela?.specialization}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Jsem lékařka s několika lety zkušeností na interních
                  odděleních s ukončeným ústním interním kmenem a atestací z
                  rehabilitace. Už během studia na medicíně mě zajímaly
                  alternativnější postupy léčby, protože jsem z vlastních
                  zkušeností poznala, že si západní medicína ne vždy dokáže
                  poradit (hlavně s chronickými obtížemi všeho druhu).
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Odjakživa mě zajímala zdravá výživa a pohyb, postupně jsem se
                  začala zajímat také o psychosomatiku, péči o duševní zdraví a
                  kvalitnější spánek, které považuji za nutnou součást zdravého
                  životního stylu a spokojenějšího života.
                </p>
              </div>

              {/* <div>
                <h3 className="text-xl font-medium mb-3">
                  Integrative Wellness Approach
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Další téma, které je pro mě velice zajímavé a aktuální je
                  ženská cykličnost, tedy zaměření na ženskou hormonální
                  rovnováhu a s ní spojené jakékoliv obtíže.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  V žádném případě nezasahuji do léčby ostatních lékařů a
                  terapeutů a stále věřím, že i západní medicína má své
                  uplatnění, a proto se snažím o co nejvíce komplexní a celostní
                  přístup v péči o sebe i o své klienty 🙂)
                </p>
              </div> */}

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-3">Další zaměření</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Další téma, které je pro mě velice zajímavé a aktuální je
                  ženská cykličnost, tedy zaměření na ženskou hormonální
                  rovnováhu a s ní spojené jakékoliv obtíže.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  V žádném případě nezasahuji do léčby ostatních lékařů a
                  terapeutů a stále věřím, že i západní medicína má své
                  uplatnění, a proto se snažím o co nejvíce komplexní a celostní
                  přístup v péči o sebe i o své klienty 🙂.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {michaela?.topics?.map((topic) => (
                  <Badge key={topic} variant="tertiary">
                    <span className="w-2 h-2 bg-tertiary rounded-full inline-block mr-2" />
                    {topic}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="tertiary" className="rounded-full">
                  Domluvit konzultaci s Míšou
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                {/* <Button
                  variant="outline"
                  className="rounded-full border-tertiary text-tertiary hover:bg-tertiary hover:text-white bg-transparent"
                >
                  Learn About Wellness Approach
                </Button> */}
              </div>
            </div>

            {/* Left side - Image and credentials (order reversed) */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={
                    urlForImage(michaela?.mainImage)
                      ?.height(800)
                      .width(800)
                      .fit("crop")
                      .url() as string
                  }
                  alt={michaela?.name || "Therapist"}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Atestovaná lékařka s praxí na interních a
                          rehabilitačních klinikách
                        </p>
                        <p className="text-sm text-gray-600">
                          MUDr. v oboru medicíny
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials and certifications */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-medium text-lg mb-4">
                  Odborné kvalifikace a certifikace
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-tertiary" />
                    <span className="text-sm">
                      Atestovaná lékařka s praxí na interních a rehabilitačních
                      klinikách
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-tertiary" />
                    <span className="text-sm">
                      Specialista na kognitivně-behaviorální terapii
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-tertiary" />
                    <span className="text-sm">
                      Certifikace v oblasti péče o trauma
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-tertiary" />
                    <span className="text-sm">
                      Pokročilé školení v oblasti duševního zdraví a wellness
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specializations for Dr. Chen */}
          {/* <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-2xl font-medium text-center mb-12">
              Dr. Chen's Specializations
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">Work-Life Balance</h4>
                <p className="text-sm text-gray-600">
                  Helping professionals manage stress and find harmony
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">Stress & Burnout</h4>
                <p className="text-sm text-gray-600">
                  Evidence-based approaches to stress management and recovery
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">Lifestyle Medicine</h4>
                <p className="text-sm text-gray-600">
                  Integrating wellness practices with mental health treatment
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">Performance Optimization</h4>
                <p className="text-sm text-gray-600">
                  Helping high achievers maintain mental clarity and focus
                </p>
              </div>
            </div>
          </div> */}

          {michaela?.video && (
            <div className="mt-16 pt-16 border-t border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-medium mb-4">
                  Osobní message od Míšy
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Poznejte mě osobně a zjistěte, jak mohu pomoci na vaší cestě
                  ke zdraví a pohodě.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                  <video
                    controls
                    poster={michaela?.video.thumbnailUrl}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    <source
                      src="https://cdn.sanity.io/files/rmirl1zi/test/589d304a65f995b79ce40c7fcaa90198b1736322.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video overlay info */}
                  {/* <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {michaela?.video.duration}
                  </div> */}
                </div>

                <div className="text-center mt-6">
                  <h4 className="font-medium text-lg mb-2">
                    Vítejte v Medifree
                  </h4>
                  <p className="text-sm text-gray-500">
                    Podívejte se na krátké video, kde se s vámi Míša podělí o
                    svou vizi a přístup k péči o vaše zdraví.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Team Stats & CTA */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">
                500+
              </div>
              <p className="text-gray-600">Clients helped on their journey</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">
                27+
              </div>
              <p className="text-gray-600">Combined years of experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">
                98%
              </div>
              <p className="text-gray-600">Client satisfaction rate</p>
            </div>
          </div>

          <div className="bg-primary rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 opacity-90">
              Take the first step toward positive change with a free 15-minute
              consultation. We'll discuss your needs and match you with the
              right therapist for your unique situation.
            </p>
            <Button className="rounded-full bg-white text-primary hover:bg-gray-100 px-8 py-6">
              Schedule Your Free Consultation
            </Button>
          </div>
        </div>
      </section> */}
    </>
  );
}
