import React, { useEffect, useRef } from 'react'
import SearchPage from './SearchPage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConversations } from '../../ReduxToolkit/Reducers/ConversationMSG'

function ContentPage() {
  const dispatch = useDispatch()
  const { current, status, error } = useSelector(state => state.ConversationMessages)
  const { history, status: sendStatus } = useSelector(state => state.inputsending)
  const bottomRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, current])

  // Load latest conversation on mount
  useEffect(() => {
    const conversationId = localStorage.getItem('conversation_id')
    if (conversationId) {
      dispatch(fetchConversations(conversationId))
    }
  }, [dispatch])

  // Combine saved messages (from DB) with new unsaved ones (from Redux history)
  const savedMessages = current?.messages || []
  const pendingMessages = history || []
 
  const isEmpty = savedMessages.length === 0 && pendingMessages.length === 0

  return (
    <div className='h-100 overflow-auto custom-scrollbar'>

      {/* Messages area */}
      <div
        className='container d-flex flex-column gap-3 py-4'
        style={{ paddingBottom: '100px' }}  // space for fixed SearchPage
      >

        {/* Loading state */}
        {status === 'loading' && (
          <div className='text-center text-muted mt-5'>
            <div className='spinner-border spinner-border-sm me-2' />
            Loading conversation...
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className='alert alert-danger mx-auto' style={{ maxWidth: '500px' }}>
            Failed to load conversation: {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}

        {/* Empty state */}
        {isEmpty && status !== 'loading' && (
          <div className='text-center text-muted mt-5'>
            <h5>Start a conversation</h5>
            <p>Ask anything below to get started.</p>
          </div>
        )}

        {/* Saved messages from DB */}
        {savedMessages.map((msg) => (
          <React.Fragment key={msg.id}>
            {/* User message */}
            {msg.input_text && (
              <div className='d-flex justify-content-end'>
                <div
                  className='card shadow-sm'
                  style={{ maxWidth: '60%', background: '#e8f4fd', border: '1px solid #bee3f8' }}
                >
                  <div className='card-body py-2 px-3'>
                    {msg.input_audio && (
                      <div className='mb-1 text-muted' style={{ fontSize: '12px' }}>
                        🎤 Audio attached
                      </div>
                    )}
                    {msg.input_file && (
                      <div className='mb-1 text-muted' style={{ fontSize: '12px' }}>
                        📎 File attached
                      </div>
                    )}
                    <p className='mb-0'>{msg.input_text}</p>
                    <div className='text-muted text-end' style={{ fontSize: '11px' }}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI response */}
            {msg.output_text && (
              <div className='d-flex justify-content-start'>
                <div
                  className='card shadow-sm'
                  style={{ maxWidth: '70%', background: '#ffffff', border: '1px solid #e2e8f0' }}
                >
                  <div className='card-body py-2 px-3'>
                    <div
                      style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}
                    >
                      {msg.output_text}
                    </div>
                    <div className='text-muted' style={{ fontSize: '11px' }}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}

        {/* New messages from Redux (not yet reloaded from DB) */}
        {pendingMessages.map((item, index) => (
          <React.Fragment key={`pending-${index}`}>
            {/* User message */}
            <div className='d-flex justify-content-end'>
              <div
                className='card shadow-sm'
                style={{ maxWidth: '60%', background: '#e8f4fd', border: '1px solid #bee3f8' }}
              >
                <div className='card-body py-2 px-3'>
                  {item.request?.hasAudio && (
                    <div className='mb-1 text-muted' style={{ fontSize: '12px' }}>🎤 Audio attached</div>
                  )}
                  {item.request?.hasFile && (
                    <div className='mb-1 text-muted' style={{ fontSize: '12px' }}>📎 File attached</div>
                  )}
                  <p className='mb-0'>{item.request?.text}</p>
                </div>
              </div>
            </div>

            {/* AI response */}
            <div className='d-flex justify-content-start'>
              <div
                className='card shadow-sm'
                style={{ maxWidth: '70%', background: '#ffffff', border: '1px solid #e2e8f0' }}
              >
                <div className='card-body py-2 px-3'>
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {item.response?.result}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* Sending indicator */}
        {sendStatus === 'loading' && (
          <div className='d-flex justify-content-start'>
            <div
              className='card shadow-sm'
              style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
            >
              <div className='card-body py-2 px-3 text-muted'>
                <span className='spinner-border spinner-border-sm me-2' />
                Thinking...
              </div>
            </div>
          </div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Fixed search bar at bottom */}
  
    </div>
  )
}

export default ContentPage