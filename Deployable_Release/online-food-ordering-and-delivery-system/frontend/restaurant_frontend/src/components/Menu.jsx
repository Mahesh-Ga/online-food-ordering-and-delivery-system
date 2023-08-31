import { useSelector } from 'react-redux';
import { addMenu, addMenuImage, getAllActiveRestaurants, getMenu, getMenuByRestaurantId, removeMenu, removeRestaurant, updateMenu } from '../services/restaurantService';
import '../style.css'
import React, { useEffect, useState } from 'react'
import { log } from '../utils/util';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MenuSearchBar from './MenuSearchBar';


function Menu() {
  const [menu, setMenu] = useState([])
  const token = useSelector((state)=>state.token.tokenValue)
  const resId=useSelector((state)=>state.restaurant.id)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [menuType, setMenuType] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [id, setId] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);

  const [filteredMenu, setFilteredMenu] = useState([]);
  useEffect(() => {
    debugger
        loadData();
    
      }, []);  

  // useEffect(()=>{
  //   if(token!="")
  //   loadData();
  
  // },[token])

    const handleSearch = (query) => {
      debugger
      if (query.trim() === '') {
        setFilteredMenu([]); // Clear filtered menu when the query is empty
      }else{
      const filtered = menu.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMenu(filtered);
    };}
  const loadData = async() => {
    console.log(resId)
debugger
    const response=await getMenuByRestaurantId(resId,token)
    if(response != null && response.status == 200) {
      debugger;
      setMenu(response.data);  
      log(response.data)
    }
    else{
      debugger;
    }
  }
 
 const removeMyMenu=async(menuId)=>{
  debugger    
  log(menuId)

  const response=await removeMenu(menuId,token)
  if(response != null && response.status == 200) {
    debugger;
   loadData()
    log(response.data)
  }
  else{
    debugger;
  }
 }
 const getOldMenuData= async(menuId)=>{
  const response = await getMenu(menuId,token)
debugger
  // parse the response
  if (response != null && response['status'] == 200) {
    // toast.success('Successfully added a new menu')
    // navigate('/menu')
    log("get Menu details")
    setId(response.data.id)
    setName(response.data.name)
    setMenuType(response.data.menuType)
    setCategory(response.data.category)
    setPrice(response.data.price)
    

  } else {
   // toast.error('Error while added a new menu, please try again')
   log("Error in getting Menu ")
  }
}
 
    const updatedMenu = async (menuId) => {
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
        const response = await updateMenu(
          menuId,
          token,
          name,
          menuType,
          category,
          price
        )
      debugger
        // parse the response
        if (response != null && response['status'] == 200) {
         
          
          toast.success('Successfully updated a menu')
          setId("")
          setName("")
          setCategory("")
          setMenuType("")
          setPrice("")
          loadData();
         
        } else {
          toast.error('Error while added updating menu, please try again')
        }
      }
    }
    const addImage= async(menuId)=>{
      debugger
      const formData = new FormData();
    formData.append('imageFile', selectedFile);
    const response=await addMenuImage(menuId,token,formData)
    debugger
    // parse the response
    if (response != null && response['status'] == 201) {
      
      setSelectedFile(null);
      loadData();
      toast.success('Successfully addded a menu Image')
      
      
    } else {
      toast.error('Error while adding a menu Image, please try again')
      setSelectedFile(null);
    }
    }
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
          price,
        
        )
      debugger
        // parse the response
        if (response != null && response['status'] == 200) {
          toast.success('Successfully added a new menu')
          setId("")
          setName("")
          setCategory("")
          setMenuType("")
          setPrice("")
          loadData();
        } else {
          toast.error('Error while added a new menu, please try again')
        }
      }
    }
  
    const clearAll=()=>{
      setId("")
      setName("")
      setCategory("")
      setMenuType("")
      setPrice("")
    }
  return (<>
   <div>
   <button type="button" class="btn btn-warning " data-toggle="modal" data-target="#exampleModal1" onClick={()=>clearAll()}>
  Add Menu
</button>


<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel1">Add New Menu</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className='row' >
        <div className='col'></div>
        <div className='col' style={{backgroundColor:'wheat'}}>
       
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Menu Name</label>
              <input
              value={name}
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
  value="VEG" name='aaa'
  checked={category === 'VEG'} 
  onChange={(e) => setCategory(e.target.value)} />
  <label class="form-check-label" >
    VEG
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio"  id="flexRadioDefault2"
  value="NONVEG" name='aaa'
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
               value={price}
                type='number'
                className='form-control'
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />
            </div>
           
           
           

            <div className='mb-3'>
             
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>{newMenu()}}>Save changes</button>
      </div>
    </div>
  </div>
</div>
<h1 style={{ textAlign: 'center', margin: 10 }}>Menus</h1>
   </div>
    <div>
         
      <div>
      <MenuSearchBar onSearch={handleSearch} value={filteredMenu} />
      <div className="row">
        {filteredMenu.map((m) => (
          <div className="col-md-3" key={m.id}>
             <div className='card' style={{backgroundColor:"navajowhite",margin:10}}>
                <img
                 src={`https://localhost:7070/restaurant/menuImage/${m['id']}`}
                  style={{ height: 200 }}
                  alt=''
                />
                <div className='card-body'>
                  <h5 className='card-title'>{m['name']}</h5>
                  <div className='card-text'>
                    <div>{m['menuType']}</div>
                    <div>₹ {m['price']}</div>
                    <div>
                      
                      <hr />
                      
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{margin:5}} onClick={()=>{getOldMenuData(m['id'])}}> Update </button>
 
 <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update Menu Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
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
          value={name}
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
value="NONVEG" 
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
          value={price}
        />
      </div>
     

      {/* <div className='mb-3'>
        <button onClick={()=>{updateMenu()}} className='btn btn-success' style={{backgroundColor:'darkgoldenrod'}}>
          Add Menu
        </button>
      </div> */}
    </div>
  </div>
  <div className='col'></div>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onClick={()=>updatedMenu(id)} data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>


<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalImage" onClick={()=>{getOldMenuData(m['id'])}}>
  Add Menu Image
</button>


<div class="modal fade" id="exampleModalImage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalImageLabel">Add Menu Image</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div className='mb-3'>
              <label htmlFor=''>Menu Image</label>
              <input
              //  value={selectedFile}
                type='file'
                className='form-control'
                onChange={(e) => {
                  setSelectedFile(e.target.files[0])
                }}
              />
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>{addImage(id)}}>Save changes</button>
      </div>
    </div>
  </div>
</div>

                      &nbsp;
                      <button type="button" class="btn btn-danger" style={{margin:5}} onClick={()=>{removeMyMenu(m['id'])}}>Remove</button>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>

       <div>
    <hr /><hr /><hr />
</div>
      <div className='row' style={{ marginTop: 50 }}>
        {menu.map((m) => {
          return (
            <div className='col-md-3'>
              <div className='card' style={{backgroundColor:"navajowhite",margin:10}}>
                <img
                 src={`https://localhost:7070/restaurant/menuImage/${m['id']}`}
                  style={{ height: 200 }}
                  alt=''
                />
                <div className='card-body'>
                  <h5 className='card-title'>{m['name']}</h5>
                  <div className='card-text'>
                    <div>{m['menuType']}</div>
                    <div>₹ {m['price']}</div>
                    <div>
                      
                      <hr />
                      
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{margin:5}} onClick={()=>{getOldMenuData(m['id'])}}> Update </button>
 
 <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update Menu Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
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
          value={name}
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
value="NONVEG" 
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
          value={price}
        />
      </div>
     

      {/* <div className='mb-3'>
        <button onClick={()=>{updateMenu()}} className='btn btn-success' style={{backgroundColor:'darkgoldenrod'}}>
          Add Menu
        </button>
      </div> */}
    </div>
  </div>
  <div className='col'></div>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onClick={()=>updatedMenu(id)} data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>


<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalImage" onClick={()=>{getOldMenuData(m['id'])}}>
  Add Menu Image
</button>


<div class="modal fade" id="exampleModalImage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalImageLabel">Add Menu Image</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div className='mb-3'>
              <label htmlFor=''>Menu Image</label>
              <input
              //  value={selectedFile}
                type='file'
                className='form-control'
                onChange={(e) => {
                  setSelectedFile(e.target.files[0])
                }}
              />
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>{addImage(id)}}>Save changes</button>
      </div>
    </div>
  </div>
</div>

                      &nbsp;
                      <button type="button" class="btn btn-danger" style={{margin:5}} onClick={()=>{removeMyMenu(m['id'])}}>Remove</button>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </>

  )
}

export default Menu;
