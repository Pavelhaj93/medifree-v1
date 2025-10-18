export default function MiddleSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 md:px-10">
        <div className="relative max-w-5xl mx-auto">
          {/* Background decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-100 rounded-full opacity-60"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-green-100 rounded-full opacity-80"></div>
          <div className="absolute top-1/2 -left-8 w-6 h-6 bg-blue-200 rounded-full opacity-40"></div>

          {/* Main quote box */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 lg:p-16">
            {/* Quote marks */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
            </div>

            {/* Quote text */}
            <blockquote className="text-xl md:text-3xl lg:text-4xl font-light text-gray-800 leading-relaxed text-center mb-6">
              &quot;Naše tělo je naším vlastním lékařem. To nejlepší, co můžeme
              udělat, je umožnit mu pustit se do práce.&quot;
            </blockquote>

            {/* Attribution */}
            {/* <div className="text-center">
              <div className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
                <span className="text-white font-medium text-sm tracking-wide">
                  HIPPOKRATES
                </span>
              </div>
            </div> */}

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-3xl pointer-events-none"></div>
          </div>

          {/* Additional floating elements */}
          <div className="absolute top-4 right-8 w-3 h-3 bg-blue-300 rounded-full opacity-60 animate-pulse"></div>
          <div
            className="absolute bottom-8 left-12 w-4 h-4 bg-green-300 rounded-full opacity-50 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
