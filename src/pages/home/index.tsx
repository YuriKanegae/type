import "./index.css";

import { useEffect, useState }  from "react";

import TypeContainer            from "../../components/type";
import { useDb }                from "../../hooks/useDb";
import type { ISample }         from "../../models/Sample";

function Home() { 

    const db = useDb();

    const [ sample, setSample ] = useState<ISample | null>(null);

    useEffect(() => {
        async function getRandomSample() {

            const quantity = await db.count("sample");
            const randomID = Math.ceil(Math.random() * quantity);
            const sample   = await db.get<ISample>("sample", randomID);

            setSample(sample);
        }
        
        if(!db.isConnecting && !sample)
            getRandomSample();
    }, [ db ]);

    return (
        <section>
            <div className="header">
                <p>Dizem que, com tempo infinito, um macaco consegue digitar {sample?.name?.toUpperCase()} inteiro(a).</p>

                <h1>MAS VOCÊ CONSEGUE?</h1>
            </div>

            { sample && <TypeContainer sample={sample}/> }
        </section>
    );
}

export default Home;