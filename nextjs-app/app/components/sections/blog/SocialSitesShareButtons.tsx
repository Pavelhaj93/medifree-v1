"use client";

import { Button } from "@/app/components/ui/Button";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import React from "react";

export default function SocialSitesShareButtons() {
  const shareUrl = encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : ""
  );

  const openPopup = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const handleShare = (platform: "facebook" | "twitter" | "linkedin") => {
    switch (platform) {
      case "facebook":
        openPopup(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
        break;
      case "twitter":
        openPopup(`https://twitter.com/intent/tweet?url=${shareUrl}`);
        break;
      case "linkedin":
        openPopup(
          `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
        );
        break;
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        // user cancelled or share failed – you can handle it if needed
      }
    }
  };

  return (
    <div className="border-t border-b border-gray-200 py-6 my-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium mb-2">Sdílet</p>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="icon"
              className="rounded-full w-9 h-9"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="h-4 w-4" />
            </Button>

            <Button
              variant="primary"
              size="icon"
              className="rounded-full w-9 h-9"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="h-4 w-4" />
            </Button>

            <Button
              variant="primary"
              size="icon"
              className="rounded-full w-9 h-9"
              onClick={() => handleShare("linkedin")}
            >
              <Linkedin className="h-4 w-4" />
            </Button>

            {/* Optional native share for mobile */}
            {typeof navigator !== "undefined" && (
              <Button
                variant="outline"
                className="rounded-full px-3"
                onClick={nativeShare}
              >
                Sdílet…
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
