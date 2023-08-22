import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();    
    const Logout = () => {
        navigate.to("/login");
    }
    return (<>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#333333" , height : "7vh" }}>
            <div className="container-fluid">
                <a className="navbar-brand " href="/login" style={{ color: "#333333", fontSize: "3vh", fontWeight: "bolder", marginRight: "12vh", marginLeft : "5vh" }}> 
                <img className="img-responsive" src="http://localhost:3000/Logo.png" alt="Logo_Food_Order _Website" width="200" height="100"/>
                 </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav" >
                        <li className="nav-item">
                            <button className="nav-link active" aria-current="page" style={{ color: "#FFFFFF", fontSize: "2.5vh", marginRight: "5vh" }}>Home</button>
                        </li>
                    </ul>
                </div>
            {
                sessionStorage.getItem("isLoggedin") === 'true' ?
            <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "2vh" }}>
                            <button type="button" className="btn btn-danger" onClick={Logout}>Logout</button>
                        </div>
                        :<div></div>
            }
            </div>
        </nav>
    </>);
}

export default Header;