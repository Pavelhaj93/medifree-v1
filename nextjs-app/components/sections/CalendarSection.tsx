"use client";

import Cal from "@calcom/embed-react";
import { Badge } from "../ui/Badge";

export function CalendarSection() {
  return (
    <section className="bg-white">
      <div className="container items-center justify-center flex flex-col w-full mx-auto px-4 md:px-10 py-16 md:py-32">
        <Badge variant="primary" className="mb-4">
          Rezervace
        </Badge>
        <h2 className="text-4xl md:text-5xl text-center mb-8">
          Rezervujte si sezení
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Vyberte si termín, který vám vyhovuje, a rezervujte si sezení s naším
          doktorem. První konzultace na 15min je zdarma a bez závazků.
        </p>
        <div className="flex justify-center w-full">
          <Cal
            calLink="pavel-hajduch-jix4cv"
            config={{ theme: "light" }}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
