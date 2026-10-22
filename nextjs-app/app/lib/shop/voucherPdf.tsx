import "server-only";

import path from "path";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { formatCzechDate } from "./vouchers";

const ASSETS = path.join(process.cwd(), "assets");

Font.register({
  family: "Satoshi",
  fonts: [
    { src: path.join(ASSETS, "fonts/Satoshi-Regular.ttf"), fontWeight: 400 },
    { src: path.join(ASSETS, "fonts/Satoshi-Bold.ttf"), fontWeight: 700 },
  ],
});
// Czech words must never be split with a hyphen on the voucher.
Font.registerHyphenationCallback((word) => [word]);

const TEAL = "#034c4c";
const AQUA = "#b4e8ed";
const AQUA_SOFT = "#e3f5f7";
const MUTED = "#5e7373";

// A5 landscape in points
const PAGE: [number, number] = [595.28, 419.53];

const s = StyleSheet.create({
  page: { fontFamily: "Satoshi", color: "#1b2b2b", backgroundColor: "#ffffff" },
  bg: { position: "absolute", top: 0, left: 0, width: PAGE[0], height: PAGE[1], objectFit: "cover" },
  band: { position: "absolute", top: 0, left: 0, bottom: 0, width: 220, backgroundColor: TEAL, overflow: "hidden" },
  circle: { position: "absolute", borderRadius: 999, backgroundColor: AQUA, opacity: 0.18 },
  bandTitle: { position: "absolute", left: 28, bottom: 34, color: "#ffffff", fontSize: 30, fontWeight: 700, lineHeight: 1.05 },
  panel: {
    position: "absolute",
    top: 22,
    right: 22,
    bottom: 22,
    width: 330,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 24,
    display: "flex",
    flexDirection: "column",
  },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  logo: { width: 46, height: 46 },
  label: { fontSize: 8, letterSpacing: 2, color: TEAL, fontWeight: 700 },
  title: { fontSize: 15, fontWeight: 700, color: TEAL, lineHeight: 1.25, marginBottom: 8 },
  bulletRow: { flexDirection: "row", marginBottom: 2.5 },
  bulletDot: { width: 10, fontSize: 9, color: TEAL },
  bulletText: { flex: 1, fontSize: 8.5, lineHeight: 1.35 },
  dedication: { marginTop: 10, backgroundColor: AQUA_SOFT, borderRadius: 8, padding: 8, fontSize: 9.5, lineHeight: 1.35 },
  bottom: { marginTop: "auto", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingTop: 10 },
  codeLabel: { fontSize: 7.5, letterSpacing: 1.5, color: MUTED, marginBottom: 3 },
  code: { fontSize: 19, fontWeight: 700, letterSpacing: 2, color: TEAL },
  validity: { fontSize: 9, color: MUTED, textAlign: "right" },
  validityDate: { fontSize: 11, fontWeight: 700, color: "#1b2b2b", textAlign: "right" },
  footer: { marginTop: 10, fontSize: 7.5, color: MUTED },
});

// Long contents plus a long dedication (Stripe allows 255 chars) would push the code row off the panel.
const dense = StyleSheet.create({
  header: { marginBottom: 6 },
  title: { fontSize: 13.5, marginBottom: 6 },
  bulletRow: { marginBottom: 1.5 },
  bulletText: { fontSize: 7.5, lineHeight: 1.3 },
  dedication: { marginTop: 7, padding: 6, fontSize: 8.5, lineHeight: 1.3 },
});
const DENSE_FROM_CHARS = 380;

export type VoucherPdfData = {
  code: string;
  title: string;
  includes?: string | null;
  dedication?: string | null;
  validUntil: string;
  backgroundUrl?: string | null;
};

function VoucherDocument(v: VoucherPdfData) {
  const includes = (v.includes ?? "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•+*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 9);
  const isDense = includes.join("").length + (v.dedication?.length ?? 0) > DENSE_FROM_CHARS;
  const d = (key: keyof typeof dense) => (isDense ? [s[key], dense[key]] : s[key]);

  return (
    <Document title={`Dárkový poukaz ${v.code}`} author="Medifree">
      <Page size={PAGE} style={s.page}>
        {v.backgroundUrl ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image src={`${v.backgroundUrl}?w=1754&fm=jpg&q=80`} style={s.bg} />
        ) : (
          <View style={s.band}>
            <View style={[s.circle, { width: 260, height: 260, top: -90, left: -110 }]} />
            <View style={[s.circle, { width: 180, height: 180, top: 150, left: 110 }]} />
            <Text style={s.bandTitle}>{"Dárkový\npoukaz"}</Text>
          </View>
        )}

        <View style={s.panel}>
          <View style={d("header")}>
            <Text style={s.label}>DÁRKOVÝ POUKAZ</Text>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={path.join(ASSETS, "voucher-logo.png")} style={s.logo} />
          </View>

          <Text style={d("title")}>{v.title}</Text>

          {includes.map((line, i) => (
            <View key={i} style={d("bulletRow")}>
              <Text style={s.bulletDot}>•</Text>
              <Text style={d("bulletText")}>{line}</Text>
            </View>
          ))}

          {v.dedication ? <Text style={d("dedication")}>„{v.dedication}“</Text> : null}

          <View style={s.bottom}>
            <View>
              <Text style={s.codeLabel}>KÓD POUKAZU</Text>
              <Text style={s.code}>{v.code}</Text>
            </View>
            <View>
              <Text style={s.validity}>Platný do</Text>
              <Text style={s.validityDate}>{formatCzechDate(v.validUntil)}</Text>
            </View>
          </View>

          <Text style={s.footer}>Poukaz je jednorázový. www.medifree.cz · info@medifree.cz</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function renderVoucherPdf(data: VoucherPdfData): Promise<Buffer> {
  return renderToBuffer(<VoucherDocument {...data} />);
}
