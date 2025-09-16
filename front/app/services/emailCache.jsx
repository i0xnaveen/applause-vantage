import localforage from 'localforage'

const emailStore = localforage.createInstance({
  name: 'gmail-clone',
  storeName: 'emails',

})

export const saveEmailsToCache = async (emails) => {
  await emailStore.setItem('emailList', emails)
}

export const getEmailsFromCache = async () => await emailStore.getItem('emailList')

export const getEmailByIdCache = async (id) =>{
  const allEmails = await getEmailsFromCache()
  const email = allEmails.find((email)=> email.id === id)
  return email
}
export const clearEmailCache = async () => {
  await emailStore.removeItem('emailList')
}
