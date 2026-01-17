"use client";

import Cal from "@calcom/embed-react";
import { Badge } from "@/app/components/ui/Badge";
import { useInView, getAnimationClasses } from "@/app/hooks/useInView";

export function CalendarSection() {
  const { ref: badgeRef, isInView: badgeInView } = useInView();
  const { ref: titleRef, isInView: titleInView } = useInView();
  const { ref: descRef, isInView: descInView } = useInView();
  const { ref: calRef, isInView: calInView } = useInView();

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container items-center justify-center flex flex-col w-full mx-auto px-4 md:px-10">
        <div
          ref={badgeRef}
          className={getAnimationClasses(badgeInView, "fade-in")}
        >
          <Badge variant="primary" className="mb-4">
            Rezervace
          </Badge>
        </div>
        <h2
          ref={titleRef}
          className={`text-3xl md:text-4xl font-medium mb-4 ${getAnimationClasses(titleInView, "fade-in-up", 200)}`}
        >
          Rezervujte si sezení
        </h2>
        <p
          ref={descRef}
          className={`text-gray-600 mb-8 text-center ${getAnimationClasses(descInView, "fade-in-up", 400)}`}
        >
          Vyberte si termín, který vám vyhovuje, a rezervujte si úvodní
          konzulaci zdarma a bez závazků.
        </p>
        <div
          ref={calRef}
          className={`flex justify-center w-full ${getAnimationClasses(calInView, "fade-in", 600)}`}
        >
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
