
import React,{useEffect} from 'react';

import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import TranslateIcon from '@mui/icons-material/Translate';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentInput,searching} from '../../ReduxToolkit/Reducers/Inputsending'
import { fetchConversations } from '../../ReduxToolkit/Reducers/ConversationMSG';

function SideBar() {
  const user=JSON.parse(localStorage.getItem("user"))
   const dispatch=useDispatch()
 useEffect(() => {
   if (user){
    dispatch(fetchConversations())
   }
 
 
 }, [dispatch,user])
 
   const handleclick=(id)=>{
    localStorage.setItem("conversation_id",id)
    dispatch(fetchConversations(id))

   }
  

  const currentinput=useSelector((state)=>
    (state.inputsending.currentInput))
  const {conversations,current}=useSelector((state)=>(
    state.ConversationMessages
  ))



  const selectTool=(tool)=>{
  dispatch(setCurrentInput(tool))

}
  return (
    <div className='d-flex flex-column bg-dark text-white h-100 overflow-hidden'>
      {/* Fixed Header - CONTAINED in sidebar, not page-wide */}
      <div className="border-bottom position-sticky top-0 ps-2 pt-3 pb-2 z-3 bg-dark">
        <h1 className="mb-0 fs-3">
          <i className="bi bi-bluesky" style={{color: "#22cce2"}}></i>
        </h1>
      </div>

      {/* Scrollable Content - Perfect scrollbar */}
      <div className="flex-grow-1 overflow-auto px-3 py-3">
        <ul className="list-unstyled mb-4">
         
          <li className="mb-1 p-2 ">
            <i className="bi bi-plus-circle-fill me-2"></i>New Chat
          </li>
          <li className="mb-1 p-2 ">
            <i className="bi bi-search me-2"></i>Search Chats
          </li>
          <li className="mb-1 p-2">
            <i className="bi bi-folder-fill me-2"></i>Projects
          </li>
          <li className="mb-1 p-2 ">
            <i className="bi bi-grid-3x3-gap-fill me-2"></i>Apps
          </li>
        </ul>

        <h6 className="ps-2 mb-3 text-info fw-bold">GPT's</h6>
        <ul className="list-unstyled mb-4">
        
          
           <li
            className={`p-2 ${currentinput==="imagegenerate" ? "bg-info text-dark rounded" : ""}`}
            onClick={() => selectTool("imagegenerate")}
            style={{cursor:"pointer"}}
          >
            <i className="bi bi-images pe-2 fs-5"></i>
            Image Generator
          </li>
            <li
            className={`p-2 ${currentinput==="voicetotext" ? "bg-info text-dark rounded" : ""}`}
            onClick={() => selectTool("voicetotext")}
            style={{cursor:"pointer"}}
          >
            <KeyboardVoiceIcon className='pe-2 fs-2'/>
            Voice To Text</li>
            <li
            className={`p-2 ${currentinput==="translator" ? "bg-info text-dark rounded" : ""}`}
            onClick={() => selectTool("translator")}
            style={{cursor:"pointer"}}
          ><TranslateIcon className='pe-2 fs-2'/>Language Translator</li>
          <li
            className={`p-2 ${currentinput==="resume_builder" ? "bg-info text-dark rounded" : ""}`}
            onClick={() => selectTool("resume_builder")}
            style={{cursor:"pointer"}}
          ><FilePresentIcon className='pe-2 fs-2'/>Resume Builder</li>
        </ul>

          {user && (
          <>
            <h6 className="ps-2 mb-3 fw-bold text-info">
              Your Chat History
            </h6>

            <ul className="list-unstyled">

              {conversations && conversations.length > 0 ? (
                conversations.map((conv) => (
                  <li
                    key={conv.id}
                    onClick={() => handleConversationClick(conv.id)}
                    className={`mb-2 p-2 rounded ${
                      current?.id === conv.id
                        ? "bg-info text-dark"
                        : "bg-secondary bg-opacity-25"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {conv.title || `Chat ${conv.id}`}
                  </li>
                ))
              ) : (
                <li className="text-muted p-2">
                  No conversations yet
                </li>
              )}

            </ul>
          </>
        )}
   

   
        
      </div>
    </div>
  );
}


export default SideBar