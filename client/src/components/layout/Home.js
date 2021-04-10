import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import { getPopularKitchens} from '../../actions/homepage'


const Home = () => {
useEffect(() => {
  getPopularKitchens()
}, []
)
    return (
        <Fragment>

<div className="container-fluid home-container fitted justify-content-center">
       
       <div className="row-md-8">
   
       <div className="col-md-4 align-bottom ">

           <h5 className="search-heading "> All your favourite Kitchens under one roof</h5> 

       </div>
       <div className="col-md-4">
           <h4 className="search-subheading ">Khaaba is the place to satisfy all your cravings for delicious homecooked food  </h4>
       </div>
       <div className="row">
           <div className="col-md-5  ">
           <div className="input-group ">
               <input type="search" className="form-control rounded-edges " placeholder="Find Food/Kitchen" aria-label="Search"
                 aria-describedby="search-addon" />
               <button type="button" className="btn findfood-btn find-heading">Find Food</button>
             </div>
             </div>
       </div>  

       </div>
  


 
   </div>
   <div  className="container-fluid  ">
  
       <div className="row strip"> </div>


         <div className="col-md-5">
          

          <div className="khaabatry-card fitted">
           <div className="row"> <h3 className="color-orange"> Instant Khaaba</h3></div>
           <div className="row">
           <h4> Instant Khaaba is a quick way to find your nearest ready made meals.  Select from a list ready to eat servings in your area</h4>
       </div>
       <div className="row justify-content-end"> 
           <div className="col-md-4 form-group">
               <button className="btn btn-primary pull-right orange-btn " type="submit">Try Now</button>
             </div>
           
       </div>
          </div>
         </div>

     </div>

     
 <div className="container-fluid pb-5 bg-white" >
   <div className="row justify-content-sm-center pb-5">
   <div  className="review-heading d-inline"> Popular<span className="color-orange"> Kitchens</span> </div>
 </div>
   <div className="row justify-content-sm-evenly px-5 ">

     <div className="col-lg-3 pb-2 d-flex justify-content-center">
         
                  
                   <div className="card justify-content-md-center kitchen-card">
                     <img src="appetizer.jpg" className="card-img-top rounded-image" alt="..." />
                     <div className="row px-3  justify-content-sm-center">
                     <div className="card-body">
                         
                       <h5 className="card-title text-center pb-2">Kitchen Name</h5>
                     <div className="bottom-0 ">
                         <span className="d-inline-block bottom-0">
                         <i className="fa fa-star checked star1"> </i>
                         <span className="d-inline-block text-align-center rating-font"> 4/<span>5</span></span>
                       
                     </span>
                     
                     
                       <a href="#" className="btn btn-primary pull-right orange-btn ">Menu </a>
                    
                     </div>
                   </div>
                   </div>
                   </div>
           </div>

                 <div className="col-lg-3 pb-2 d-flex justify-content-center">        
                  
                   <div className="card kitchen-card">
                     <img src="appetizer.jpg" className="card-img-top rounded-image" alt="..."/>
                     <div className="row px-3">
                     <div className="card-body">
                         
                       <h5 className="card-title text-center pb-2">Kitchen Name</h5>
                     <div className="bottom-0 ">
                         <span className="d-inline-block bottom-0">
                         <i className="fa fa-star checked star1 "> </i>
                         <span className="d-inline-block text-align-center rating-font"> 4/<span>5</span></span>
                       
                     </span>
                     
                     
                       <a href="#" className="btn btn-primary pull-right orange-btn ">Menu </a>
                    
                     </div>
                   </div>
                   </div>
                   </div>

                   </div>
                  
                   <div className="col-lg-3 pb-2 d-flex justify-content-center">


                     <div className="card kitchen-card">
                       <img src="appetizer.jpg" className="card-img-top rounded-image" alt="..."/>
                       <div className="row px-3">
                       <div className="card-body">
                           
                         <h5 className="card-title text-center pb-2">Kitchen Name</h5>
                       <div className="bottom-0 ">
                           <span className="d-inline-block bottom-0">
                           <i className="fa fa-star checked star1 "> </i>
                           <span className="d-inline-block text-align-center rating-font"> 4/<span>5</span></span>
                         
                       </span>
                       
                       
                         <a href="#" className="btn btn-primary pull-right orange-btn ">Menu </a>
                      
                       </div>
                     </div>
                     </div>
                     </div>
                  
                  </div>

                  <div className="col-lg-3 pb-2 d-flex justify-content-center">

                   <div className="card kitchen-card">
                     <img src="appetizer.jpg" className="card-img-top rounded-image" alt="..."/>
                     <div className="row px-3">
                     <div className="card-body">
                         
                       <h5 className="card-title text-center pb-2">Kitchen Name</h5>
                     <div className="bottom-0 ">
                         <span className="d-inline-block bottom-0">
                         <i className="fa fa-star checked star1 "> </i>
                         <span className="d-inline-block text-align-center rating-font "> 4/<span>5</span></span>
                       
                     </span>
                     
                     
                       <a href="#" className="btn btn-primary pull-right orange-btn ">Menu </a>
                    
                     </div>
                   </div>
                   </div>
                   </div>
                  
                 
                             
         
     </div>
     
   
  
 
 </div>
 </div>
 <div className="container-fluid pt-5 pb-5 bg-orange" >
   <div className="row justify-content-sm-center pb-5">
     <div  className="review-heading d-inline"> Select by<span className="color-white"> Cuisine</span> </div>
</div>
     <div className="row justify-content-center px-lg-5 ">
     <div className="col d-flex justify-content-center pb-4" >
     <div className="card cusine-card" >
       <div className="image-container">
         <img className="dish-image" src="appetizer.jpg" alt="Dish preview"/>
         </div> 
       <div className="row px-3">
       <div className="card-body">
           
         <h5 className="card-title text-center pb-2">Appetizer</h5>

     </div>
     </div>
     </div> 

   </div>
   <div className="col d-flex justify-content-center pb-4" >
     <div className="card cusine-card" >
       <div className="image-container">
         <img className="dish-image" src="appetizer.jpg" alt="Dish preview"/>
         </div> 
       <div className="row px-3">
       <div className="card-body">
           
         <h5 className="card-title text-center pb-2">Pizzas</h5>

     </div>
     </div>
     </div>  
   </div>

   <div className="col d-flex justify-content-center pb-4" >
     <div className="card cusine-card" >
       <div className="image-container">
         <img className="dish-image" src="appetizer.jpg" alt="Dish preview"/>
         </div> 
       <div className="row px-3">
       <div className="card-body">
           
         <h5 className="card-title text-center pb-2">Burgers</h5>

     </div>
     </div>
     </div>   
   </div>

   <div className="col d-flex justify-content-center pb-4" >
     <div className="card cusine-card" >
       <div className="image-container">
         <img className="dish-image" src="appetizer.jpg" alt="Dish preview"/>
         </div> 
       <div className="row px-3">
       <div className="card-body">
           
         <h5 className="card-title text-center pb-2">Desserts</h5>

     </div>
     </div>
     </div> 
   </div>

   <div className="col d-flex justify-content-center pb-4" >
     <div className="card cusine-card" >
       <div className="image-container">
         <img className="dish-image" src="appetizer.jpg" alt="Dish preview"/>
         </div> 
       <div className="row px-3">
       <div className="card-body">
           
         <h5 className="card-title text-center pb-2">Salad</h5>

     </div>
     </div>
     </div>   
   </div>

   <div className="col d-flex justify-content-center pb-4" >
     <div className="card cusine-card" >
       <div className="image-container">
         <img className="dish-image" src="appetizer.jpg" alt="Dish preview"/>
         </div> 
       <div className="row px-3">
       <div className="card-body">
           
         <h5 className="card-title text-center pb-2">Desi</h5>

     </div>
     </div>
     </div>  
   </div>

   <div className="col d-flex justify-content-center pb-4" >
     <div className="card cusine-card" >
       <div className="image-container">
         <img className="dish-image" src="appetizer.jpg" alt="Dish preview"/>
         </div> 
       <div className="row px-3">
       <div className="card-body">
           
         <h5 className="card-title text-center pb-2">Beverages</h5>

     </div>
     </div>
     </div>  
   </div>

   
   <div className="col d-flex justify-content-center pb-4" >
     <div className="card cusine-card" >
       <div className="image-container">
         <img className="dish-image" src="appetizer.jpg" alt="Dish preview"/>
         </div> 
       <div className="row px-3">
       <div className="card-body">
           
         <h5 className="card-title text-center pb-2">Baked</h5>

     </div>
     </div>
     </div>   
   </div>
   
     </div>
   </div>
   {/* </div> */}

   {/* <div >
   </div> */}
   <div className="container-fluid pt-5 pb-5 bg-white" >
     <div className="row justify-content-sm-center pb-5">
       <div  className="review-heading d-inline"> You might<span className="color-orange"> also like...</span> </div>
 </div>
       
 <div className="row dish-card-row px-5  pb-4 justify-content-center ">

   <div className="col-md-3 col-sm-10 d-flex justify-content-center  pb-2">
     <div className = "card dish-card">                             
         <div className="image-container">
             <img className="dish-image2" src="appetizer.jpg" alt="Dish preview"/>
             </div> 
             <div className="row align-items-end justify-content-center height-80">
                 <div className = "row justify-content-between">
                     <div className = "col dishname">chicken karahi </div>
                     <div className = "col-2 text-end price" > Rs 0000 </div>
                 </div>
                 <div className = "row">

                     <div className = "col"> steam cooked </div>
                 </div>
             </div>
             <div className="row justify-content-start">
                 
                 <div className = "row justify-content-between">
                     <div className = "col dishname"><button type="submit" className=" add-to-cart-btn ">Add to cart</button></div>
                     <div className = "col-2 text-end price dish-count" >
                         <div className="btn-group" role="group" aria-label="Basic example">
                         <button type="button" className="counter-button-left">+</button>
                         <button type="button" className="number-box">00</button>
                         <button type="button" className="counter-button-right">-</button>
                       </div>  </div>
                 </div>
             </div>
     </div>
   </div>

   <div className="col-md-3 col-sm-10 d-flex justify-content-center  pb-2">
       <div className = "card dish-card">                             
           <div className="image-container">
               <img className="dish-image2" src="appetizer.jpg" alt="Dish preview"/>
               </div> 
               <div className="row align-items-end justify-content-center height-80">
                   <div className = "row justify-content-between">
                       <div className = "col dishname">chicken karahi </div>
                       <div className = "col-2 text-end price" > Rs 0000 </div>
                   </div>
                   <div className = "row">
 
                       <div className = "col"> steam cooked </div>
                   </div>
               </div>
               <div className="row justify-content-start">
                   
                   <div className = "row justify-content-between">
                       <div className = "col dishname"><button type="submit" className=" add-to-cart-btn ">Add to cart</button></div>
                       <div className = "col-2 text-end price dish-count" >
                           <div className="btn-group" role="group" aria-label="Basic example">
                           <button type="button" className="counter-button-left">+</button>
                           <button type="button" className="number-box">00</button>
                           <button type="button" className="counter-button-right">-</button>
                         </div>  </div>
                   </div>
               </div>
       </div>
     </div>


     <div className="col-md-3 col-sm-10 d-flex justify-content-center  pb-2">
       <div className = "card dish-card">                             
           <div className="image-container">
               <img className="dish-image2" src="appetizer.jpg" alt="Dish preview"/>
               </div> 
               <div className="row align-items-end justify-content-center height-80">
                   <div className = "row justify-content-between">
                       <div className = "col dishname">chicken karahi </div>
                       <div className = "col-2 text-end price" > Rs 0000 </div>
                   </div>
                   <div className = "row">
 
                       <div className = "col"> steam cooked </div>
                   </div>
               </div>
               <div className="row justify-content-start">
                   
                   <div className = "row justify-content-between">
                       <div className = "col dishname"><button type="submit" className=" add-to-cart-btn ">Add to cart</button></div>
                       <div className = "col-2 text-end price dish-count" >
                           <div className="btn-group" role="group" aria-label="Basic example">
                           <button type="button" className="counter-button-left">+</button>
                           <button type="button" className="number-box">00</button>
                           <button type="button" className="counter-button-right">-</button>
                         </div>  </div>
                   </div>
               </div>
       </div>
     </div>

     <div className="col-md-3 col-sm-10 d-flex justify-content-center  pb-2">
       <div className = "card dish-card">                             
           <div className="image-container">
               <img className="dish-image2" src="appetizer.jpg" alt="Dish preview"/>
               </div> 
               <div className="row align-items-end justify-content-center height-80">
                   <div className = "row justify-content-between">
                       <div className = "col dishname">chicken karahi </div>
                       <div className = "col-2 text-end price" > Rs 0000 </div>
                   </div>
                   <div className = "row">
 
                       <div className = "col"> steam cooked </div>
                   </div>
               </div>
               <div className="row justify-content-start">
                   
                   <div className = "row justify-content-between">
                       <div className = "col dishname"><button type="submit" className=" add-to-cart-btn ">Add to cart</button></div>
                       <div className = "col-2 text-end price dish-count" >
                           <div className="btn-group" role="group" aria-label="Basic example">
                           <button type="button" className="counter-button-left">+</button>
                           <button type="button" className="number-box">00</button>
                           <button type="button" className="counter-button-right">-</button>
                         </div>  </div>
                   </div>
               </div>
       </div>
     </div>
 
</div>
 
           </div>
           
        {/*</div>
         </div>    
         </div>

         </div>
         </div> */}

        </Fragment>
        

    )
}

export default connect (null, {getPopularKitchens}) (Home)