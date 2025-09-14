"use client";

import { Button } from "@/components/ui/Button";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import React from "react";

const SocialSitesShareButtons = () => {
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
              // TODO: finish share functionality
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(document.title);
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                  "_blank"
                );
              }}
            >
              <Facebook className="h-4 w-4" />
            </Button>

            <Button
              variant="primary"
              size="icon"
              className="rounded-full w-9 h-9"
              // TODO: finish share functionality
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(document.title);
                window.open(
                  `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
                  "_blank"
                );
              }}
            >
              <Twitter className="h-4 w-4" />
            </Button>

            <Button
              variant="primary"
              size="icon"
              className="rounded-full w-9 h-9"
              // TODO: finish share functionality
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
                  "_blank"
                );
              }}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSitesShareButtons;
