import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const data = await client.fetch(`
      *[_type == "homepage"][0] {
        _id,
        _type,
        title,
        pageBuilder[] {
          _type,
          _key,
          _type == "heroSectionCarousel" => {
            _type,
            _key,
            heading,
            subheading,
            badge,
            images,
            showBookButton
          }
        }
      }
    `);

    return Response.json({ data });
  } catch (error) {
    console.error("Query error:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
