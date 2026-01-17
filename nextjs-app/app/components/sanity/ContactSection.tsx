"use client";

import {
  Mail,
  MapPin,
  Clock,
  Instagram,
  Briefcase,
  CalendarClock,
} from "lucide-react";
import { Input } from "@/app/components/ui/Input";
import { Textarea } from "@/app/components/ui/Textarea";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../ui/Checkbox";
import {
  ContactSection as ContactSectionProps,
  GdprQueryResult,
} from "@/sanity.types";
import { toast } from "sonner";
import { contactSchema } from "@/app/lib/schemas";
import CustomPortableText from "./PortableText";
import { PortableTextBlock } from "next-sanity";

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection({
  gdpr,
  className,
  block,
}: {
  gdpr: GdprQueryResult;
  className?: string;
  block?: ContactSectionProps;
}) {
  const {
    bgColor = "lightGray",
    formTitle = "Napište nám",
    nameLabel = "Jméno a příjmení",
    namePlaceholder = "Vaše jméno",
    emailLabel = "Email",
    emailPlaceholder = "Váš email",
    messageLabel = "Zpráva",
    messagePlaceholder = "S čím vám můžeme pomoci?",
    termsText = "Souhlasím se zpracováním osobních údajů. Pro více informací si přečtěte naše",
    submitButtonText = "Odeslat zprávu",
    infoTitle = "Kontaktní informace",
    infoDescription = "Jsme tu pro vás. Neváhejte nás kontaktovat s jakýmikoli dotazy. Naš tým je připraven vám pomoci.",
    companyLabel = "Firma",
    companyText = "Medifree s.r.o. - Na Kotli 1176/29, 500 09 Hradec Králové",
    vatLabel = "IČO",
    vatNumber = "23153041",
    emailContactLabel = "Email",
    emailContactText = "info@medifree.cz",
    instagramLabel = "Instagram",
    instagramLink1Text = "@medifreecz",
    instagramLink1Url = "https://www.instagram.com/medifreecz",
    instagramLink2Text = "@michaela_medifree",
    instagramLink2Url = "https://www.instagram.com/michaela_medifree",
    workingHoursLabel = "Pracovní doba",
    workingHoursText = "Dle domluvy",
    bookButtonLabel = "Rezervovat konzultaci",
  } = block ?? {};

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

  const bg = bgColor === "white" ? "bg-white" : "bg-gray-50";
  return (
    <section className={`${bg} py-8 md:py-16 ${className}`}>
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
        <div className="bg-white p-8 rounded-2xl shadow-xl opacity-0 animate-fade-in-up hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-medium mb-6">{formTitle}</h3>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{nameLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={namePlaceholder}
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
                    <FormLabel>{emailLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={emailPlaceholder}
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
                    <FormLabel>{messageLabel}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={messagePlaceholder}
                        className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary min-h-55"
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
                        <CustomPortableText
                          value={termsText as PortableTextBlock[]}
                        />
                      </FormLabel>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
              <Button type="submit" className="w-full">
                {submitButtonText}
              </Button>
            </form>
          </Form>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col py-8 justify-between opacity-0 animate-fade-in-up animation-delay-200">
          <div>
            <h3 className="text-2xl font-medium mb-6">{infoTitle}</h3>
            <p className="text-gray-600 mb-8">{infoDescription}</p>

            <div className="space-y-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  {/* Icon for company name */}
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{companyLabel}</h4>
                  <p className="text-gray-600">{companyText}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  {/* Icon for vat number */}
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{vatLabel}</h4>
                  <p className="text-gray-600">{vatNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{emailContactLabel}</h4>
                  <p className="text-gray-600">{emailContactText}</p>
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
                  <h4 className="font-medium">{instagramLabel}</h4>
                  <div className="text-gray-600 space-x-4 flex flex-col">
                    <Link
                      href={instagramLink1Url}
                      className="text-primary hover:underline"
                    >
                      {instagramLink1Text}
                    </Link>
                    <Link
                      href={instagramLink2Url}
                      className="text-primary hover:underline"
                    >
                      {instagramLink2Text}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{workingHoursLabel}</h4>
                  <p className="text-gray-600">{workingHoursText}</p>
                </div>
              </div>
            </div>
          </div>

          <Button asChild variant="primary" className="mt-8 md:mt-0">
            <Link
              href="https://cal.com/medifree"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarClock className="inline mr-2" />
              {bookButtonLabel}
            </Link>
          </Button>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
