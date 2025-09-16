import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchEmails } from './actions'
import { getEmailsFromCache, saveEmailsToCache } from '../../services/emailCache'
import { selectEmails, selectLoading } from './selectors'
import './emailList.css'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'

const EmailList = ({ emails, loading, fetchEmails }) => {
  const navigate = useNavigate()

  const [email,setEmail] = useState(emails)
  
  useEffect(() => {
    const load = async () => {
      const cached = await getEmailsFromCache()
      if (cached?.length > 0) {
        setEmail(cached)
      } else {
        await fetchEmails()  
      }
    }
  
    load()
  }, [fetchEmails])
  
  useEffect(() => {
    if (emails.length > 0) {
      setEmail(emails)
      saveEmailsToCache(emails)  
    }
  }, [emails])
  

  return (
    <div className="glass-container">
      <h2 className="header">📧 Your Inbox</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" />
        </div>
      ) : (      <ul className="email-list">
        {email.map((email, i) => (
          <li
            className="email-item"
            key={i}
            onClick={() => navigate(`/emails/${email.id}`)}
          >
            <div className="email-from">{email.from}</div>
            <div className="email-subject">{email.subject}</div>
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  emails: selectEmails(state),
  loading: selectLoading(state),
})

const mapDispatchToProps = {
  fetchEmails,
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailList)
