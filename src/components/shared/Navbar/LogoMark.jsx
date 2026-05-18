function LogoMark() {
  return (
    <div className="flex items-center gap-1.5">
      {/* SVG icon glyph */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="10" fill="#5A7863" opacity="0.9" />
        <path
          d="M7 11.5C7 9.015 8.79 7 11 7s4 2.015 4 4.5S13.21 16 11 16"
          stroke="#EBF4DD"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="11" cy="11.5" r="1.5" fill="#EBF4DD" />
      </svg>

      <span className="font-serif text-[19px] font-normal text-[#EBF4DD] tracking-[-0.01em]">
        Sport
        <span className="text-[#90AB8B] italic">Nest</span>
      </span>
    </div>
  );
}

export default LogoMark;
