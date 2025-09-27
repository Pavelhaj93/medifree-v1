"use client";

import Cal from "@calcom/embed-react";
import { Badge } from "@/app/components/ui/Badge";

export function CalendarSection() {
  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container items-center justify-center flex flex-col w-full mx-auto px-4 md:px-10">
        <Badge variant="primary" className="mb-4">
          Rezervace
        </Badge>
        <h2 className="text-3xl md:text-4xl font-medium mb-4">
          Rezervujte si sezení
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Vyberte si termín, který vám vyhovuje, a rezervujte si úvodní
          konzulaci zdarma a bez závazků.
        </p>
        <div className="flex justify-center w-full">
          <Cal
            calLink="medifree"
            config={{ theme: "light" }}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
