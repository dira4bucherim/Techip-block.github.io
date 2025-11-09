import { h } from 'preact'
import { useState } from 'preact/hooks'
import { supabase } from './supabaseClient'
import Papa from 'papaparse'
import AuthForm from './components/AuthForm'
import UploadForm from './components/UploadForm'
import Preview from './components/Preview'

export default function App() {
  const [user, setUser] = useState(null)
  const onLogin = (u:any)=> setUser(u)
  return (
    <div>
      <h1>Wedding Envelope Generator</h1>
      {!user ? <AuthForm onLogin={onLogin}/> : <UploadForm user={user}/>}
      <Preview />
    </div>
  )
}
