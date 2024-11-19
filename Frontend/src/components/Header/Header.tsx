import logo from "../../assets/logo.png";
import NavBar from "./NavBar";

function Header() {
    return(
        <header style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={logo} alt="Logo de The Good Corner"></img>
            <NavBar/>
        </header>
    )
}

export default Header;