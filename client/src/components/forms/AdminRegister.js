import React, { Fragment,useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {registerAdmin } from '../../actions/auth'
import axios from 'axios'
const AdminRegister = ({ registerAdmin }) => {

    const [registerFields, setRegisterFields] = useState({
        
        email: '',
        password: '',
        phone: '03164125258',
        firstName :'ali',
        lastName : 'hassan'
       

    })
    
    
    const {
        email,
        password,
    } = registerFields

    const [errors, setErrors] = useState({})
    const [admins, setAdmins] = React.useState([])

    useEffect(async () => {
        try {
          const res = await axios.get('/api/admin/get-admins')
            console.log(res.data.admins)
             
          setAdmins(res.data.adminList)
    
        }
        catch (error) {
          console.log(error);       
        }    
      }, []
      )

    const validateInputs = () => {
        setErrors({})

        function isNumeric(str) {
            if (typeof str != "string") return false // we only process strings!  
            return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        }
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const errs = {}

       

        if (!emailRegex.test(email)) {
            errs.email = 'Invalid email entered'
        }

        if (password === '') {
            errs.password = 'Password cannot be empty'

        }


       


        console.log(errs)

        if (Object.keys(errs).length === 0) {
            console.log('nn')
            return true;
        }

        setErrors({
            ...errs
        })


        return false


    }

    const onChange = (e) => {
        console.log(e.target.value)
        setRegisterFields({
            ...registerFields,
            [e.target.name]: e.target.value
        })

    }

   

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(registerFields)

        if (validateInputs()) {
            
            registerAdmin(registerFields)
            
        }
    }

   


    return (

        <div className="container-fluid login-container">
        <div className="row justify-content-center pt-3">
            <div className="col-md-6 col-lg-4 pt-5 col-sm-8">
                
    
                    <div className = "col-sm">

                        <div className="card login-card">
                    
                        
                            <div className="card-body">

                               
                                <form onSubmit={onSubmit} className="m-4">

                                    <div className="row justify-content-center align-items-center pb-3">

                                        <li className="nav-item p-icon">
                                            <a className="admin-icon" href="#">
                                                <img className="" src="../img/icons/person.png" alt="" srcSet=""></img>
                                            </a>
                                        </li>
                                    <h5 className=" text-center pt-3">Add Admininstrator</h5>
                                    <div className="form-group row">
                                        <table id="example" className="table " >
                                        <thead>
                                            <tr>
                                                <th className="form-control">Emails of Admins</th>
                                                
                                             </tr>   
                
                                        </thead>

                                    {
                                        admins.map((admin,index)=>(
                                        <tbody>
                                            <tr>
                                                <td className="form-control">{admin.email}</td>
                                                
                                            </tr>
                                        </tbody>
                                        ))
                                    }
                                        </table>
                                        <div className="col m-1">
                                        <label className="login-field-headings">Email</label>
                                            <input onChange={onChange} className="form-control login-fields" name='email'
                                                placeholder="user@example.com" />
                                                    <span className='text-danger'>{errors.email}</span>
                                        </div>
                                        <div className="col m-1">
                                        <label className="login-field-headings">Password</label>
                                            <input type="password" onChange={onChange} className="form-control login-fields" name='password'
                                                aria-describedby="emailHelp" placeholder="">
                                                    </input>

                                        </div>
                                    </div>
                                    
                                </div>
                                    <div className="row justify-content-center">
                                        <button type="submit" className="btn save-btn">Add</button>
                                    </div>
                                    
                                </form>
                                

                            
                            </div>
                    
                        </div>


                    </div>
                   
        </div>
    </div>
</div>  
        

    )
}

export default connect(null, {  registerAdmin })(AdminRegister)
