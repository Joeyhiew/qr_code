import React, { useState } from "react";

export const AppStateContext = React.createContext();

export const AppStateProvider = (props) => {
  const [needStorageRefresh, setNeedStorageRefresh] = useState(true);

  const contextValue = { needStorageRefresh, setNeedStorageRefresh };

  return (
    <AppStateContext.Provider value={contextValue}>
      {props.children}
    </AppStateContext.Provider>
  );
};
