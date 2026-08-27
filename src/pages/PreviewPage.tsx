"use client";

import { useParams } from "react-router-dom";

export default function PreviewPage() {
  const { id } = useParams();

  return (
    <section className="flex flex-1 flex-col items-center justify-start bg-gradient-to-b from-moz-white to-white px-4 py-10 sm:py-16">
      <h1 className="mb-8 text-center font-poppins text-3xl font-bold tracking-tight text-moz-black sm:mb-12 sm:text-4xl">
        Certificate Preview
      </h1>

      {/* Certificate Mockup Container */}
      <div className="relative mb-10 flex w-full max-w-4xl flex-col items-center bg-white px-6 py-12 shadow-xl sm:px-16 sm:py-20 text-center border-x border-gray-50">
        {/* Top/Bottom Gradient Borders */}
        <div className="absolute left-0 top-0 h-2 sm:h-3 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500"></div>
        <div className="absolute bottom-0 left-0 h-2 sm:h-3 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500"></div>

        {/* Logo */}
        <img
          src="https://www.sliitmozilla.org/assets/Mozilla-logo.png"
          alt="Mozilla logo"
          className="mb-8 h-8 sm:h-10 w-auto object-contain"
        />

        {/* Certificate Text */}
        <h2 className="mb-4 font-poppins text-lg sm:text-2xl tracking-widest text-moz-black uppercase">
          Certificate of Participation
        </h2>
        <p className="mb-10 text-xs sm:text-sm font-medium text-moz-gray-mid">
          We are proudly presenting this to
        </p>

        {/* Name */}
        <h3 className="mb-8 font-poppins text-3xl sm:text-5xl font-normal text-moz-black">
          Gayathri Krishnaram
        </h3>

        {/* Description */}
        <p className="mb-16 text-xs sm:text-sm text-moz-gray-mid max-w-2xl font-medium">
          This is to certify that Gayathri Krishnaram has participated HolaMozilla 2025 event.
        </p>

        {/* Signatures & Seal */}
        <div className="flex w-full items-end justify-between px-2 sm:px-8 mt-4">
          {/* Signature 1 */}
          <div className="flex flex-col items-center">
            <div className="h-10 mb-2 flex items-end justify-center">
              <span className="italic font-serif text-2xl opacity-80" style={{ fontFamily: "cursive" }}>Sadeesha</span>
            </div>
            <div className="h-px w-24 sm:w-32 bg-moz-black mb-1.5"></div>
            <p className="text-[10px] sm:text-xs text-moz-black font-semibold">Sadeesha Perera</p>
            <p className="text-[10px] sm:text-[11px] text-moz-gray-mid mt-0.5">President</p>
          </div>

          {/* Seal / Date */}
          <div className="flex flex-col items-center">
            <div className="mb-6 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-amber-500 shadow-md"></div>
            <p className="text-[10px] sm:text-xs text-moz-black font-bold tracking-wide">2025-10-01</p>
          </div>

          {/* Signature 2 */}
          <div className="flex flex-col items-center">
            <div className="h-10 mb-2 flex items-end justify-center">
              <span className="italic font-serif text-2xl opacity-80" style={{ fontFamily: "cursive" }}>Asath</span>
            </div>
            <div className="h-px w-24 sm:w-32 bg-moz-black mb-1.5"></div>
            <p className="text-[10px] sm:text-xs text-moz-black font-semibold">Asath Mohomad</p>
            <p className="text-[10px] sm:text-[11px] text-moz-gray-mid mt-0.5">Secretary</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        type="button"
        className="cursor-pointer rounded-none bg-moz-orange px-10 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-moz-orange-dark hover:shadow-lg active:scale-95 sm:px-16 sm:py-4 sm:text-base"
      >
        Download as PDF
      </button>
    </section>
  );
}
