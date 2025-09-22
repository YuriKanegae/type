import "./index.css";

import { useEffect, useState }  from "react";

import File                     from "../../icons/file";
import Trash                    from "../../icons/trash";
import Pencil                   from "../../icons/pencil";
import { useDb }                from "../../hooks/useDb";
import type { ISample }         from "../../models/Sample";

function Files() {

    const db = useDb();

    const [ loading, setLoading ] = useState(false);
    const [ samples, setSamples ] = useState<ISample[]>();

    useEffect(() => {
        if(db.isConnecting || samples) return;

        setLoading(true);
        db.listAll<ISample>("sample")
            .then( result => setSamples(result) )
            .catch( error => alert(error ))
            .finally( () => setLoading(false) );

    }, [ db, samples ]);

    return (
        <section>
            <div className="page-header">
                <File width="48" height="48"/>
                <h1>ARQUIVOS</h1>
            </div>

            <table style={{ width: "100%"}}>
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>ID</th>
                        <th style={{ width: "20%" }}>NOME</th>
                        <th style={{ width: "60%" }}>CONTEÚDO</th>
                        <th style={{ width: "10%" }}>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    { samples?.map( sample => 
                        <tr key={sample.id}>
                            <td> { sample.id } </td>
                            <td> { sample.name } </td>
                            <td> { sample.content.substring(0, 100) }... </td>
                            <td>
                                <Trash />
                                <Pencil />
                            </td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </section>
    );
}

export default Files;