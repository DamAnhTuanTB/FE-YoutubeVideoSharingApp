import { ReactNode, createContext, useState } from "react";
import { InfoUser } from "../types";
import { getCookie } from "../utils/cookies";

const AppContext = createContext<{
  openShare: boolean;
  setOpenShare: React.Dispatch<React.SetStateAction<boolean>>;
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  user: InfoUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<InfoUser | undefined>>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [openShare, setOpenShare] = useState(false);
  const [login, setLogin] = useState(!!getCookie("token"));
  const [user, setUser] = useState<InfoUser | undefined>();

  return (
    <AppContext.Provider
      value={{ openShare, setOpenShare, login, setLogin, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
