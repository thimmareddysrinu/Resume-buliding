import React,{useState,useEffect} from 'react'
import './Login.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {Loginbackend} from '../../ReduxToolkit/Reducers/Account-authentication/LoginReducer'



function Login() {
   const navigate=useNavigate()
   const location=useLocation()
   const [input, setinput] = useState({
    "phone_number":'',
    "password":"",
   
  })
  const dispatch=useDispatch()
  
  
   const InputChange = (e) => {
 
    const { name, value } = e.target;
    setinput((prevInput) => ({ ...prevInput, [name]: value }));
  };
  //  useEffect(() => {
  //   if (location.state?.phone_number) {
  //     setinput(prev => ({ 
  //       ...prev, 
  //       phone_number: location.state.phone_number  // ✅ Update only phone_number
  //     }));
  //   }
  // }, [location.state?.phone_number]);
useEffect(() => {
  if (location.state?.phone_number) {
    setinput(prev => ({
      ...prev,
      phone_number: location.state.phone_number
    }));
  }
}, [location.state]);
 
 const onSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = await dispatch(Loginbackend(input)).unwrap();

    console.log("Login success:", result);
    localStorage.setItem("user", JSON.stringify(result));

   localStorage.setItem("user", JSON.stringify(result));
    
    // Store individual fields correctly
    localStorage.setItem("phone_number", result.phone_number);  // ✅ Access the property
    localStorage.setItem("id", result.id);  // ✅ Access the id property
  // home page
   
    navigate("/");
  } catch (error) {
    console.log("Login failed:", error);
    alert(error);
  }
};

  return (
   <div className="container mt-5">
	<div className="d-flex justify-content-center h-auto">
		<div className="card bg-dark p-5">
			<div className="card-header text-center">
				<h3 style={{'color':'#0bdde9'}}>Log In</h3>
				
			</div>
			<div className="card-body">
				<form className='gap-4' onSubmit={onSubmit}>
					<div className="input-group form-group  pb-5 gap-2">
						<div className="input-group-prepend">
							<span className="input-group-text" style={{"backgroundColor":"#12d9f4f4"}}><PhoneIcon/></span>
						</div>
						<input  type="tel"
  name="phone_number"
  maxLength='10'
  autoComplete='tel'
  className="form-control" required value={input.phone_number} onChange={InputChange} placeholder="PhoneNumber"/>
						
					</div>
					<div className="input-group form-group  pb-5 gap-2">
						<div className="input-group-prepend">
							<span className="input-group-text" style={{"backgroundColor":"#12d9f4f4"}}><PasswordIcon style={{}}/></span>
						</div>
						<input type="password" required  autoComplete="new-password"  className="form-control" name='password' value={input.password} onChange={InputChange} placeholder="password"/>
					</div>
          
					
					<div className="form-group ">
						<input type="submit" value="Login" className="btn w-100 " style={{"backgroundColor":"#1addf3fa"}}/>
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
					Don't have an account?<Link to='/signup' className='link link-underline  link-underline-opacity-0' href="#">Sign Up</Link>
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

export default Login