import Image from "next/image";
import { ArrowRight, Instagram } from "lucide-react";
import { allPersonsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { michaelaInstagram, sharedInstagram } from "@/app/lib/social-links";
import Link from "next/link";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";

const socialIcons = {
  radim: [
    // {
    //   id: "facebook",
    //   href: "/images/social/facebook.svg",
    //   icon: <Facebook size={20} className="text-primary" />,
    // },
    {
      id: "instagram",
      href: sharedInstagram,
      icon: <Instagram size={24} className="text-primary" />,
    },
    // {
    //   id: "linkedin",
    //   href: "/images/social/linkedin.svg",
    //   icon: <Linkedin size={20} className="text-primary" />,
    // },
  ],
  michaela: [
    // {
    //   id: "facebook",
    //   href: "/images/social/facebook.svg",
    //   icon: <Facebook size={20} className="text-primary" />,
    // },
    {
      id: "instagram",
      href: michaelaInstagram,
      icon: <Instagram size={24} className="text-tertiary" />,
    },
    // {
    //   id: "linkedin",
    //   href: "/images/social/linkedin.svg",
    //   icon: <Linkedin size={20} className="text-primary" />,
    // },
  ],
};

type TherapistProps = {
  name: string;
  title: string;
  slug: {
    current: string;
  };
  topics: string[];
  description: string;
  imageUrl: string;
  reverse?: boolean;
  pink?: boolean;
};

function Therapist({
  name,
  title,
  slug,
  topics,
  description,
  imageUrl,
  reverse = false,
  pink,
}: TherapistProps) {
  return (
    <section className="bg-gray-50 text-left">
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
            {pink
              ? socialIcons.michaela.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="w-10 h-10 rounded-full bg-gray-50/80 flex items-center justify-center shadow-md z-10 hover:opacity-80 transition-opacity"
                  >
                    {item.icon}
                  </Link>
                ))
              : socialIcons.radim.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="w-10 h-10 rounded-full bg-gray-50/80 flex items-center justify-center shadow-md z-10 hover:opacity-80 transition-opacity"
                  >
                    {item.icon}
                  </Link>
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
          <p className="text-gray-600 mb-4 leading-7">{description}</p>
          <Button
            variant="link"
            className={`mb-4 self-start px-0 ${pink ? "text-tertiary" : "text-primary"}`}
            asChild
          >
            <Link href={`/o-nas#${slug.current}`}>
              Více o mně zde
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          <div className="flex flex-wrap gap-4 mb-4">
            {topics.map((item) => (
              <Badge
                key={item}
                variant={pink ? "tertiary" : "primary"}
                className="uppercase"
              >
                <span
                  className={`w-2 h-2 ${
                    pink ? "bg-tertiary" : "bg-primary"
                  } rounded-full inline-block mr-2`}
                />
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function TherapistSection() {
  const { data: persons } = await sanityFetch({
    query: allPersonsQuery,
  });

  return (
    <>
      {persons.reverse().map((person, index) => (
        <Therapist
          key={person._id}
          name={person.name}
          title={person.specialization}
          slug={person.slug as unknown as { current: string }}
          topics={person.topics}
          description={person.description}
          imageUrl={
            ["/images/therapist/radim.jpg", "/images/therapist/michaela.jpg"][
              index
            ]
          }
          pink={index % 2 === 1}
          reverse={index % 2 !== 0}
        />
      ))}
    </>
  );
}
