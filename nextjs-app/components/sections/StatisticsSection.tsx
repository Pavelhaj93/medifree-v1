const StatisticHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="text-[40px] md:text-[64px] text-primary">{children}</h3>
  );
};

const StatisticText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-gray-600 text-sm md:text-lg max-w-[200px]">{children}</p>
  );
};

export function StatisticsSection() {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-10">
        <div className="bg-gray-200 rounded-2xl p-6 md:py-12 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-50">
            <div className="flex flex-col items-center text-center space-y-2 pb-8 md:py-0">
              <StatisticHeading>300+</StatisticHeading>
              <StatisticText>
                lidem jsme pomohli najít cestu ke zdravému životu.
              </StatisticText>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 pb-8 md:py-0 md:px-4">
              <StatisticHeading>95%</StatisticHeading>
              <StatisticText>
                klientů se cítí lépe již po 6 sezeních.
              </StatisticText>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 pb-8 md:py-0 md:px-4">
              <StatisticHeading>5+</StatisticHeading>
              <StatisticText>let zkušeností v oboru poradenství.</StatisticText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
