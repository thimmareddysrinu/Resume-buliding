import React, { useState } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MicIcon from '@mui/icons-material/Mic';
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentInput,searching} from '../../ReduxToolkit/Reducers/Inputsending'



function SearchPage() {
  const dispatch=useDispatch()
 
  const [SearchQuery, setSearchQuery] = useState({
    "audio": null,
    "text": "",
    "file": null,
  });




 const handlechange = (e) => {
  console.log("🎯 RAW EVENT:", e.target.files);  // Add this!
  
  const { name, value, files } = e.target;
  if (files && files[0]) {
    console.log("✅ FILE SELECTED:", files[0].name, files[0].size);
    setSearchQuery(prev => ({ ...prev, [name]: files[0] }));
  } else {
    setSearchQuery(prev => ({ ...prev, [name]: value }));
  }
};

const onsubmit = async (e) => {
  e.preventDefault();
  
  // ✅ CAPTURE DATA FIRST (before it changes)
  const dataToSend = { ...SearchQuery };
  console.log("🚀 CAPTURED:", dataToSend);
  
  // ✅ DISPATCH with captured data
   dispatch(searching(dataToSend));
  
  // ✅ Reset AFTER dispatch completes
  setSearchQuery({ audio: null, text: "", file: null });
};





  return (
    <form onSubmit={onsubmit}>
      <div
        className="position-fixed bottom-0 start-50 translate-middle-x mb-4 d-flex align-items-center"
        style={{ height: '56px', width: 'min(90vw, 800px)' }}
      >
        
        <div className="w-100 d-flex border border-secondary-subtle rounded-pill shadow-sm bg-white overflow-hidden">
       
          <div className="p-3 bg-light">
            <label htmlFor='file-input'>
              <ControlPointIcon style={{ fontSize: '30px' }} />

            </label>

          </div>


          <input
            className="form-control border-0 px-3 py-2 fs-6 fw-medium"
            type="text"
            name='text'
            placeholder="Ask anything..."
            value={SearchQuery.text}
            onChange={handlechange}
            style={{ outline: 'none', boxShadow: 'none' }}
          />
          <input
           
            type="file"
            name="file"
            id="file-input"
            accept=".pdf,.doc,.docx,.txt,image/*"

            onChange={handlechange}
            style={{ "display": "none" }}
          />
          <input
            
            type="file"
            name="audio"
            id="audio-input"
            accept="audio/*"
            capture='microphone'

            onChange={handlechange}
            style={{ "display": "none" }}
          />


          <label htmlFor='audio-input'

            className="btn btn-link p-2 text-decoration-none"
            style={{ color: '#181d1e' }}
          >
            <MicIcon style={{ color: '#17b6e2', fontSize: '30px' }} />
          </label>
          <button type='submit'

            className="btn btn-link p-3 text-decoration-none"
            style={{}}
          >
            <ArrowCircleUpIcon style={{ color: '#020202', fontSize: '30px', borderColor: 'red' }} />
          </button>
        </div>
      </div>


    </form>

  );
}

export default SearchPage;
