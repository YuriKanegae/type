import { useEffect, useState }  from "react";

import Status                   from "./status";
import type { ISample }         from "../../models/Sample";

type TypeContainerProps = { sample: ISample };
function TypeContainer( prop: TypeContainerProps ) {

    const allowedPrefix = [ "Key", "Space", "Digit", "Numpad", "Backspace", "Period", "Comma", "Quote", "Semicolon", "Backquote", "Minus" ];

    const [ targetText, setTargetText ] = useState<string>();
    const [ typedText, setTypedText ]   = useState<string>("");
  
    // attach keyboard handlers
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {

            console.log(event.code)
            // see if key is allowed
            const matchedPrefix = allowedPrefix.some( prefix => event.code.startsWith(prefix));
            if(!matchedPrefix)
                return;
            
            // prevent default event
            event.preventDefault();

            // treat cases
            if(event.key === "Backspace") setTypedText( current => current.slice(0, -1));
            else                          setTypedText( current => `${current}${event.key}`);
        }

        document.addEventListener("keydown", handleKeyDown, false);

        return () => document.removeEventListener("keydown", handleKeyDown, false);
    }, []);

    // define target text
    useEffect(() => {
        if(targetText || !prop.sample) return;

        // cal init and final word
        const wordCount   = Math.ceil(Math.random() * 10);
        const initWord    = Math.ceil(Math.random() * prop.sample.wordCount);
        const finalWord   = Math.min( initWord + wordCount, prop.sample.wordCount - 1);

        // create targetText
        const sampleWords = prop.sample.content.split(" ");
        const targetWords = sampleWords.slice(initWord, finalWord);
        const normalized  = targetWords.join(" ").normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\n/g, '');
        
        setTargetText( normalized );
    }, [ prop.sample, targetText ]);

    return (
        <>
            <Status targetText={targetText} currentText={typedText}/>
            <div>{typedText}</div>
        </>
    )
}

export default TypeContainer;