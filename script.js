import { supabase } from './supabaseClient'

const email = document.getElementById('email') as HTMLInputElement
const password = document.getElementById('password') as HTMLInputElement
const signup = document.getElementById('signup')!
const login = document.getElementById('login')!
const uploadSection = document.getElementById('upload-section')!
const csvFile = document.getElementById('csvFile') as HTMLInputElement
const envelopeSize = document.getElementById('envelopeSize') as HTMLSelectElement
const includeReturn = document.getElementById('includeReturn') as HTMLInputElement
const uploadBtn = document.getElementById('uploadBtn')!
const status = document.getElementById('status')!

signup.addEventListener('click', async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
  status.textContent = error ? error.message : 'Signed up!'
})

login.addEventListener('click', async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    status.textContent = error.message
  } else {
    status.textContent = 'Logged in!'
    uploadSection.style.display = 'block'
  }
})

uploadBtn.addEventListener('click', async () => {
  const file = csvFile.files?.[0]
  if (!file) return (status.textContent = 'Please select a CSV file.')

  const filePath = `uploads/${Date.now()}-${file.name}`
  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(filePath, file)
  if (uploadError) return (status.textContent = 'Upload failed.')

  const session = await supabase.auth.getSession()
  const token = session.data.session?.access_token

  const res = await fetch(
    'https://ykkdjrptxixjyxwncpgb.functions.supabase.co/upload-addresses',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file_path: filePath,
        envelope_size: envelopeSize.value,
        include_return: includeReturn.checked,
      }),
    }
  )
  const result = await res.json()
  status.textContent = result.success
    ? 'Envelope job created!'
    : 'Something went wrong.'
})