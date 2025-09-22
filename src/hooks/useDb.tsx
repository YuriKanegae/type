import { useContext } from "react";

import { dbContext }  from "../context/dbContext";

export const useDb = () => useContext(dbContext);