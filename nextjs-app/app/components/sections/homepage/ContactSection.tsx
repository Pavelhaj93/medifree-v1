"use client";

import { Mail, Phone, MapPin, Clock, Instagram, Briefcase } from "lucide-react";
import { Input } from "@/app/components/ui/Input";
import { Textarea } from "@/app/components/ui/Textarea";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { BookButton } from "@/app/components/others/BookButton";
import Link from "next/link";
import { michaelaInstagram, sharedInstagram } from "@/app/lib/social-links";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../../ui/Checkbox";
import { GdprQueryResult } from "@/sanity.types";
import { toast } from "sonner";
import { contactSchema } from "@/app/lib/schemas";

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection({
  gdpr,
  className,
}: {
  gdpr: GdprQueryResult;
  className?: string;
}) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      terms: false,
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (data: ContactFormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Nastala chyba, zkuste to prosím znovu.");
      return;
    }

    toast.success("Děkujeme za zprávu! Ozveme se Vám co nejdříve.");
    reset();
  };

  return (
    <section className={`bg-gray-50 py-8 md:py-16 ${className}`}>
      {/* <div className="container mx-auto px-4 md:px-10 py-16 md:pb-32">
        <div className="flex justify-center mb-8">
          <Badge variant="primary">Kontakt</Badge>
        </div>

        <h2 className="text-4xl md:text-5xl text-center mb-8">
          Kontaktujte nás
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-center">
          Máte jakékoli otázky? Napiště nám a my se Vám co nejdříve ozveme.
        </p> */}

      <div className="grid md:grid-cols-2 gap-12 container mx-auto px-4 md:px-10">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-medium mb-6">Napište nám</h3>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jméno a příjmení</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Vaše jméno"
                        className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Váš email"
                        className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zpráva</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="S čím vám můžeme pomoci?"
                        className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary min-h-[220px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="terms"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <FormItem className="flex flex-row items-center gap-2 mb-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal block">
                        Souhlasím se zpracováním osobních údajů. Pro více
                        informací si přečtěte naše{" "}
                        <Link
                          href={
                            gdpr?.file.asset?.url ?? "/ochrana-osobnich-udaju"
                          }
                          className="text-primary hover:underline"
                        >
                          Zásady ochrany osobních údajů
                        </Link>
                        .
                      </FormLabel>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
              <Button type="submit" className="w-full">
                Odeslat zprávu
              </Button>
            </form>
          </Form>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col py-8 justify-between">
          <div>
            <h3 className="text-2xl font-medium mb-6">Kontaktní informace</h3>
            <p className="text-gray-600 mb-8">
              Jsme tu pro vás. Neváhejte nás kontaktovat s jakýmikoli dotazy
              nebo obavami. Naše tým je připraven vám pomoci.
            </p>

            <div className="space-y-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  {/* Icon for company name */}
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Firma</h4>
                  <p className="text-gray-600">Medifree s.r.o.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  {/* Icon for vat number */}
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Ičo</h4>
                  <p className="text-gray-600">23153041</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">info@medifree.cz</p>
                </div>
              </div>

              {/* <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Telefon</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div> */}

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Instagram className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Instagram</h4>
                  <div className="text-gray-600 space-x-4 flex flex-col">
                    <Link
                      href={sharedInstagram}
                      className="text-primary hover:underline"
                    >
                      @medifree.cz
                    </Link>
                    <Link
                      href={michaelaInstagram}
                      className="text-primary hover:underline"
                    >
                      @michaela_medifree
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Pracovní doba</h4>
                  <p className="text-gray-600">Dle domluvy</p>
                </div>
              </div>
            </div>
          </div>

          <BookButton className="mt-8 md:mt-0" />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
