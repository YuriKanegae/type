import "./index.css";

import type { PropsWithChildren } from "react";

import NavBar                     from "./navBar";
import Footer                     from "./footer";

function Layout ( prop: PropsWithChildren ) {

    return (
        <div className="layout-container">
            <NavBar />
            
            <div className="layout-content-container">{ prop.children }</div>

            <Footer />
        </div>
    );
}

export default Layout;