import SocialConnectSectionComponent from "@/app/components/sections/homepage/SocialConnectSection";

type SocialConnectSectionProps = {
  block: {
    _type: string;
    _key: string;
    title?: string;
    subtitle?: string;
    badge?: string;
    description?: any; // blockContent
    socialLinks?: Array<{
      platform: string;
      url: string;
      label?: string;
    }>;
    backgroundColor?: string;
  };
};

export default function SocialConnectSection({
  block,
}: SocialConnectSectionProps) {
  const { backgroundColor = "bg-gray-50" } = block;

  return (
    <div className={backgroundColor}>
      <SocialConnectSectionComponent />
    </div>
  );
}
