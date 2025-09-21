import "./index.css";

import { Link } from "react-router-dom";

import Home     from "../../icons/home";
import Info     from "../../icons/info";
import File     from "../../icons/file";
import Brain    from "../../icons/brain";

function NavBar() {
    return (
        <nav className="layout-nav-container">
            <Brain />
            <h4>MACACO ESCREVE</h4>

            <Link to="/">           <Home/>     </Link>
            <Link to="/files">      <File />    </Link>
            <Link to="/info">       <Info/>     </Link>
        </nav>
    );
}

export default NavBar;