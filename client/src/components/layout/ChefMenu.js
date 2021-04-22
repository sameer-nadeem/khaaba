import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

const ChefMenu = () =>{
    return(
        <div>

            
        <div className="menu-top-container" >

<div className="container-fluid ">
    <div className="row my-row align-items-end justify-content-between pb-2">
        
        
      <div className="col-md-5 menu-top-info" >
        <div className = "row shopname"><p className = "text-start">Aloo Shop</p></div>

        <div className = "row address"><p className = "text-start">4.4/5       24:00-24:00 </p>  </div>

        
        <div className = "row address"> <p className = "text-start">Authentic Local food at best prices </p></div>

      </div>

      <div className="col-md-5 menu-top-info" >

        <div className = "row  address"><p className = "text-end">090078601</p></div>

        <div className = "row address text-end"><p className = "text-end">DHA Phase 5,  Khayaban-e-Jinnah Road, Lahore</p></div>

        
      </div>


    </div>
  </div>

</div>
<div className="container-fluid">


    <div className="row tags-row justify-content-center pb-4">
        
        
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


    </div>

    <div className="row dish-card-row  pb-4 justify-content-center ">

        <div className="col-md-4 col-sm-10 d-flex justify-content-center justify-content-md-end pb-2">
            
            <div className = "card add-dish-card justify-content-center">                             
                <div className="image-container plus-image">
                    <img className =" plus-container" src="/img/icons/plus.png" alt="Dish preview"/>

                    </div> 
                    <div className="text-addDish">

ADD DISH

</div>

            </div>

          </div>

          <div className="col-md-4 col-sm-10 d-flex justify-content-center pb-2">
            <div className = "card dish-card">                             
                <div className="image-container">
                <img className="dish-image" src="/img/icons/white.png" alt="Dish preview"/>
                </div> 
                
                <div className="row align-items-end  justify-content-center roweighty">
                    <div className="instant-khaaba-tag ">instant khaaba</div>
                    <div className = "available-serving">  available servings: 4</div>
                   
                    <div className = "row justify-content-between">
                        <div className = "col dishname" >chicken karahi </div>
                        <div className = "col-1 text-end price " > Rs 0000 </div>
                    </div>
                    <div className = "row justify-content-between">

                        

                        <div className = "col dish-description">  steam cooekd steam cooked ekd steam cekd steam c </div>
                        
                    </div>
                    
                </div>

            
                    <div className="row justify-content-center">
                        <button type="submit" className=" edit-dish-btn "><img className="edit-pencil" src="/img/icons/pencil.png" alt="Dish preview"/>Edit</button>
                    </div>
          
            </div>
          </div>

          <div className="col-md-4 col-sm-10 d-flex justify-content-center justify-content-md-start pb-2">
            <div className = "card dish-card">                             
                <div className="image-container">
                    <img className="dish-image" src="/img/icons/white.png" alt="Dish preview"/>
                    </div> 
                    <div className="row align-items-end justify-content-center roweighty" >
                        <div className = "row justify-content-between">
                            <div className = "col dishname coltwo" >chicken karahi </div>
                            <div className = "col-2 text-end price colone" > Rs 0000 </div>
                        </div>
                        <div className = "row">

                            <div className = "col"> steam cooked </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <button type="submit" className=" edit-dish-btn "> <img className="edit-pencil" src="/img/icons/pencil.png" alt="Dish preview"/> Edit</button>
                    </div>
            </div>
          </div>
        
    </div>

    <div className="row dish-card-row justify-content-center pb-2">

        <div className="col-md-4 col-sm-10 d-flex justify-content-center justify-content-md-end pb-2">
            <div className = "card dish-card">                             
                <div className="image-container">
                    <img className="dish-image" src="/img/icons/white.png" alt="Dish preview"/>
                    </div> 
                    <div className="row align-items-end justify-content-center coleighty" >
                        <div className = "row justify-content-between">
                            <div className = "col dishname coltwo" >chicken karahi </div>
                            <div className = "col-2 text-end price colone" > Rs 0000 </div>
                        </div>
                        <div className = "row">

                            <div className = "col"> steam cooked </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <button type="submit" className=" edit-dish-btn "> <img className="edit-pencil" src="/img/icons/pencil.png" alt="Dish preview"/> Edit</button>
                    </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-10 d-flex justify-content-center pb-2">
            <div className = "card  dish-card">                             
                <div className="image-container">
                    <img className="dish-image" src="/img/icons/white.png" alt="Dish preview"/>
                    </div> 
                    <div className="row align-items-end justify-content-center coleighty" >
                        <div className = "row justify-content-between">
                            <div className = "col dishname coltwo" >chicken karahi </div>
                            <div className = "col-2 text-end price colone" > Rs 0000 </div>
                        </div>
                        <div className = "row">

                            <div className = "col"> steam cooked </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <button type="submit" className=" edit-dish-btn ">Edit</button>
                    </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-10 d-flex justify-content-center justify-content-md-start pb-2">
            <div className = "card dish-card">                             
                <div className="image-container">
                    <img className="dish-image" src="/img/icons/white.png" alt="Dish preview"/>
                    </div> 
                    <div className="row align-items-end justify-content-center coleighty" >
                        <div className = "row justify-content-between">
                            <div className = "col dishname coltwo" >chicken karahi </div>
                            <div className = "col-2 text-end price colone" > Rs 0000 </div>
                        </div>
                        <div className = "row">

                            <div className = "col"> steam cooked </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <button type="submit" className=" edit-dish-btn "> <img className="edit-pencil" src="/img/icons/pencil.png" alt="Dish preview"/> Edit</button>
                    </div>
            </div>
          </div>
        
    </div>

    
</div>

        </div>

      
    )
}

export default ChefMenu