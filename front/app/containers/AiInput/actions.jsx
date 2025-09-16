import { AI_INPUT_MAIL, AI_INPUT_REFINE_MAIL } from "./constant"

export const aiInputMail = (value) => ({type: AI_INPUT_MAIL.START, payload:value})
export const aiInputMailSuccess = (content) => { 
    console.log("The content is ",content);
    return {
    type: AI_INPUT_MAIL.SUCCESS, payload:content 
}}
export const aiInputMailFailure = () => ({ type: AI_INPUT_MAIL.ERROR })
export const aiInputRefineMail = (value) => ({ type: AI_INPUT_REFINE_MAIL.START, payload: value})
