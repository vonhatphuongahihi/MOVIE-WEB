import React, { createContext, useMemo, useState } from "react";

export const SidebarContext = createContext();

function DrawerContext({ children }) {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const toggleDrawer = () => setMobileDrawer(!mobileDrawer);
  const value = useMemo(() => ({ mobileDrawer, toggleDrawer }), [mobileDrawer]);
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export default DrawerContext;
