import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { BookButton } from "../others/BookButton";

export default function ContactSection({ first }: { first?: boolean }) {
  return (
    <section className="bg-white">
      <div className="container mx-auto">
        {first && <div className="border-t-8 border-secondary" />}
        {first && <div className="border-t-8 border-primary w-2/5" />}
        <div className="px-4 md:px-10 py-16 md:pb-32">
          <div className="flex justify-center mb-8">
            <Badge variant="primary">Kontakt</Badge>
          </div>

          <h2 className="text-4xl md:text-5xl text-center mb-8">
            {/* czech heading */}
            Kontaktujte nás
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-center">
            Máte otázky ohledně konzultací nebo jste připraveni si domluvit
            první schůzku? Jsem tu, abychom vám pomohli. Kontaktujte nás
            jakýmikoli z níže uvedených způsobů a my se vám co nejdříve ozveme.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-medium mb-6">Napište nám</h3>
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Jméno a příjmení
                  </label>
                  <Input
                    id="name"
                    placeholder="Vaše jméno"
                    className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Váš email"
                    className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Typ dotazu
                  </label>
                  <Select>
                    <SelectTrigger className="rounded-lg border-gray-200">
                      <SelectValue placeholder="Vyberte dotaz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Obecný dotaz</SelectItem>
                      <SelectItem value="session">Domluvit schůzku</SelectItem>
                      <SelectItem value="couples">Úzkosti a deprese</SelectItem>
                      <SelectItem value="individual">
                        Individuální terapie
                      </SelectItem>
                      <SelectItem value="grief">Životospráva</SelectItem>
                      <SelectItem value="work-life">Telemedicína</SelectItem>
                      <SelectItem value="other">Jiné</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Zpráva
                  </label>
                  <Textarea
                    id="message"
                    placeholder="S čím vám můžeme pomoci?"
                    className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary min-h-[120px]"
                  />
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Odeslat zprávu
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col py-8 justify-between">
              <div>
                <h3 className="text-2xl font-medium mb-6">
                  Kontaktní informace
                </h3>
                <p className="text-gray-600 mb-8">
                  Jsme tu pro vás. Neváhejte nás kontaktovat s jakýmikoli dotazy
                  nebo obavami. Naše tým je připraven vám pomoci.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">info@medifree.cz</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Telefon</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Lorem</h4>
                      <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Pracovní doba</h4>
                      <p className="text-gray-600">
                        Pondělí - Pátek: 9:00 - 18:00
                      </p>
                      <p className="text-gray-600">Sobota: 10:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <BookButton className="mt-8 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
