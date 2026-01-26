import { createContext } from "react";
import type { Course } from "./model";

type MainContextType = {
  courses: Course[][];
};

export const MainContext = createContext<undefined>(undefined);

const MainDataContextProvider = () => {
  return <div>MainDataContextProvider</div>;
};

export default MainDataContextProvider;
