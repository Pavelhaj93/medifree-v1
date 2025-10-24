import Image from "next/image";
import Link from "next/link";
import { Service } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

export const ServiceCard = (service: Service & { reverse?: boolean }) => {
  return (
    <Link
      href={`#${service._id}`}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center group"
    >
      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
        <Image
          src={
            urlForImage(service.image)
              ?.width(120)
              .height(120)
              .fit("crop")
              .url() as string
          }
          alt={service.image?.alt || service.title}
          width={120}
          height={120}
        />
      </div>
      <h3 className="font-medium text-xl mb-4">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.description}</p>
    </Link>
  );
};
