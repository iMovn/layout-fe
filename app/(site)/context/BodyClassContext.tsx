"use client";

import React, { createContext, useContext, useState } from "react";

type BodyClassInfo = {
  type?: string;
  id?: string;
};

type BodyClassContextType = {
  type?: string;
  id?: string;
  setBodyClassInfo: (info: BodyClassInfo) => void;
};

const BodyClassContext = createContext<BodyClassContextType | undefined>(
  undefined
);

export const BodyClassProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [type, setType] = useState<string | undefined>();
  const [id, setId] = useState<string | undefined>();

  const setBodyClassInfo = (info: BodyClassInfo) => {
    setType(info.type);
    setId(info.id);
  };

  return (
    <BodyClassContext.Provider value={{ type, id, setBodyClassInfo }}>
      {children}
    </BodyClassContext.Provider>
  );
};

// Hook để sử dụng
export const useBodyClass = () => {
  const context = useContext(BodyClassContext);
  if (!context) {
    throw new Error("useBodyClass must be used within a BodyClassProvider");
  }
  return context;
};
