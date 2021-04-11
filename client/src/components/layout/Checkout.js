import React from 'react'

const CheckoutSuccess =()=>{

    return (

        <div className="container-fluid login-container pt-5">
        
            <div className="row justify-content-center pt-5">
                <div className = "col-sm-5">
                    <div className="card login-card ">
                        <div className = "card-body">
                            <div className = "col text-center">
                                <img className="tick-icon" src="/img/icons/tick.png" alt="" srcset=""></img>
                            </div>
                            <h2 className = "text-center pt-2">Your order has <br/>been placed </h2>
                            <h5 className="card-title text-center pt-5"> You can keep track of you order<br/> through <h2 class = "card-title text-center login-heading"> My orders </h2></h5>        
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CheckoutSuccess