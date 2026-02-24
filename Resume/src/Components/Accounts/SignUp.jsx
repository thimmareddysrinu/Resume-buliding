import React,{useState} from 'react'
import './Login.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { Registerbackend } from '../../ReduxToolkit/Reducers/Account-authentication/SignupReducer'

function SignUp() {
  const [input, setinput] = useState({
    "phone_number":"",
    "password":"",
    "confirm_password":""
  })
   const navigate=useNavigate()
   const dispatch=useDispatch()
     
   const InputChange = (e) => {
 
    const { name, value } = e.target;
    setinput((prevInput) => ({ ...prevInput, [name]: value }));
  };

 
 const onSubmit = async (e) => {
  e.preventDefault();

  console.log('Form Data:', input);

  if (input.password !== input.confirm_password) {
    alert('Passwords do not match!');
    return;
  }

  if (input.phone_number.length !== 10) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }

  try {
    // wait for backend response
    const result = await dispatch(Registerbackend(input)).unwrap();

    console.log("Register success:", result);

    // clear form
    setinput({
      phone_number: "",
      password: "",
      confirm_password: ""
    });

    // navigate ONLY after success
    navigate('/otpverify', {
      state: {
        phone_number: input.phone_number
      }
    });

  } catch (error) {
    console.log("Register failed:", error);
    alert(error);
  }
};

  return (
   <div className="container mt-5">
	<div className="d-flex justify-content-center h-auto">
		<div className="card bg-dark p-5">
			<div className="card-header text-center">
				<h3 style={{'color':'#0bdde9'}}>Sign In</h3>
				
			</div>
			<div className="card-body">
				<form className='gap-4' onSubmit={onSubmit}>
					<div className="input-group form-group  pb-5 gap-2">
						<div className="input-group-prepend">
							<span className="input-group-text" style={{"backgroundColor":"#12d9f4f4"}}><PhoneIcon/></span>
						</div>
						<input  type="tel" maxLength='10'
  name="phone_number"
  autoComplete='tel'
  className="form-control" required value={input.phone_number} onChange={InputChange} placeholder="PhoneNumber"/>
						
					</div>
					<div className="input-group form-group  pb-5 gap-2">
						<div className="input-group-prepend">
							<span className="input-group-text" style={{"backgroundColor":"#12d9f4f4"}}><PasswordIcon style={{}}/></span>
						</div>
						<input type="password" required  autoComplete="new-password"  className="form-control" name='password' value={input.password} onChange={InputChange} placeholder="password"/>
					</div>
          <div className="input-group form-group pb-2 gap-2">
						<div className="input-group-prepend">
							<span className="input-group-text"  style={{"backgroundColor":"#f43412f4"}}><PasswordIcon/></span>
						</div>
						<input type="password" required  autoComplete="new-password"  className="form-control" name='confirm_password' value={input.confirm_password} onChange={InputChange} placeholder="Confirum password"/>
					</div>
					<div className="align-items-start remember">
						<input required type="checkbox"/>Remember Me
					</div>
					<div className="form-group ">
						<input type="submit" value="Signin" className="btn w-100 " style={{"backgroundColor":"#1addf3fa"}}/>
					</div>
				</form>
			</div>
			<div className="card-footer">
       <div className=" gap-1 bg-transparent al" style={{"color":"white"}}>
				<ul className='list-group d-flex flex-row gap-3 justify-content-center'>
          <li className='list-group-item p-0' style={{'backgroundColor':'#166ad8da'}}>
            <Link><FacebookIcon className='fs-2' style={{"color":"#e7eaee",'width':"100%"}}/></Link>
            
          </li>
         <li className='list-group-item p-0' style={{'backgroundColor':'#f35b0fda'}}>
            <Link><EmailIcon className='fs-2' style={{"color":"#e7eaee",'width':"100%"}}/></Link>
            
          </li>
        </ul>
				</div>

				<div className="d-flex justify-content-center links gap-1" style={{"color":"white"}}>
				Already have an account?<Link to='/login' className='link link-underline  link-underline-opacity-0' href="#">Sign Up</Link>
				</div>
				<div className="d-flex justify-content-center">
					<a className='link link-underline link-underline-opacity' href="#">Forgot your password?</a>
				</div>
			</div>
		</div>
	</div>
</div>
  )
}

export default SignUp;