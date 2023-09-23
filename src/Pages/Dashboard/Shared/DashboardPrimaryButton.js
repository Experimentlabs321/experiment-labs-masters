import React from "react";

const DashboardPrimaryButton = ({
  onClick,
  children,
  bgColor,
  shadow,
  width,
  classes,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ boxShadow: shadow, backgroundColor: bgColor }}
      className={`bg-[${bgColor}] w-${width} ${classes} py-[15px] px-[23px] rounded-[13px] text-[12px] lg:text-[18px] font-[700] z-[1]`}
    >
      {children}
    </button>
  );
};

export default DashboardPrimaryButton;
