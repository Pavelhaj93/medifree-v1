import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Jméno je povinné"),
  email: z.string().email("Neplatný email"),
  message: z.string().min(1, "Zpráva je povinná"),
  terms: z.boolean().refine((v) => v === true, {
    message: "Musíte souhlasit se zpracováním osobních údajů",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
