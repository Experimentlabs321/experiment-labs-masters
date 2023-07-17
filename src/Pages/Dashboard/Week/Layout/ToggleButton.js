import React, { createContext, useState } from "react";

export const ToggleButtonContext = createContext();

export const ToggleButtonProvider = ({ children }) => {
  const [toggleButton, setToggleButton] = useState(true);

  return (
    <ToggleButtonContext.Provider value={{ toggleButton, setToggleButton }}>
      {children}
    </ToggleButtonContext.Provider>
  );
};
