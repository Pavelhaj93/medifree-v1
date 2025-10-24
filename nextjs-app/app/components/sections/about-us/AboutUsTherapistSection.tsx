import Image from "next/image";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Calendar,
  GraduationCap,
  Heart,
  Stethoscope,
  Users,
} from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { sanityFetch } from "@/sanity/lib/live";
import { personQuery } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText, PortableTextBlock } from "next-sanity";
import CustomPortableText from "../../sanity/PortableText";
import Link from "next/link";

export default async function AboutUsTherapistSection() {
  const { data: radim } = await sanityFetch({
    query: personQuery,
    params: { slug: "mudr-radim-svoboda" },
  });

  const { data: michaela } = await sanityFetch({
    query: personQuery,
    params: { slug: "mudr-michaela-hnykova" },
  });

  const iconsSet = [Award, BookOpen, Heart, Brain];

  return (
    <>
      <section id={radim?.slug.current} className="bg-gray-50">
        <div className="container mx-auto px-4 md:px-10 py-8 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Image and credentials */}
            <div className="space-y-6 opacity-0 animate-fade-in-up">
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
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="md:size-12 flex-shrink-0 size-8 bg-primary rounded-full flex items-center justify-center">
                        <Stethoscope className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">{radim?.name}</p>
                        <p className="text-sm text-gray-600">
                          {radim?.specialization}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials and certifications */}
              <div className="bg-gray-50 rounded-xl p-6 opacity-0 animate-fade-in animation-delay-400">
                <h3 className="font-medium text-lg mb-4">
                  Odborné kvalifikace a certifikace
                </h3>
                <div className="space-y-3">
                  {radim?.certifications?.map((certification, idx) => {
                    const Icon = iconsSet[idx % iconsSet.length];
                    return (
                      <div
                        className="flex items-center gap-3"
                        key={certification}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm">{certification}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side - About text */}
            <div className="space-y-6 opacity-0 animate-fade-in-up animation-delay-200">
              <div>
                <h2 className="text-3xl font-medium mb-2">{radim?.name}</h2>
                <p className="text-primary font-medium mb-4">
                  {radim?.specialization}
                </p>
                <div className="prose max-w-none">
                  <CustomPortableText
                    value={radim?.biography as PortableTextBlock[]}
                  />
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {radim?.extraBlock?.title}
                </h3>
                <div className="prose max-w-none">
                  <CustomPortableText
                    value={
                      radim?.extraBlock?.description as PortableTextBlock[]
                    }
                  />
                </div>
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
                <Button asChild>
                  <Link href="https://cal.com/medifree">
                    Domluvit konzultaci s Radimem
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
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
          {/* {radim?.video && (
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

              <div className="mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                  {radim.video.asset?.url && (
                    <video
                      controls
                      poster={urlForImage(radim.video.thumbnailImage)
                        ?.width(1280)
                        .height(720)
                        .fit("crop")
                        .url()}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      <source src={radim.video.asset?.url} type="video/mp4" />
                      Váš prohlížeč nepodporuje html video přehrávač, prosím
                      aktualizujte jej.
                    </video>
                  )}

                  Video overlay info
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {radim.video.duration}
                  </div>
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
          )} */}
        </div>
      </section>
      {/* Second Therapist - Dr. Michael Chen */}
      <section id={michaela?.slug.current}>
        <div className="container mx-auto px-4 md:px-10 py-8 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Right side - About text (order reversed for visual variety) */}
            <div className="space-y-6 order-2 lg:order-1">
              <div>
                <h2 className="text-3xl font-medium mb-2">{michaela?.name}</h2>
                <p className="text-tertiary font-medium mb-4">
                  {michaela?.specialization}
                </p>
                <div className="prose max-w-none">
                  <CustomPortableText
                    value={michaela?.biography as PortableTextBlock[]}
                  />
                </div>
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

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-medium mb-3">
                  {michaela?.extraBlock?.title}
                </h3>
                <div className="prose max-w-none">
                  <CustomPortableText
                    value={
                      michaela?.extraBlock?.description as PortableTextBlock[]
                    }
                  />
                </div>
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
                <Button variant="tertiary" asChild>
                  <Link href="https://cal.com/medifree">
                    Domluvit konzultaci s Míšou
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
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
                  <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="md:size-12 size-8 flex-shrink-0 bg-tertiary rounded-full flex items-center justify-center">
                        <Stethoscope className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{michaela?.name}</p>
                        <p className="text-sm text-gray-600">
                          {michaela?.specialization}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials and certifications */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-medium text-lg mb-4">
                  Odborné kvalifikace a certifikace
                </h3>
                <div className="space-y-3">
                  {michaela?.certifications?.map((certification, idx) => {
                    const Icon = iconsSet[idx % iconsSet.length];
                    return (
                      <div
                        className="flex items-center gap-3"
                        key={certification}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm">{certification}</span>
                      </div>
                    );
                  })}
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
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">Work-Life Balance</h4>
                <p className="text-sm text-gray-600">
                  Helping professionals manage stress and find harmony
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">Stress & Burnout</h4>
                <p className="text-sm text-gray-600">
                  Evidence-based approaches to stress management and recovery
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-tertiary" />
                </div>
                <h4 className="font-medium mb-2">Lifestyle Medicine</h4>
                <p className="text-sm text-gray-600">
                  Integrating wellness practices with mental health treatment
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-md">
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

          {/* {michaela?.video && (
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

              <div className="mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                  {michaela.video.asset?.url && (
                    <video
                      controls
                      poster={urlForImage(michaela.video.thumbnailImage)
                        ?.width(1280)
                        .height(720)
                        .fit("crop")
                        .url()}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      <source
                        src={michaela.video.asset?.url}
                        type="video/mp4"
                      />
                      Váš prohlížeč nepodporuje html video přehrávač, prosím
                      aktualizujte jej.
                    </video>
                  )}

                  Video overlay info
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {michaela?.video.duration}
                  </div>
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
          )} */}
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
