import Image from "next/image";
import { Badge } from "../ui/Badge";
import { BookButton } from "../others/BookButton";

export default function HeroSection() {
  return (
    <section className="text-center md:text-left bg-gray-50 relative h-[700px] flex items-center justify-center text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="border-t-8 border-secondary" />
        <div className="border-t-8 border-primary w-2/5" />
        {/* Background image */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/images/homepage/hero_hp.png"
            alt="Background"
            fill
            className="object-cover z-0"
            priority
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative grid grid-cols-2 items-center  text-left px-4 md:px-10">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4 inline-block">
              Medifree
            </Badge>
            <h1 className="text-5xl md:text-6xl leading-tight mb-8">
              Váš prostor pro zdraví a rovnováhu
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Nabízíme celostní terapeutické přístupy, které vás podpoří na
              cestě k plnohodnotnému životu.
            </p>
            <BookButton />
          </div>
        </div>
      </div>
    </section>
  );
}

// export default function HeroSection() {
//   return (
//     <section className="flex-1 text-center md:text-left bg-gray-50">
//       <div className="container mx-auto">
//         <div className="border-t-8 border-secondary" />
//         <div className="border-t-8 border-primary w-2/5" />
//         <div className="grid md:grid-cols-2 py-16 md:py-32 gap-12 items-center px-4 md:px-10">
//           <div className="space-y-4">
//             <Badge variant="primary">Medifree</Badge>
//             <h1 className="text-5xl md:text-7xl leading-tight">
//               Moderní přístup ke zdraví
//             </h1>
//             <p className="text-gray-600 max-w-md mb-8">
//               Naše terapeutické přístupy kombinují psychologii, fyzioterapii a
//               výživu. Pomáháme lidem najít cestu k sobě a zlepšit kvalitu jejich
//               života.
//             </p>
//             <BookButton />
//           </div>
//           <div className="relative">
//             <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
//               <Image
//                 src="/images/homepage/hero_hp.png"
//                 alt="Therapy session"
//                 fill
//                 className="object-cover"
//                 priority
//               />
//               {/* <div className="absolute inset-0 flex flex-col justify-between p-8">
//                   <div className="self-end">
//                     <span className="bg-white/80 px-4 py-2 rounded-full text-sm">
//                       Convenient
//                     </span>
//                   </div>
//                   <div className="self-start">
//                     <span className="bg-white/80 px-4 py-2 rounded-full text-sm">
//                       Caring
//                     </span>
//                   </div>
//                   <div className="self-center">
//                     <span className="bg-white/80 px-4 py-2 rounded-full text-sm">
//                       Confidential
//                     </span>
//                   </div>
//                 </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
