import "./index.css";

import { useEffect, useState } from "react";

function Footer() {

    const [ hasNetwork, setHastNetwork ] = useState(true);

    useEffect(() => {

        setHastNetwork(window.navigator.onLine);

        window.addEventListener('online',  () => setHastNetwork(true));
        window.addEventListener('offline', () => setHastNetwork(false));

        return () => {
            window.removeEventListener('online',  () => setHastNetwork(true));
            window.removeEventListener('offline', () => setHastNetwork(false));
        };
    }, []);

    return (
        <footer className="layout-footer-container">
            <p>Feito por: <a href="https://yurikanegae.com">Yuri Kanegae</a></p>

            <p title="Mas isso não faz diferença :)">{ hasNetwork ? "online" : "offline" }</p>
        </footer>
    );
}

export default Footer;