import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addMenu } from '../services/restaurantService'
import { useSelector } from 'react-redux'


function AddMenu() {
  const [name, setName] = useState('')
  const [menuType, setMenuType] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
 
  const token = useSelector((state)=>state.token.tokenValue)
  const resId=useSelector((state)=>state.restaurant.id)
  // get the navigation object
  const navigate = useNavigate()

  const newMenu = async () => {
    debugger
    if (name.length == '') {
      toast.error('Please enter Menu name')
    }  else if (menuType.length =='') {
      toast.error('Menu Type not selected')
    }else if (category.length =='') {
      toast.error('Category not selected')
    }else if (price.length =='') {
      toast.error('Price not Entered')
    } else {
      // call register api
      const response = await addMenu(
        resId,
        token,
        name,
        menuType,
        category,
        price
      )
    debugger
      // parse the response
      if (response != null && response['status'] == 200) {
        toast.success('Successfully added a new menu')
        navigate('/menu')
      } else {
        toast.error('Error while added a new menu, please try again')
      }
    }
  }

  return (
    
    <div className='mb-3 row' style={{backgroundImage : `url("http://localhost:3000/Images/addMenu3.jpg")`}}>
      
    
     
      <h3 style={{ textAlign: 'center', margin: 10 }}>Enter New Menu Details</h3>

      <div className='row' >
        <div className='col'></div>
        <div className='col' style={{backgroundColor:'wheat'}}>
       
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Menu Name</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
            <label htmlFor=''>Menu Type</label> 
           
            <select class="form-select" aria-label="Default select example"
             value={menuType}
             onChange={(e) => setMenuType(e.target.value)}
             >
            <option selected>Select the Menu Type </option>
            <option value="APPETIZERS">APPETIZERS</option>
            <option value="SALADS_AND_SOUPS">SALADS_AND_SOUPS</option>
            <option value="SANDWICHES">SANDWICHES</option>
            <option value="ITALIAN">ITALIAN</option>
            <option value="MAIN_COURSE">MAIN_COURSE</option>
            <option value="DESSERTS">DESSERTS</option>
            <option value="BEVERAGES">BEVERAGES</option>
            <option value="SEAFOOD">SEAFOOD</option>          
           </select>
          </div>
          <div className='mb-3'>
          <div class="form-check">
  <input class="form-check-input" type="radio"  id="flexRadioDefault1"
  value="VEG" 
  checked={category === 'VEG'} 
  onChange={(e) => setCategory(e.target.value)} />
  <label class="form-check-label" >
    VEG
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio"  id="flexRadioDefault2"
  value="VEG" 
  checked={category === 'NONVEG'} 
  onChange={(e) => setCategory(e.target.value)} />
  <label class="form-check-label">
    NON-VEG
  </label>
</div>
          </div>
            <div className='mb-3'>
              <label htmlFor=''>Price</label>
              <input
                type='number'
                className='form-control'
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />
            </div>
           

            <div className='mb-3'>
              <button onClick={()=>{newMenu()}} className='btn btn-success' style={{backgroundColor:'darkgoldenrod'}}>
                Add Menu
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default AddMenu