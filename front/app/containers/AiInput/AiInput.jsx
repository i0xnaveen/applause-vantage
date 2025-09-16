import { connect } from 'react-redux'
import { aiInputMail, aiInputRefineMail } from './actions'
import React, { useState, useRef, useEffect } from 'react'


const AiInput = ({ selectedEmail, aiContent, aiInputMail, aiInputRefineMail, isLoading }) => {

  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight  }px`
    }
  }, [value])

  useEffect(() => {
    if (aiContent && Object.keys(aiContent).length > 0) {
      console.log('AI Respon receved:', aiContent)
      
      const { body } = aiContent.aiContent
      setValue(body)     
    }
  }, [aiContent])

  useEffect(() => {
    if (isLoading) {
    }
  }, [isLoading])

  const handleSubmit = () => {
    selectedEmail.inputFromUser = value
    aiInputMail(selectedEmail)
  }

  const handleRefineSubmit = () =>{
    selectedEmail.RefineContent = value
    aiInputRefineMail(selectedEmail)

  }
  return (
    <div className="flex items-end p-2 rounded-lg bg-gray-50">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What you want to do..."
        className="flex-grow resize-none border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          maxHeight: '120px',
          overflowY: 'auto',
        }}
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="ml-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
      >
        ➤
      </button>
      <button
        type="button"
        onClick={handleRefineSubmit}
        disabled={aiContent}
        className={`ml-2 p-2 rounded-lg text-white ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
      ✎
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  aiContent: state
})

const mapDispatchToProps = {
  aiInputMail,
  aiInputRefineMail,
}

export default connect(mapStateToProps, mapDispatchToProps)(AiInput)
