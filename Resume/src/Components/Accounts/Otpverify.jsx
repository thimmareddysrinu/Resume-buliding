import React from 'react'
import {useState,useEffect} from 'react'
import './Login.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { VerifyOtpbackend} from '../../ReduxToolkit/Reducers/Account-authentication/VerifyOtp'
function Otpverify() {
 
  const [input, setinput] = useState({
     "phone_number":"",
     "otp":""
     
   })
    const dispatch=useDispatch()
     
    const navigate=useNavigate()
     const location=useLocation()
    const InputChange = (e) => {
  
     const { name, value } = e.target;
     setinput((prevInput) => ({ ...prevInput, [name]: value }));
   };
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
    const result = await dispatch(VerifyOtpbackend(input)).unwrap();

    console.log("Verification  success:", result);

    // clear form
    setinput({
      phone_number: "",
      otp: "",
      
    });

    // navigate ONLY after success
    navigate('/login', {
      state: {
        phone_number: input.phone_number
      }
    });

  } catch (error) {
    console.log("Otp verification  failed:", error);
    alert(error);
  }
};

  return (
   <div className="container mt-5">
	<div className="d-flex justify-content-center h-auto">
		<div className="card bg-dark p-5">
			<div className="card-header text-center">
				<h3 style={{'color':'#0bdde9'}}>Verify Otp</h3>
				
			</div>
			<div className="card-body">
				<form className='gap-4' onSubmit={onSubmit}>
					<div className="input-group form-group  pb-5 gap-2">
						<div className="input-group-prepend">
							<span className="input-group-text" style={{"backgroundColor":"#12d9f4f4"}}><PhoneIcon/></span>
						</div>
						<input  type="tel"
  name="phone_number"
  autoComplete='tel'
  className="form-control" required value={input.phone_number} onChange={InputChange} placeholder="PhoneNumber"  maxLength='10' />
						
					</div>
					<div className="input-group form-group  pb-5 gap-2">
						<div className="input-group-prepend">
							<span className="input-group-text" style={{"backgroundColor":"#12d9f4f4"}}><PasswordIcon style={{}}/></span>
						</div>
						<input type="tel" required  autoComplete="otp"  className="form-control" name='otp' value={input.otp} onChange={InputChange} placeholder="6 digits OTP" minLength='6' maxLength='6'/>
					</div>
          
					
					<div className="form-group ">
						<input type="submit" value="Verify OTP" className="btn w-100 " style={{"backgroundColor":"#1addf3fa"}}/>
					</div>
				</form>
			</div>
			<div className="card-footer">
       

				<div className="d-flex justify-content-center links gap-1" style={{"color":"white"}}>
					Don't have an account?<Link to='/signup' className='link link-underline  link-underline-opacity-0' href="#">Sign Up</Link>
				</div>
				
			</div>
		</div>
	</div>
</div>
  )
}

export default Otpverify