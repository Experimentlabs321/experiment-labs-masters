import React from "react";

const DashboardPrimaryButton = ({
  children,
  bgColor,
  shadow,
  width,
  classes,
}) => {
  return (
    <button
      style={{ boxShadow: shadow }}
      className={`bg-[${bgColor}] w-${width} ${classes} py-[15px] px-[23px] rounded-[13px] text-[12px] lg:text-[18px] font-[700] z-[1]`}
    >
      {children}
    </button>
  );
};

export default DashboardPrimaryButton;
