import { createContext, useEffect, useState, type PropsWithChildren } from "react";

// #region types and definitions
type DBValuesType = {
    database:       IDBDatabase | null;
    isConnecting:   boolean;
};

const DATABASE_NAME     = "texts";
const DATABASE_VERSION  = 1;

// #endregion

// #region context
const defaultValues: DBValuesType = {
    database:       null,
    isConnecting:   true,
};
export const dbContext = createContext(defaultValues);
// #endregion

// #region provider
export function DBProvider( props: PropsWithChildren ) {
    const [ database, setDatabase ]         = useState<IDBDatabase | null>(null);
    const [ isConnecting, setIsConnecting ] = useState(true);

    useEffect(() => {
        function initDb() {
            const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

            request.onupgradeneeded = () => {
                const result = request.result;
                
                if(!result.objectStoreNames.contains("sample"))
                    result.createObjectStore("sample", { autoIncrement: true, keyPath: "id" });
            };

            request.onsuccess = () => {
                setDatabase(request.result);
                setIsConnecting(false);
            };

            request.onerror = () => {
                console.error("cannot connect to database", request.error);
                setIsConnecting(false);
            };
        }

        if(!database) initDb();
    }, []);

    const values = { database, isConnecting};

    return <dbContext.Provider value={values}>{ props.children }</dbContext.Provider>;
}
// #endregion