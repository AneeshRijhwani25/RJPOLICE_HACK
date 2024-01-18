import { FEATURES } from "@/utils/constant";
import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <section className="flex-col flex-center overflow-hidden bg-feature-bg bg-center bg-no-repeat pb-8 pt-12 m-8">
      <div className="max-container padding-container relative w-full flex justify-end">
        <div className="hidden lg:inline-block flex-1 lg:min-h-[900px]">
          <Image
            src="/Questions-pana.png"
            alt="phone"
            width={620}
            height={1000}
            className="feature-phone"
          />
        </div>

        <div className="z-20 flex w-full flex-col lg:w-[60%]">
          <div className="relative">
            <Image
              src="/creativity.png"
              alt="camp"
              width={50}
              height={50}
              className="absolute left-[-5px] top-[-28px] w-10 lg:w-[50px] "
            />
            <h2 className="font-bold text-4xl lg:text-6xl">How it works?</h2>
          </div>
          <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-2 lg:gap-20">
            {FEATURES.map((feature) => (
              <FeatureItem
                key={feature.title}
                title={feature.title}
                icon={feature.icon}
                description={feature.description}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ title, icon, description }) => {
  return (
    <li className="flex w-full flex-1 flex-col items-start">
      <div className="rounded-full p-4 lg:p-7 bg-green-50">
        <Image src={icon} alt="map" width={28} height={28} />
      </div>
      <h2 className="font-bold text-base lg:text-2xl mt-5 capitalize">
        {title}
      </h2>
      <p className="text-base mt-5 bg-white/80 text-gray-30 lg:mt-[30px] lg:bg-none">
        {description}
      </p>
    </li>
  );
};

export default Features;
