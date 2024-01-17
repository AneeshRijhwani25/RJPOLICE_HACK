import React from "react";
// import "./App.css";
import Image from "next/image";
export default function Providefeedback() {
  return (
    <body>
      <nav className="bg-white text-center py-5 flex flex-wrap justify-center gap-4 sticky top-0">
        <div>
          <Image src={"/logo.png"} width={50} height={50} alt="not found" />
        </div>
        <div>
          <h1 className="text-green-500 text-5xl text">Rajasthan Police</h1>
          <p className="text-xl font-semibold  mt-3">Feedback System</p>
        </div>
      </nav>
      <main className="mt-10 py-3">
        <h1 className="text-4xl text-center text-white font-semibold">
          Citizens Feedback
        </h1>
      </main>

      <main className="mx-10 mt-20">
        <div className="flex flex-wrap justify-center gap-8">
          <div>
            <div className="bg-black">
              <Image
                src={"/logo.png"}
                alt="not found"
                width={100}
                height={100}
              ></Image>
            </div>
            <button className="relative w-64 h-40 p-4 border-2 border-green-500 bg-white text-green-500 hover:text-white hover:bg-green-500 font-semibold text-xl rounded-lg hover:transform hover:-translate-y-5 transition-transform">
              <span className="relative z-10">Feedback of FIR</span>
            </button>
          </div>

          <button
            // onClick={() => {
            //   //   window.location.href = "/Feedback";
            // }}
            className="w-64 h-40 p-4 bg-white text-green-500 border-2 border-green-500  font-semibold text-xl  rounded-lg hover:transform hover:-translate-y-5 hover:text-white hover:bg-green-500 transition-transform"
          >
            Suggestions
          </button>
        </div>
      </main>
    </body>
  );
}
