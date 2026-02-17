import React from 'react'

function Navbar() {
  return (
   <nav className="navbar navbar-expand-lg bg-dark text-light">
  <div className="container-fluid">
    <a className="navbar-brand text-info" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-info" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item text-info" href="#">Action</a></li>
            <li><a className="dropdown-item text-info" href="#">Another action</a></li>
            <li><a className="dropdown-item text-info" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar