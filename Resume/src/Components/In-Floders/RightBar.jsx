import React from 'react'
import Navbar from './Navbar'
import ContentPage from './ContentPage'
import SearchPage from './SearchPage';


function RightBar() {
  return (
    <div className="h-100 d-flex flex-column overflow-hidden bg-light mb-4">
      {/* FIXED NAVBAR - Always visible */}
      <Navbar />
      
     
      
      {/* SCROLLABLE CONTENT ONLY */}
      <div className="flex-grow-1 overflow-auto p-5">
        <ContentPage />
      </div>
      
      {/* BOTTOM SEARCH BAR - Fixed */}
      <div className="border-top bg-white shadow-sm mt-5 ">
        <div className="container py-2">
          <SearchPage />
        </div>
      </div>
    </div>
  );
}
export default RightBar