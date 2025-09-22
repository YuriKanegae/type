import { createContext, useEffect, useState, type PropsWithChildren } from "react";

import divinaComediaSample from "./assets/divinaComedia";
// #region types and definitions
type DBValuesType = {
    database:       IDBDatabase | null;
    isConnecting:   boolean;

    listAll:        <T>(store: string) => Promise<T[]>;
};

const DATABASE_NAME     = "texts";
const DATABASE_VERSION  = 1;

// #endregion

// #region context
const defaultValues: DBValuesType = {
    database:       null,
    isConnecting:   true,

    listAll:        () => Promise.resolve([]),
};
export const dbContext = createContext(defaultValues);
// #endregion

// #region provider
export function DBProvider( props: PropsWithChildren ) {
    const [ database, setDatabase ]         = useState<IDBDatabase | null>(null);
    const [ isConnecting, setIsConnecting ] = useState(true);

    function handleListAll<T>( store: string ): Promise<T[]> {
        if(!database) throw new Error("cannot query database");

        const transaction = database.transaction([store]);
        const objectStore = transaction.objectStore(store);
        const request     = objectStore.getAll();

        return new Promise<T[]>( ( resolve, reject ) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror   = () => reject(request.error);
        });
    }

    useEffect(() => {
        function initDb() {
            const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

            request.onupgradeneeded = () => {
                const result = request.result;

                debugger;
                
                if(!result.objectStoreNames.contains("sample")) {
                    const sampleStore = result.createObjectStore("sample", { autoIncrement: true });
                    sampleStore.createIndex("name", "name", { unique: false });
                    sampleStore.transaction.oncomplete = () => {
                        result.transaction("sample", "readwrite")
                            .objectStore("sample")
                            .add(divinaComediaSample);
                    }
                }
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

    const values = { database, isConnecting, listAll: handleListAll};

    return <dbContext.Provider value={values}>{ props.children }</dbContext.Provider>;
}
// #endregion