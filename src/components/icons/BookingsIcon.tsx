import React from "react";

interface Props {
  active?: boolean;
}

const BookingsIcon: React.FC<Props> = ({ active }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background rectangle */}
      <rect
        x="0"
        y="0"
        width="20"
        height="20"
        rx="4"
        fill={
          active ? "url(#paint0_linear_bookings)" : "rgba(136, 143, 149, 0.6)"
        }
      />

      {/* Arrow piercing upward from bottom-right */}
      <path
        d="M14.5 15L14.5 9.8L9.3 15H8L14 9L14 15H14.5Z"
        fill={active ? "url(#paint1_linear_bookings)" : "#FFFFFF"}
      />

      <defs>
        {/* bluish background gradient */}
        <linearGradient
          id="paint0_linear_bookings"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9BE7FF" />
          <stop offset="1" stopColor="#007AFF" />
        </linearGradient>

        {/* yellow arrow gradient */}
        <linearGradient
          id="paint1_linear_bookings"
          x1="8"
          y1="9"
          x2="15"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEA00" />
          <stop offset="1" stopColor="#FFC700" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BookingsIcon;
