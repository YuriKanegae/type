import "./index.css";

import { useEffect, useRef, useState } from "react";

type StatusProps = { targetText?: string, currentText?: string };
function Status(props: StatusProps) {

    const timerId = useRef(0);

    const [ time, setTime ]                 = useState(0);
    const [ wordQuantity, setWordQuantity ] = useState(0);
    const [ correctWords, setCorrectWords ] = useState(0);

    useEffect(() => {
        if(!props.targetText) return;

        setWordQuantity(props.targetText.split(" ").length);
    }, [ props.targetText ]);

    useEffect(() => {
        if(!props.targetText || !props.currentText || props.currentText == "") return;

        // calculate correct words
        const currentWords    = props.currentText.split(" ");
        const targetTextWords = props.targetText.split(" ");
        const minimalWords    = Math.min(currentWords.length, targetTextWords.length);

        let matched = 0;
        for( let i = 0; i < minimalWords; i++) {
            console.log(encodeURI(currentWords[i]) , encodeURI(targetTextWords[i]))
            if(currentWords[i] == targetTextWords[i])
                matched++;
        }

        setCorrectWords(matched);

        // win condition
        console.log(matched, targetTextWords.length)
        if(matched === targetTextWords.length)
            clearInterval(timerId.current);

        // create timer
        if(timerId.current != 0) return;
        timerId.current = setInterval( () => { setTime( current => current + 1) }, 1000 );
    }, [ props.currentText ]);


    return (
        <table style={{ width: "100%"}}>
            <thead>
                <tr>
                    <th style={{ width: "25%"}}>Quantidade de palavras</th>
                    <th style={{ width: "25%"}}>Palavras corretas</th>
                    <th style={{ width: "25%"}}>Distância da palavra atual</th>
                    <th style={{ width: "25%"}}>Tempo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{ wordQuantity }</td>
                    <td>{ correctWords }</td>
                    <td>{ wordQuantity }</td>
                    <td>{ time }</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Status;