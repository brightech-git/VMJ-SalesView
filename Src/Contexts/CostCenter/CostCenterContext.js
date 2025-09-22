// src/Contexts/CostCentreContext.js
import React, { createContext, useEffect, useState } from "react";
import { Api_Base_url } from "../../Config/Config";

export const CostCentreContext = createContext();

export const CostCentreProvider = ({ children }) => {
  const [costCentres, setCostCentres] = useState([]);

  useEffect(() => {
    fetch(`${Api_Base_url}costCentres`)
      .then((res) => res.json())
      .then(setCostCentres)
      .catch((err) => console.error("Cost Centre fetch failed", err));
  }, []);

  const getCostName = (id) => {
    const match = costCentres.find((c) => c.COSTID === id);
    return match?.COSTNAME || id;
  };

  return (
    <CostCentreContext.Provider value={{ costCentres, getCostName }}>
      {children}
    </CostCentreContext.Provider>
  );
};
