import { useState } from "react";
import Footer from "../Styling/Footer";
import Header from "../Styling/Header";
import "./Dashboard.css"
import "./VegToggleButton.css"
import { useNavigate } from "react-router-dom";


function Restaurants() {
    const [isVegMenu, setIsVegMenu] = useState(false);

    const toggleMenu = () => {
        setIsVegMenu(!isVegMenu);
    };

    const navigate = useNavigate();
    const buttonClasses = isVegMenu ? 'btn veg-menu' : 'btn all-menu';
    return ( 
        <>  

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="body" style={{ minHeight: "100vh" }}>
                <div className="container mt-4">
                    <div className="row d-flex justify-content-center">
                    <div className="col-md-1">
                        </div>
                        <div className="col-md-9">
                            <div className="card p-4 mt-3">
                                <h3 className="heading mt-5 text-center">Search for your Restaurant ...</h3>
                                <div className="d-flex justify-content-center px-5"> <div className="search">
                                    <input type="text" className="search-input" placeholder="Search..." name="" />
                                    <a href="#" className="search-icon"> <i className="fa fa-search"></i> </a>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 p-4 mt-3">
                        <div class="collapse collapse-horizontal" id="collapseWidthExample">
                            <div class="list-group" style={{width: "300px"}}>
                            <h4>-  Filters</h4>
                            <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                                <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Location</h5>
                                <small></small>
                                </div>
                                <p class="mb-1"></p>
                                <small></small>
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Rating</h5>
                                <small class="text-body-secondary"></small>
                                </div>
                                <p class="mb-1"></p>
                                <small class="text-body-secondary"></small>
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Price Range</h5>
                                <small class="text-body-secondary"></small>
                                </div>
                                <p class="mb-1"></p>
                                <small class="text-body-secondary"></small>
                            </a>
                            </div>
                         </div> 
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-9">
                            <div className="card mt-3">
                                <div class=" d-flex flex-row-reverse">
                                    <div className="p-2">
                                        <button type="button" className="btn btn-primary position-relative" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                                            Filter
                                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                2
                                                <span class="visually-hidden">unread messages</span>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="p-2">
                                        <button className={buttonClasses} onClick={toggleMenu}>Pure Veg</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container mt-4">
                    <h2 style={{ textAlign: "center" }}>RESTAURANTS</h2>
                </div>
                <hr />

                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                        </div>
                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{ backgroundColor: "#eee", boxShadow: "1px 2px 9px #F4AAB9" }}>
                            <div className="d-flex flex-direction-row">
                                <div class="card" style={{ width: "18rem" }} onClick={()=>{navigate.to("/menu")}}>
                                    <img src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg" className="card-img-top" alt="..."  />
                                    <div class="card-body">
                                        <h5 class="card-title">Restaurant Name</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                    <div class="card-body">
                                        <a href="#" class="card-link">Click to proceed</a>
                                    </div>
                                </div>
                                <div class="card" style={{ width: "18rem" }} onClick={()=>{navigate.to("/menu")}}>
                                    <img src="http://127.0.0.1:3000/assets/Dishes/ramen.jpg" class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">Restaurant Name</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                    <div class="card-body">
                                        <a href="#" class="card-link">Click to proceed</a>
                                    </div>
                                </div>
                                <div class="card" style={{ width: "18rem" }} onClick={()=>{navigate.to("/menu")}}>
                                    <img src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg" class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">Restaurant Name</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                    <div class="card-body">
                                        <a href="#" class="card-link">Click to proceed</a>
                                    </div>
                                </div>
                                <div class="card" style={{ width: "18rem" }} onClick={()=>{navigate.to("/menu")}}>
                                    <img src="http://127.0.0.1:3000/assets/Dishes/ramen.jpg" class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">Restaurant Name</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                    <div class="card-body">
                                        <a href="#" class="card-link">Click to proceed</a>
                                    </div>
                                </div>
                                <div class="card" style={{ width: "18rem" }} onClick={()=>{navigate.to("/menu")}}>
                                    <img src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg" class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">Restaurant Name</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                    <div class="card-body">
                                        <a href="#" class="card-link">Click to proceed</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 ">

                        </div>
                    </div>
                </div>


            </div>

        </>
     );
}

export default Restaurants;