import React from 'react'
import SideBar from './In-Floders/SideBar'
import RightBar from './In-Floders/RightBar'

function Allcall() {
  return (
    <div className="container-fluid h-100 vh-100 p-0 overflow-hidden">
      <div className="row g-0 h-100">
        {/* Sidebar Column - Has own scrollbar */}
        <div className="col-12 col-md-2 col-lg-2 d-none d-md-block h-100 p-0">
          <SideBar />
        </div>
        {/* Rightbar Column - Has own scrollbar */}
        <div className="col-12 col-md-10 col-lg-10 h-100 p-0">
          <RightBar />
        </div>
      </div>
    </div>
  );
}


export default Allcall;