import React from 'react'
import '../style.css'
import { useState , useEffect } from 'react'
import { useSelector } from 'react-redux';
function Home() {

//    const [restaurants,setRestaurant]  = useState([])

    const token = useSelector((state)=>state.token.tokenValue)

    useEffect(() => {
    
      debugger
    }, []);
    
    useEffect(()=>{
  //    if(token!="")
//      loadData();
    
    },[token])
  
    const loadData = async() => {
  
//      const response = await getAllActiveRestaurants(token)
      debugger  
      // if(response != null && response.status == 200) {
      //     debugger;
      //     setRestaurant(response.data);  
      //   }
      //   else{
      //     debugger;
      //   }
    }
  
      
    return (
        <div className='container-fluid' >
            <div className='row g-3 my-2'>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>230</h3>
                            <p className='fs-5'>Restaurants</p>
                        </div>
                        <i className='bi bi-buildings p-3 fs-1'></i>
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>2450</h3>
                            <p className='fs-5'>Sales</p>
                        </div>
                        <i className='bi bi-currency-dollar p-3 fs-1'></i>
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>2250</h3>
                            <p className='fs-5'>Delivery</p>
                        </div>
                        <i className='bi bi-truck p-3 fs-1'></i>
                    </div>
                </div>
                
                <div className='col-md-3 p-1'>
                    <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                        <div>
                            <h3 className='fs-2'>20%</h3>
                            <p className='fs-5'>Increase</p>
                        </div>
                        <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
                    </div>
                </div>
            </div>
            


</div>

    )
}

export default Home;