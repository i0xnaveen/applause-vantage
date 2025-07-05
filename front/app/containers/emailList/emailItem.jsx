import React, { useEffect, useState } from 'react'
import { selectLoading } from './selectors'
import { getEmailByIdCache } from '../../services/emailCache'
import AiInput from '../AiInput/AiInput'
import { fetchEmailById } from './actions'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import linkifyHtml from 'linkify-html'
import './emailItem.css'

const EmailItem = ({ loading, fetchEmailById }) => {
  const { id } = useParams()
  const [email, setEmail] = useState(null)
  const [formattedBody, setFormattedBody] = useState('')
  const [isHtmlEmail, setIsHtmlEmail] = useState(false)

  useEffect(() => {
    const loadEmail = async () => {
      const cachedMail = await getEmailByIdCache(id) 
      if (cachedMail) {
        setEmail(cachedMail)
      } else {
        const fetched = await fetchEmailById(id)
        if (fetched?.payload) {
          setEmail(fetched.payload)
        }
      }
    }

    loadEmail()
  }, [id, fetchEmailById])

  useEffect(() => {
    if (email?.body) {
      const { body, contentType = 'text/plain' } = email

      if (contentType.includes('text/html')) {
        setIsHtmlEmail(true)
        setFormattedBody(
          DOMPurify.sanitize(body, {
            ADD_ATTR: ['target'],
            FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed'],
            FORBID_ATTR: ['onclick', 'onload', 'onerror'],
          }),
        )
      } else {
        setIsHtmlEmail(false)
        setFormattedBody(formatPlainTextEmail(body))
      }
    }
  }, [email])


  const formatPlainTextEmail = (text) => {
    let formatted = text

    formatted = linkifyHtml(formatted, {
      target: '_blank',
      rel: 'noopener noreferrer',
      defaultProtocol: 'https',
    })

    formatted = formatted.replace(/(\r\n|\r|\n)/g, '<br>')
    formatted = formatted.replace(/(<br\s?\/?>){2,}/g, '</p><p>')
    formatted = formatted.replace(/^(Subject:|From:|To:|Date:)/gim, '<strong>$1</strong>')
    formatted = formatted.replace(/\?[^\s"<>]+(?=["\s<>])/g, '')

    return DOMPurify.sanitize(`<div class="plaintext-email"><p>${formatted}</p></div>`, {
      ALLOWED_TAGS: ['p', 'br', 'a', 'strong', 'em', 'div'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    })
  }

  if (loading && !email) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!email) {
    return <div className="text-center text-gray-500">Email not found.</div>
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg pb-32">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{email.subject}</h1>
          <div className="email-border" />
          <div className="mt-2 text-sm text-gray-600">
            <p><strong>From:</strong> {email.from || email.sender}</p>
            <div className="email-border" />
          </div>
        </div>
        <div className={`email-body ${isHtmlEmail ? 'html-email' : 'plaintext-email'}`}>
          {formattedBody ? (
            <div dangerouslySetInnerHTML={{ __html: formattedBody }} />
          ) : (
            <p className="text-gray-500">No content available</p>
          )}
        </div>
  
        {email.attachments?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-medium text-gray-700 mb-2">Attachments</h3>
            <div className="flex flex-wrap gap-2">
              {email.attachments.map((att, index) => (
                <a
                  key={index}
                  href={att.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm flex items-center"
                >
                  📎 {att.filename}
                </a>
              ))}
            </div>
            
          </div>

        )}
        <div className="fixed bottom-0 left-0 w-full bg-white p-2 shadow-md">
          <AiInput selectedEmail={email} />
        </div>

      </div>
    </>
  )
  
}

const mapStateToProps = (state) => ({
  loading: selectLoading(state),
})

const mapDispatchToProps = {
  fetchEmailById,
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailItem)
