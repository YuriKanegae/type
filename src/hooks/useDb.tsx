import { useContext } from "react";

import { dbContext }  from "../context/dbContext";

const useDb = useContext(dbContext);
export default useDb;