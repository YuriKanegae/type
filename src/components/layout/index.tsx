import "./index.css";

import { Link }                   from "react-router-dom";
import type { PropsWithChildren } from "react";

import Home                       from "../../icons/home";
import Info                       from "../../icons/info";
import File                       from "../../icons/file";
import Brain                      from "../../icons/brain";

function Layout ( prop: PropsWithChildren ) {

    return (
        <div className="layout-container">
            <nav className="layout-nav-container">
                <Brain />
                <h4>MACACO ESCREVE</h4>

                <Link to="/">           <Home/>     </Link>
                <Link to="/files">      <File />    </Link>
                <Link to="/info">       <Info/>     </Link>
            </nav>
            
            { prop.children }
        </div>
    );
}

export default Layout;