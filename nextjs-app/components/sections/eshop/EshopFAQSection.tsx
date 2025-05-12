"use client";

import { Badge } from "@/components/ui/Badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/Accordion";

export default function EshopFAQSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-center mb-8">
        <Badge variant="primary">FAQ</Badge>
      </div>
      <h2 className="text-3xl font-medium mb-12 text-center">
        Často kladené dotazy
      </h2>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              V jakém formátu je e-kniha dostupná?
            </AccordionTrigger>
            <AccordionContent>
              E-kniha je dostupná ve formátech PDF, EPUB a MOBI, takže ji lze
              číst na většině zařízení – včetně Kindle, iPadu, Android tabletů a
              počítačů.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Jak získám přístup k e-knize po zakoupení?
            </AccordionTrigger>
            <AccordionContent>
              Po dokončení nákupu obdržíte e-mail s odkazy ke stažení ve všech
              dostupných formátech. K e-knize se také můžete kdykoliv dostat
              přes svůj účet na našem webu.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              Mohu si e-knihu vytisknout?
            </AccordionTrigger>
            <AccordionContent>
              Ano, verzi ve formátu PDF si můžete vytisknout pro osobní potřebu.
              E-kniha obsahuje i pracovní sešit s cvičeními a podněty k
              zapisování.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              Nabízíte vrácení peněz?
            </AccordionTrigger>
            <AccordionContent>
              Ano, nabízíme 30denní záruku vrácení peněz. Pokud nebudete s
              nákupem spokojeni, stačí kontaktovat naši podporu a vrácení
              zařídíme.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              Jsou k e-knize přiloženy nějaké bonusy?
            </AccordionTrigger>
            <AccordionContent>
              Ano! Vaše koupě zahrnuje přístup k vytištitelným pracovním listům,
              audio nahrávkám s vedenou meditací a soukromé komunitě, kde můžete
              knihu probírat s ostatními čtenáři.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">
              Jak dlouhá je e-kniha?
            </AccordionTrigger>
            <AccordionContent>
              E-kniha má 180 stran plných praktických cvičení, případových
              studií a pracovních listů. Je navržena tak, aby byla komplexní a
              zároveň snadno použitelná.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
