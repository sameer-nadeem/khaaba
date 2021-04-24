import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify'



const ChefMenu = ({profile}) =>{

  const [khaabas, setkhaabas] = useState([])

  useEffect(async () => {
    try {
      console.log(`fdddddddddddddddddfdfdf:  ${profile.kitchen._id}`)

      const res = await axios.get(`/api/kitchen/get-menu/${profile.kitchen._id}`)

      console.log(res);

      setkhaabas(res.data.khaabas)

    }
    catch (error) {
      console.log(error);

    }
  }, []
  )

  const EditCall = (editdishinfo) => {

    console.log("this is the dish info to edit", editdishinfo)
    sessionStorage.setItem("DISH", JSON.stringify(editdishinfo))
    console.log("saved in session")    
  }




    return(
        <div>

            
        <div className="menu-top-container" >

<div className="container-fluid ">
    <div className="row my-row align-items-end justify-content-between pb-2">
        
        
      <div className="col-md-5 menu-top-info" >
        <div className = "row shopname"><p className = "text-start">{`${profile.kitchen.title}`}</p></div>

        <div className = "row address"><p className = "text-start">{`${profile.kitchen.avgRating}/5          ${profile.kitchen.activeHours.start} - ${profile.kitchen.activeHours.end}`} </p>  </div>

        
        <div className = "row address"> <p className = "text-start">{`${profile.kitchen.description}`} </p></div>

      </div>

      <div className="col-md-5 menu-top-info" >

        <div className = "row  address"><p className = "text-end">{`${profile.phone}`}</p></div>

        <div className = "row address text-end"><p className = "text-end">{`${profile.address.addr}`}</p></div>

        
      </div>


    </div>
  </div>

</div>
<div className="container-fluid">


    {/* <div className="row tags-row justify-content-center pb-4">
        
        
      <div className=" col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center menu-tags pb-1">
        Appetizers
      </div>

      <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center menu-tags">
        Pizzas
      </div>
      <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center menu-tags" >
        Burgers
      </div>
      <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center menu-tags">
        Desserts
      </div>
      <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center menu-tags">
        Salad
      </div>
      <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center menu-tags" >
        Desi
      </div>
      <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center menu-tags">
        Beverages
      </div>
      <div className="col-md-1 col-sm-12 menu-categories-btn d-flex justify-content-center menu-tags">
        Baked
      </div>


    </div> */}

    <div className="row dish-card-row  pb-4 justify-content-center ">

        <div className="col-md-4 col-sm-10 d-flex justify-content-center justify-content-md-center pb-2">
            
            <div className = "card add-dish-card justify-content-center">                             
                <div className="image-container plus-image">
                  <Link to="/chef/adddish">
                    <img className =" plus-container" src="/img/icons/plus.png" alt="Dish preview"/>
                    </Link>
                    </div> 
                    <div className="text-addDish">

ADD DISH

</div>

            </div>

          </div>

          {

          khaabas.map((dish, index) =>(
            <div className="col-md-4 col-sm-10 d-flex justify-content-center justify-content-md-center pb-2">
            <div className = "card dish-card">                             
                <div className="image-container">
                <img className="dish-image" src={`/uploads/dish-logos/${dish.thumbnail}`} alt="Dish preview"/>
                </div> 
                
                <div className="row align-items-end  justify-content-center roweighty">
                  {
                    dish.instantKhaaba.isInstant &&
                    <div className="instant-khaaba-tag ">Instant Khaaba</div>
                  
                  }
    
                  {
                    
                    
                    
                      dish.instantKhaaba.isInstant &&
                    <div className = "available-serving">  Available servings: {`${dish.instantKhaaba.availableServings}`}</div>
                    }
                    <div className = "row justify-content-between">
                        <div className = "col dishname" >{`${dish.title}`} </div>
                        <div className = "col-1 text-end price " > Rs {`${dish.price}`} </div>
                    </div>
                    <div className = "row justify-content-between">

                        

                        <div className = "col dish-description">  {`${dish.description}`} </div>
                        
                    </div>
                    
                </div>

                
                    {/* <div className="row justify-content-center"> */}
                    <Link to="/chef/editdish" className="row justify-content-center">
                        <button type="submit" onClick={() => EditCall(dish)} className=" edit-dish-btn "><img className="edit-pencil" src="/img/icons/pencil.png" alt="Dish preview"/>Edit</button>
                        </Link>
                    {/* </div> */}
            </div>
          </div>
            
          ))



}
          

        
    </div>


    
</div>



        </div>

      
    )
}

const mapStatesToProps = (state) => {
  return{
    profile: state.auth.user ? state.auth.user.profile: null,
  };
};


export default connect(mapStatesToProps, {})(ChefMenu);