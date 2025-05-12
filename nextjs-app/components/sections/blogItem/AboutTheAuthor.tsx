import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import Image from "next/image";

export default function AboutTheAuthor({
  name,
  description,
  imageSrc,
}: {
  name: string;
  description: string;
  imageSrc: string;
}) {
  return (
    <div className="my-12">
      {/* <Badge variant="primary" className="mb-4">
        O autorovi
      </Badge> */}
      <h2 className="text-2xl font-medium mb-8">O autorovi</h2>
      <div className="bg-gray-50 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden relative shrink-0">
            <Image src={imageSrc} alt={name} fill className="object-cover" />
          </div>
          <div>
            {/* <h3 className="text-xl font-medium mb-2">O autorovi</h3> */}

            <h4 className="text-lg font-medium mb-2">{name}</h4>
            <p className="text-gray-600 mb-4">{description}</p>
            <Button variant="primary">Zobrazit všechny články</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
