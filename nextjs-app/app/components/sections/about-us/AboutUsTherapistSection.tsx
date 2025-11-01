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
import { allPersonsQuery } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText, PortableTextBlock } from "next-sanity";
import CustomPortableText from "../../sanity/PortableText";
import Link from "next/link";
import { AllPersonsQueryResult } from "@/sanity.types";

type TherapistCardProps = {
  person: AllPersonsQueryResult[0];
  index: number;
};

function TherapistCard({ person, index }: TherapistCardProps) {
  const isPink = index % 2 === 1;
  const isReversed = index % 2 !== 0;
  const iconsSet = [Award, BookOpen, Heart, Brain];

  return (
    <section
      id={person?.slug.current}
      className={isPink ? "bg-white" : "bg-gray-50"}
    >
      <div className="container mx-auto px-4 md:px-10 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content side */}
          <div
            className={`space-y-6 opacity-0 animate-fade-in-up animation-delay-200 order-2 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
          >
            <div>
              <h2 className="text-3xl font-medium mb-2">{person?.name}</h2>
              <p
                className={`font-medium mb-4 ${isPink ? "text-tertiary" : "text-primary"}`}
              >
                {person?.specialization}
              </p>
              <div className="prose max-w-none">
                <CustomPortableText
                  value={person?.biography as PortableTextBlock[]}
                />
              </div>
            </div>

            {person?.extraBlock && (
              <div
                className={`rounded-xl p-6 ${isPink ? "bg-white shadow-md" : "bg-primary/5"}`}
              >
                <h3 className="text-xl font-semibold mb-3">
                  {person?.extraBlock?.title}
                </h3>
                <div className="prose max-w-none">
                  <CustomPortableText
                    value={
                      person?.extraBlock?.description as PortableTextBlock[]
                    }
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-6">
              {person?.topics?.map((topic) => (
                <Badge key={topic} variant={isPink ? "tertiary" : "primary"}>
                  <span
                    className={`w-2 h-2 rounded-full inline-block mr-2 ${isPink ? "bg-tertiary" : "bg-primary"}`}
                  />
                  {topic}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant={isPink ? "tertiary" : "primary"} asChild>
                <Link href="https://cal.com/medifree">
                  Domluvit konzultaci s {isPink ? "Míšou" : "Radimem"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Image side */}
          <div
            className={`space-y-6 opacity-0 animate-fade-in-up order-1 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative h-[600px] sm:h-[1000px] lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src={
                  urlForImage(person?.mainImage)
                    ?.height(1200)
                    .width(1120)
                    .fit("crop")
                    .url() as string
                }
                alt={person?.name || "Therapist"}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`md:size-12 size-8 flex-shrink-0 rounded-full flex items-center justify-center ${isPink ? "bg-tertiary" : "bg-primary"}`}
                    >
                      <Stethoscope
                        className={`h-6 w-6 ${isPink ? "text-white" : "text-secondary"}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{person?.name}</p>
                      <p className="text-sm text-gray-600">
                        {person?.specialization}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials and certifications */}
            {person?.certifications && person.certifications.length > 0 && (
              <div
                className={`rounded-xl p-6 opacity-0 animate-fade-in animation-delay-400 ${isPink ? "bg-white shadow-md" : "bg-gray-50"}`}
              >
                <h3 className="font-medium text-lg mb-4">
                  Odborné kvalifikace a certifikace
                </h3>
                <div className="space-y-3">
                  {person.certifications.map((certification, idx) => {
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function AboutUsTherapistSection() {
  const { data: persons } = await sanityFetch({
    query: allPersonsQuery,
  });

  if (!persons || persons.length === 0) {
    return null;
  }

  return (
    <>
      {persons.reverse().map((person, index) => (
        <TherapistCard key={person._id} person={person} index={index} />
      ))}
    </>
  );
}
