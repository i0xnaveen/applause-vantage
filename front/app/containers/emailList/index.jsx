import React, { useEffect, useState } from 'react'
import { selectLoading } from './selectors'
import { getEmailByIdCache } from '../../services/emailCache'
import { AiInput } from '../AiInput/AiInput'
import { fetchEmailById } from './actions'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import linkifyHtml from 'linkify-html'
import './emailItem.css'



