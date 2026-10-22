"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/Button";
import type { PacketaPoint } from "@/app/context/cartContext";

// Packeta (Zásilkovna) widget v6: https://widget.packeta.com/v6/www/js/library.js
type PacketaWidgetPoint = {
  id: string | number;
  name?: string;
  formatedValue?: string;
  street?: string;
  city?: string;
  zip?: string;
};

declare global {
  interface Window {
    Packeta?: {
      Widget: {
        pick: (
          apiKey: string,
          callback: (point: PacketaWidgetPoint | null) => void,
          options?: Record<string, unknown>,
        ) => void;
      };
    };
  }
}

const SCRIPT_SRC = "https://widget.packeta.com/v6/www/js/library.js";
const API_KEY = process.env.NEXT_PUBLIC_PACKETA_API_KEY;

let scriptPromise: Promise<void> | null = null;
function loadPacketaScript(): Promise<void> {
  if (window.Packeta?.Widget) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Packeta widget failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

function toPoint(p: PacketaWidgetPoint): PacketaPoint {
  const address =
    p.formatedValue ||
    [p.street, [p.zip, p.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  return { id: String(p.id), name: p.name ?? "Výdejní místo", address };
}

type Props = {
  value: PacketaPoint | null;
  onChange: (point: PacketaPoint) => void;
  buttonText: string;
};

export default function PacketaPointPicker({ value, onChange, buttonText }: Props) {
  const [loading, setLoading] = useState(false);

  if (!API_KEY) {
    // Testing without a Zásilkovna account: locally and on Vercel preview deployments,
    // never on the production site (NEXT_PUBLIC_VERCEL_ENV is set by Vercel).
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ) {
      return (
        <div className="space-y-2">
          {value && <p className="text-sm">{value.name}, {value.address}</p>}
          <Button
            type="button"
            variant="outline"
            className="w-full min-h-11"
            onClick={() =>
              onChange({ id: "TEST-0000", name: "Testovací Z-BOX (jen test)", address: "Testovací 1, 110 00 Praha" })
            }
          >
            Použít testovací výdejní místo
          </Button>
          <p className="text-xs text-gray-500">Chybí NEXT_PUBLIC_PACKETA_API_KEY – testovací režim.</p>
        </div>
      );
    }
    return (
      <p className="text-sm text-red-600">
        Výběr výdejního místa zatím není nastavený. Kontaktujte nás prosím na info@medifree.cz.
      </p>
    );
  }

  const open = async () => {
    setLoading(true);
    try {
      await loadPacketaScript();
      window.Packeta?.Widget.pick(
        API_KEY,
        (point) => {
          if (point) onChange(toPoint(point));
        },
        { country: "cz", language: "cs", appIdentity: "medifree-web" },
      );
    } catch {
      toast.error("Nepodařilo se načíst mapu výdejních míst. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <div className="flex gap-2 rounded-lg border border-primary/30 bg-white p-3 text-sm">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
          <div>
            <div className="font-medium">{value.name}</div>
            <div className="text-gray-600">{value.address}</div>
          </div>
        </div>
      )}
      <Button
        type="button"
        variant={value ? "outline" : "primary"}
        className="w-full min-h-11"
        onClick={open}
        disabled={loading}
      >
        <MapPin className="h-4 w-4 mr-2" />
        {loading ? "Načítám mapu…" : value ? "Změnit výdejní místo" : buttonText}
      </Button>
    </div>
  );
}
