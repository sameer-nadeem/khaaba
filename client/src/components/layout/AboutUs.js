import React, { Component, Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
const AboutUs = ()=> {

return (
    <Fragment>
    <div className=" container-fluid p-5 mb-4  bg-white" >

    <div className="row">
            <div className="col-md-12 text-center">
                <h1 className="semibold pb-3">About<span className="color-orange semibold"> Us</span> </h1>
            </div>
        </div>
    <div className="row justify-content-center">
    <div className="col-md-10 text-center">
        <span className="post text-center about-font px-5">Khaaba aims to provide a platform where <span className="color-orange semibold">home cooked food </span> is easily accessible to the masses. We serve two different types of audiences. First being the Home Chefs, to whom we provide a platform where they can market their food, they are also  provided with a <span className="color-orange semibold">Instant Khaaba</span> option in which they can display already prepared food that they have for sale. Second will be the food lovers who will be the one buying from the Home chefs.</span>
    <br/>
    <br/>
        <span className="post text-center about-font px-5 mt-3">

        Our Web App  <span className="color-orange semibold">empowers</span> home chefs by providing an opportunity for them utilize their culinary skills to make an earning. Moreover, in a shift to work from home environment, aspiring chefs can utilize their cooking skills to become financially independent. Additionally, small <span className="color-orange semibold">food start-ups </span> that are only based on social media can all unite on a single platform where finding them is much easier.


            
        </span>
    </div>
        </div>
    </div>   


    <div className=" container-fluid p-5  bg-orange" >
        <div className="row">
            <div className="col-md-12 text-center">
                <h1 className="semibold pb-3">Meet <span className="color-white semibold">the Team</span> </h1>
            </div>
        </div>
        <div className="row justify-content-center">
        <div className="col-md-2 col-sm-6 d-flex justify-content-center">
            <div className="our-team" >
                <div className="pic">
                    <img src="/img/profiles/faraz.png" alt="Image"/>
                </div>
                <h3 className="title profile-font">Muhammad Faraz Karim</h3>
                <span className="post">Web Developer</span>
                <ul className="social profile-font">
                    <li><a href="#"  className="fa fa-facebook"></a></li>
                    <li><a href="#" className="fa fa-twitter"></a></li>
                    <li><a href="#" className="fa fa-google-plus"></a></li>
                    <li><a href="https://www.linkedin.com/in/faraz-k-57345813a/" target="_blank"className="fa fa-linkedin"></a></li>
                </ul>
            </div>
        </div>

        

        <div className="mx-2 col-md-2 col-sm-6 d-flex justify-content-center">
            <div className="our-team" >
                <div className="pic">
                    <img src="/img/profiles/sameer.jpeg" alt="Image"/>
                </div>
                <h3 className="title profile-font">Muhammad Sameer Nadeem</h3>
                <span className="post">Project Manager</span>
                <ul className="social profile-font">
                    <li><a href="#" className="fa fa-facebook"></a></li>
                    <li><a href="#" className="fa fa-twitter"></a></li>
                    <li><a href="#" className="fa fa-google-plus"></a></li>
                    <li><a href="https://www.linkedin.com/in/sameer-nadeem-660b00209/" target="_blank" className="fa fa-linkedin"></a></li>
                </ul>
            </div>
        </div>
        
        <div className="mx-2 col-md-2 col-sm-6 d-flex justify-content-center">
            <div className="our-team" >
                <div className="pic">
                    <img src="/img/profiles/Hamza_Naveed_2.jpg" alt="Image"/>
                </div>
                <h3 className="title profile-font">Hamza Naveed</h3>
                <span className="post">Project Champion</span>
                <ul className="social profile-font">
                    <li><a href="#" className="fa fa-facebook"></a></li>
                    <li><a href="#" className="fa fa-twitter"></a></li>
                    <li><a href="#" className="fa fa-google-plus"></a></li>
                    <li><a href="https://www.linkedin.com/in/hamza-naveed-80a588a4/" target="_blank" className="fa fa-linkedin"></a></li>
                </ul>
            </div>
        </div>
        <div className=" mx-2 col-md-2 col-sm-6 d-flex justify-content-center">
            <div className="our-team" >
                <div className="pic">
                    <img src="/img/profiles/haseeb.png" alt="Image"/>
                </div>
                <h3 className="title profile-font">Haseeb Abid</h3>
                <span className="post">Web Developer</span>
                <ul className="social profile-font">
                    <li><a href="#" className="fa fa-facebook"></a></li>
                    <li><a href="#" className="fa fa-twitter"></a></li>
                    <li><a href="#" className="fa fa-google-plus"></a></li>
                    <li><a href="https://www.linkedin.com/in/haseeb-abid/" target="_blank" className="fa fa-linkedin"></a></li>
                </ul>
            </div>
        </div>

        <div className="col-md-2 col-sm-6 d-flex justify-content-center">
            <div className="our-team" >
                <div className="pic">
                    <img src="/img/profiles/ali.jpeg" alt="Image"/>
                </div>
                <h3 className="title profile-font">Ali Hassan</h3>
                <span className="post">Dilon ka Champion</span>
                <ul className="social profile-font">
                    <li><a href="#" className="fa fa-facebook"></a></li>
                    <li><a href="#" className="fa fa-twitter"></a></li>
                    <li><a href="#" className="fa fa-google-plus"></a></li>
                    <li><a href="#" className="fa fa-linkedin"></a></li>
                </ul>
            </div>
        </div>
        
    </div>
        
    </div>
    </Fragment>

)



}
export default AboutUs