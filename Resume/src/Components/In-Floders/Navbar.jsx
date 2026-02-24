import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Navbar() {


  const user=JSON.parse(localStorage.getItem("user"))


  
  return (
   <nav className="navbar navbar-expand-lg bg-dark text-light">
  <div className="container-fluid">
    <a className="navbar-brand text-info d-none d-lg-block " href="#"></a>
      
        <a className="navbar-brand text-info d-lg-none d-md-block " href="#"> 
          <i className="bi bi-bluesky" style={{color: "#22cce2"}}></i>
        </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <MenuIcon style={{"color":"#2c9ba1d0"}}/>
     
    </button>
    <div className="collapse navbar-collapse me-2 me-md-1" id="navbarNavDropdown">
      {user?

       <ul className="navbar-nav ms-auto">
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-info"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <AccountCircleIcon/>{user.first_name}
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item text-info" to="/profile">profile</Link></li>
            <li><button className="dropdown-item text-info" >Logout</button></li>
            
          </ul>
        </li>
      </ul>:
       <ul className="navbar-nav ms-auto">
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-info"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <AccountCircleIcon/>
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item text-info" to="/login">Login</Link></li>
            <li><Link className="dropdown-item text-info" href="/signup">SignUp</Link></li>
            
          </ul>
        </li>
      </ul>
      }
     
    
    </div>
  </div>
   </nav>
  )
}

export default Navbar