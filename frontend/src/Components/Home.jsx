import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 pb-12 mt-12 md:gap-28 lg:py-16 xl:flex-row m-8">
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image
          src="/creativity.png"
          alt="creativity"
          width={50}
          height={50}
          className="hidden sm:inline absolute left-[-5px] top-[-30px] w-10 lg:w-[50px] z-2"
        />
        <h1 className="font-bold text-4xl lg:text-7xl mt-6">
          File an FIR Hassle-Free
        </h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
          Your well-being is our priority. Easily share incidents, provide vital
          details, and collaborate seamlessly with law enforcement, working
          together to create a safer and stronger community.
        </p>

        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src="/star.svg"
                  key={index}
                  alt="star"
                  width={24}
                  height={24}
                />
              ))}
          </div>

          <p className="font-bold text-sm lg:text-lg text-blue-700">
            200k
            <span className="font-normal text-sm lg:text-lg ml-1">
              Feedbacks of Rajasthan Police
            </span>
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <Link
            href={'#book'}
            className="border-2 border-green-500 text-green-500 px-6 py-2 rounded md:mx-0 mx-auto hover:bg-green-500 hover:text-white"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      <div className="relative flex flex-1 items-start">
        <div className="hidden xl:inline relative z-20 flex w-[650px] h-[650px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8">
          <Image
            src="/Questions-amico.png"
            alt="Decision Making"
            width={650}
            height={650} 
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
