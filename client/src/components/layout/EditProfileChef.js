import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import {editprofile_chef, passchange_chef, editprofile_cheflogo } from '../../actions/editchefAction'

const EditProfileChef = ({profile,editprofile_chef, passchange_chef, editprofile_cheflogo}) => {
    console.log(`the profile`,profile)
    const [SaveAllow, setSaveAllow]=useState(true)
    const [registerFields, setRegisterFields] = useState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        title: profile.kitchen.title,
        start: profile.kitchen.activeHours.start,
        end: profile.kitchen.activeHours.end,
        // start:`10:12`,
        // end: `10:12`,
        description: profile.kitchen.description,
        email: profile.email,
        city: profile.address.city,
        phone: profile.phone,
        address: profile.address.addr,
        
        //password: profile.password,
    })
    const [logoFields, setlogoFields] = useState({logo:profile.kitchen.logo})
const [NewPass, setNewPass]=useState('')
const [PassChangeFlag, setPassChangeFlag]=useState(false)
const [ProfileChangeFlag, setProfileChangeFlag]=useState(false)
const [LogoChangeFlag, setLogoChangeFlag]=useState(false)

const [fileName, setFileName] = useState('')

    const {
        firstName,
        lastName,
        title,
        start,
        end,
        description,
        email,
        city,
        phone,
        address,
        logo,
        //password,
    } = registerFields

    const onChange = (e) => {
        setRegisterFields({
            ...registerFields,
            [e.target.name]: e.target.value
        })
        //console.log("in table",registerFields, e.target.value)
    setSaveAllow(false)
    setProfileChangeFlag(true)
    
    }

    const logoSelect = (e) => {
        console.log('11')
        setSaveAllow(false)
        setFileName(e.target.files[0].name)
        setlogoFields({
             logo: e.target.files[0]
        })
        setLogoChangeFlag(true)
        
    }

    const passChange = (e) => {
        setPassChangeFlag(true) 
         setNewPass({password: e.target.value})
         setSaveAllow(false)
 
 }

 const [errors, setErrors] = useState({})
 const validatefields = () => {
    setErrors({})

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const errs = {}

    if (firstName === '' || lastName === '') {
        errs.name = 'First Name and Last Name cannot be empty'
    }
    if (city === '') {
        errs.city = 'City cannot be empty'
    }
    if (address === '') {
        errs.address = 'Address cannot be empty'
    }
    if (!isNumeric(phone) || phone === '') {
        errs.phone = 'Invalid phone number'
    }

    if (!emailRegex.test(email)) {
        errs.email = 'Invalid email entered'
    }

    if (title === '') {
        errs.title = 'Title cannot be empty'
    }

    if (description === '') {
        errs.description = "Description cannot be empty"
    }

    if (end === '' || start === '') {
        errs.time = 'Start and End time cannot be empty'
    }

    console.log(errs)

    if (Object.keys(errs).length === 0) {
        //console.log('nn')
        return true;
    }

    setErrors({
        ...errs
    })


    return false

}
const [PassErrors, setPassErrors] = useState({})
 const validatepassword= () => {
     setPassErrors({})
     const errs = {}
     //console.log(`new password`,NewPass.password)
     if (NewPass.password === '' || NewPass.password === "" ) {
        //console.log(`reached here`)
        errs.password = 'Password cannot be empty'
    }

    if (Object.keys(errs).length === 0) {
        //console.log('nn')
        return true;
    }
    setPassErrors({
        ...errs
    })
    return false
    
 }








    const onSubmit = (e) => {
        e.preventDefault()
//         
//         //console.log(`in on submit`,registerFields)
 if(SaveAllow===false)
 {
    if(ProfileChangeFlag===true)
    {
        if(PassChangeFlag===true && LogoChangeFlag===true) //Profile,password and logo changed
        
        {
            if(validatefields()===true && validatepassword()===true) 
            {
                // setRegisterFields({
                //     ...registerFields, logo: null
                // })
                //console.log(registerFields)
                editprofile_chef(registerFields)
                passchange_chef(NewPass)
                editprofile_cheflogo(logoFields)

                setPassChangeFlag(false)
                setLogoChangeFlag(false)
                setProfileChangeFlag(false)
                //SEND LOGO CHANGE REQUEST
            }
    
 

        }
        else if (PassChangeFlag===true) //Profile and password changed
        {
            if(validatepassword()===true)
            {
                passchange_chef(NewPass)
                editprofile_chef(registerFields)

                
                setPassChangeFlag(false)
                setProfileChangeFlag(false)
            }
        }
        else if (LogoChangeFlag===true) //Profile and logo changed
        {
            //CAN VALIDATE LOGO HERE
            //SEND LOGO CHANGE 
            editprofile_chef(registerFields)
            editprofile_cheflogo(logoFields)

            setLogoChangeFlag(false)
            setProfileChangeFlag(false)
            

        }
        else { //Only profile changed

            if(validatefields()===true)
            {
                editprofile_chef(registerFields)  
                setProfileChangeFlag(false)   

            }

        }
    }
   else if(PassChangeFlag===true && validatepassword()===true)   //password and...
    {

        if(LogoChangeFlag===true) // password and logo change only CAN VALIDATE LOGO HERE
        {
        passchange_chef(NewPass)
        editprofile_cheflogo(logoFields)
        //editprofile_chef(registerFields)
        //SEND LOGO CHANGE
        setLogoChangeFlag(false)
        setPassChangeFlag(false)
        }
        else {
            console.log(`password only`)
            passchange_chef(NewPass)
            setPassChangeFlag(false)
        }
    }
    
    else if (LogoChangeFlag===true)
    { 
        console.log(`logo change only`)

        editprofile_cheflogo(logoFields)
        setLogoChangeFlag(false)

    }

//     if(PassChangeFlag===true)
//     {
//         if(validatepassword()===true)
//         {
//             console.log(NewPass)
//             passchange_chef(NewPass)
//         }

  }

        setSaveAllow(true)
       setNewPass('')
// }


    }



    //console.log(registerFields)
    return (
        <div className="container-fluid login-container">
        <div className="row justify-content-center pt-5">
            <div className="col-md-7 col-lg-5 col-sm-8">
                <div className="card login-card mb-4">

                    <div className="card-body">

                        <form className="m-4">

                            <h5 className="card-title text-center login-heading mt-3">Edit Profile</h5>
                            <div className="row justify-content-sm-center">
                                 {console.log(`Displaying logo`, profile.kitchen.logo)}
                                <img effect="blur" src={`../uploads/kitchen-logos/${profile.kitchen.logo}`} className="card-img-top upload-logo" alt="Logo" />  
                                </div>
                            <div className="col pt-2 justify-content-center">
                            
                                <div className="file-input2 text-center ">
                            <input type="file" accept="image/*" id="file" name='logo' className="file" onChange={logoSelect} />
                            <label className="text-center" htmlFor="file">
                                <img className="pe-1" src="/img/icons/upload.png" alt="" />
                                {`Upload Logo`}

                            </label>
                            
                        </div>
                        <div className="row pt-3 justify-content-center">
                        {fileName}
                        </div>
                        </div>

                        <div className="form-group m-1">
                                <label  className="login-field-headings">Kitchen Title</label>

                                 <div className="input-group">
                                <input type="email" onChange={onChange} className="form-control login-fields" name='title' defaultValue={title}
                                         /> 
                                  
                                <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>   
                            </div>
                            <span className='text-danger '>{errors.title}</span>
                            </div>


                            <div className="form-group row">
                                <div className="col m-1">
                                    <label className="login-field-headings">First Name</label>
                                    <div className="input-group">
                                    <input type="text" onChange={onChange} className="form-control login-fields" name='firstName' defaultValue={firstName}
                                         /> 
    <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>                         
</div>

                                </div>
                                <div className="col m-1">
                                    <label  className="login-field-headings">Last Name</label>

                                    <div className="input-group">
                                    <input type="text" onChange={onChange} className="form-control login-fields" name='lastName' defaultValue={lastName} />
                                    <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>   
                                    </div>
                                    


                                </div>
                                <span className='text-danger '>{errors.name}</span>
                            </div>
                            



                            <div className="form-group row">
                                <div className="col m-1">
                                    <label className="login-field-headings">From</label>
                                    <div className="input-group">
                                    <input type="time" onChange={onChange} className="form-control login-fields" name='start' defaultValue={start}
                                         /> 
                          
</div>

                                </div>
                                <div className="col m-1">
                                    <label  className="login-field-headings">Till</label>

                                    <div className="input-group">
                                    <input type="time" onChange={onChange} className="form-control login-fields" name='end' defaultValue={end} />
                                      
                                    </div>
                                    


                                </div>
                                <span className='text-danger '>{errors.time}</span>
                            </div>
                            

                            <div className="form-group m-1">
                                <label  className="login-field-headings">Description</label>

                                 <div className="input-group">
                                <input type="email" onChange={onChange} className="form-control login-fields" name='description' defaultValue={description}
                                         /> 
                                  
                                <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>   
                            </div>
                            <span className='text-danger '>{errors.description}</span>
                            </div>

                            
                            
                            <div className="form-group m-1">
                                <label  className="login-field-headings">Email</label>

                                 <div className="input-group">
                                <input type="email" onChange={onChange} className="form-control login-fields" name='email' defaultValue={email}
                                         /> 
                                  
                                <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span>   
                            </div>
                            <span className='text-danger '>{errors.email}</span>
                            </div>
                            <div className="form-group row">

                                <div className="col m-1">
                                    <label  className="login-field-headings">PhoneNumber</label>

                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon1">+92</span>
                                        <input type="text" onChange={onChange} className="form-control login-fields" name='phone' defaultValue={phone}/>
                                             <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span> 
                                     
                                    </div>
                                    <span className='text-danger '>{errors.phone}</span>
                                </div>
                                <div className="col m-1">

                                    <label  className="login-field-headings">City</label>
                                    <div className="input-group">
                                    <input type="text" onChange={onChange} className="form-control login-fields" name='city' defaultValue={city}/>
                                        <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span> 
                                    </div>
                                    <span className='text-danger '>{errors.city}</span>

                                </div>
                            </div>
                            <div className="form-group m-1 mb-3">
                                <label  className="login-field-headings">Address</label>
                                <div className="input-group">
                                <input type="text"  onChange={onChange} className="form-control login-fields" name='address' defaultValue={address}
                                   />
                                     <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span> 
                                </div>
                                <span className='text-danger '>{errors.address}</span>
                            </div>
                            <div className="form-group m-1 mb-3">
                                <label  className="login-field-headings">New Password</label>

                                 <div className="input-group">
                                <input type="password" onChange={passChange} className="form-control login-fields" name='password' defaultValue={NewPass}
                                   />
                                 <span className="input-group-text" id="basic-addon1"><img className="icon" src="/img/icons/editicon.png" alt="" /></span> 
                                </div>
                                <span className='text-danger ms-1'>{PassErrors.password}</span>
                            </div>
                        


                            <div className="row justify-content-center">
                                <div className="col-sm-6  col-md-4 m-1 d-flex justify-content-center">
                                <button type="submit" onClick={onSubmit} className="btn edit-form-btn" disabled={SaveAllow}>Save</button>
                            </div>
                                  <div className="col-sm-6  col-md-4 m-1 d-flex justify-content-center">
                                <button type="submit" className="btn edit-cancel-btn">Cancel</button>
                            </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )

}
const mapStatesToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      profile: state.auth.user ? state.auth.user.profile : null,
    };
  };
  
  export default connect(mapStatesToProps, {editprofile_chef,passchange_chef, editprofile_cheflogo})(EditProfileChef);