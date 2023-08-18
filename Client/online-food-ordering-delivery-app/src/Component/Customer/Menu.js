import { useHistory } from "react-router-dom";
import Footer from "../Styling/Footer";
import Header from "../Styling/Header";
import { useState } from "react";
import "./Menu.css"
import "./rating.css"

function Menu() {
    const [isVegMenu, setIsVegMenu] = useState(false);

    const toggleMenu = () => {
        setIsVegMenu(!isVegMenu);
    };

    const history = useHistory();
    const buttonClasses = isVegMenu ? 'btn veg-menu' : 'btn all-menu';

    return (<>
        <Header />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"></link>
        <div className="body" style={{ minHeight: "100vh" }}>
            <div className="container mt-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-1">
                    </div>
                    <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
                        <div className="card p-4 mt-3">
                            <div id="carouselExampleCaptions" className="carousel slide">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="http://127.0.0.1:3000/assets/Restaurants/restaurant1.jpg" className="d-block w-100" alt="..." height="500" style={{ opacity: 0.75 }} />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>Restaurant Name</h5>
                                            <p>Some representative placeholder content for the first slide.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="http://127.0.0.1:3000/assets/Restaurants/restaurant2.jpg" className="d-block w-100" alt="..." height="500" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="http://127.0.0.1:3000/assets/Restaurants/restaurant3.jpg" className="d-block w-100" alt="..." height="500" />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-1 p-4 mt-3">
                        <div className="collapse collapse-horizontal" id="collapseWidthExample">
                            <div className="list-group" style={{width: "300px"}}>
                            <h4>-  Filters</h4>
                            <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Location</h5>
                                <small></small>
                                </div>
                                <p className="mb-1"></p>
                                <small></small>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Rating</h5>
                                <small className="text-body-secondary"></small>
                                </div>
                                <p className="mb-1"></p>
                                <small className="text-body-secondary"></small>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Price Range</h5>
                                <small className="text-body-secondary"></small>
                                </div>
                                <p className="mb-1"></p>
                                <small className="text-body-secondary"></small>
                            </a>
                            </div>
                         </div> 
                        </div> */}
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-9">
                        <div className="card mt-3">
                            <div className=" d-flex flex-row-reverse">
                                <div className="p-2">
                                    <button type="button" className="btn btn-primary position-relative" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                                        Filter
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            2
                                            <span className="visually-hidden">unread messages</span>
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
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h4 style={{ textAlign: "center" }}>RESTAURANT_NAME's MENU</h4>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container-fluid mt-4">
                <div className="row">

                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">

                    </div>

                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg" className="img-fluid rounded-start" alt="..." style={{ height: "250px", width: "350px" }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Dish Name</h5>
                                        <h6 className="card-title">$100</h6>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                                        <div class="ratings">
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <p class="review-count">12 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg" className="img-fluid rounded-start" alt="..." style={{ height: "250px", width: "350px" }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Dish Name</h5>
                                        <h6 className="card-title">$100</h6>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                                        <div class="ratings">
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <p class="review-count">2 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg" className="img-fluid rounded-start" alt="..." style={{ height: "250px", width: "350px" }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Dish Name</h5>
                                        <h6 className="card-title">$100</h6>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                                        <div class="ratings">
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <p class="review-count">100 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="http://127.0.0.1:3000/assets/Dishes/Pizza.jpg" className="img-fluid rounded-start" alt="..." style={{ height: "250px", width: "350px" }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Dish Name</h5>
                                        <h6 className="card-title">$100</h6>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                                        <div class="ratings">
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star rating-color"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <p class="review-count">11 Reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            
                            <button type="button" className="btn btn-info" onClick={()=>{history.push("/order-details")}}>Add to Cart</button>
                            
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>);
}

export default Menu;