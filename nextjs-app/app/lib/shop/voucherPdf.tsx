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
import { BULLET_INDENT, CONTENT_HEIGHT, splitLongWord, voucherLayout } from "./voucherLayout";

const ASSETS = path.join(process.cwd(), "assets");

Font.register({
  family: "Satoshi",
  fonts: [
    { src: path.join(ASSETS, "fonts/Satoshi-Regular.ttf"), fontWeight: 400 },
    { src: path.join(ASSETS, "fonts/Satoshi-Bold.ttf"), fontWeight: 700 },
  ],
});
// Czech words are never hyphenated; only a very long word without spaces (e.g. in a dedication) is split.
Font.registerHyphenationCallback(splitLongWord);

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
  // The code row and the footer are pinned to the bottom of the panel; everything above them lives in
  // a fixed-height content box, so no amount of text can push the code or the date off the voucher.
  panel: {
    position: "absolute",
    top: 22,
    right: 22,
    bottom: 22,
    width: 330,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 24,
  },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  logo: { width: 46, height: 46 },
  label: { fontSize: 8, letterSpacing: 2, color: TEAL, fontWeight: 700 },
  content: { height: CONTENT_HEIGHT, overflow: "hidden" },
  // flexShrink 0: the fixed-height box must clip what does not fit, not squash rows into each other.
  title: { fontWeight: 700, color: TEAL, flexShrink: 0 },
  bulletRow: { flexDirection: "row", flexShrink: 0 },
  bulletDot: { width: BULLET_INDENT, color: TEAL },
  bulletText: { flex: 1 },
  dedication: { backgroundColor: AQUA_SOFT, borderRadius: 8, flexShrink: 0 },
  bottom: { position: "absolute", left: 24, right: 24, bottom: 41, flexDirection: "row", alignItems: "flex-end" },
  codeBox: { flexGrow: 1, flexShrink: 1 },
  validityBox: { width: 92, flexShrink: 0, alignItems: "flex-end" },
  codeLabel: { fontSize: 7.5, letterSpacing: 1.5, color: MUTED, marginBottom: 3 },
  code: { fontSize: 19, fontWeight: 700, letterSpacing: 2, color: TEAL },
  validity: { fontSize: 9, color: MUTED, textAlign: "right" },
  validityDate: { fontSize: 11, fontWeight: 700, color: "#1b2b2b", textAlign: "right" },
  footer: { position: "absolute", left: 24, right: 24, bottom: 22, fontSize: 7.5, color: MUTED },
});

export type VoucherPdfData = {
  code: string;
  title: string;
  includes?: string | null;
  dedication?: string | null;
  validUntil: string;
  backgroundUrl?: string | null;
};

function VoucherDocument(v: VoucherPdfData) {
  const { level: l, includes, dedication, dedicationMaxLines } = voucherLayout(v);

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
          <View style={s.header}>
            <Text style={s.label}>DÁRKOVÝ POUKAZ</Text>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={path.join(ASSETS, "voucher-logo.png")} style={s.logo} />
          </View>

          <View style={s.content}>
            <Text
              style={[s.title, { fontSize: l.title, lineHeight: l.titleLineHeight, marginBottom: l.titleGap }]}
            >
              {v.title}
            </Text>

            {includes.map((line, i) => (
              <View key={i} style={[s.bulletRow, { marginBottom: l.bulletGap }]}>
                <Text style={[s.bulletDot, { fontSize: l.bullet, lineHeight: l.bulletLineHeight }]}>•</Text>
                <Text style={[s.bulletText, { fontSize: l.bullet, lineHeight: l.bulletLineHeight }]}>{line}</Text>
              </View>
            ))}

            {dedication ? (
              <Text
                style={[
                  s.dedication,
                  {
                    marginTop: l.dedicationGap,
                    padding: l.dedicationPadding,
                    fontSize: l.dedication,
                    lineHeight: l.dedicationLineHeight,
                  },
                  dedicationMaxLines ? { maxLines: dedicationMaxLines, textOverflow: "ellipsis" } : {},
                ]}
              >
                „{dedication}“
              </Text>
            ) : null}
          </View>

          <View style={s.bottom}>
            <View style={s.codeBox}>
              <Text style={s.codeLabel}>KÓD POUKAZU</Text>
              <Text style={s.code}>{v.code}</Text>
            </View>
            <View style={s.validityBox}>
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
