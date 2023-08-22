import Footer from "../Styling/Footer";
import Header from "../Styling/Header";

function OrderDetails() {
    return ( <>
    <Header/>
    
    <div className="body" style={{ minHeight: "100vh" }}>
             <hr />
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h4 style={{ textAlign: "center" }}>ORDER SUMMARY</h4>
                    </div>
                </div>
            </div>
            <hr />
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                
                <div class="table-responsive">
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <button type="button" class="btn btn-warning">Place Order</button>
                    
                </div>
                
                </div>
            </div>
        </div>
        





    </div>
    <Footer/>    
    </> );
}

export default OrderDetails;