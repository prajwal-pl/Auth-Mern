import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Signin() {
  const [error, setErr] = useState(false)
  const [loading, setLoad] = useState(false)
  const [formData, setForm] = useState({})
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setForm({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      setLoad(true)
      setErr(false)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setLoad(false)
      if(data.success===false){
        setErr(true)
        return;
      }
      navigate('/')
    } catch (error) {
      setLoad(false)
      setErr(true)
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={handleChange} type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
        <input onChange={handleChange} type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Login In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
        <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something Went Wrong!'}</p>
    </div>
  )
}
