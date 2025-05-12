import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";
import type { Person } from "@/sanity.types";

type Props = {
  person: Pick<Person, "name" | "specialization" | "picture">;
};

export default function Avatar({ person }: Props) {
  const { name, specialization, picture } = person;

  return (
    <div className="flex items-center gap-4">
      {picture?.asset?._ref ? (
        <div className="w-12 h-12 rounded-full overflow-hidden relative">
          <Image
            alt={picture?.alt || ""}
            className="object-cover"
            height={48}
            width={48}
            src={
              urlForImage(picture)
                ?.height(48)
                .width(48)
                .fit("crop")
                .url() as string
            }
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{specialization}</p>
      </div>
    </div>
  );
}
