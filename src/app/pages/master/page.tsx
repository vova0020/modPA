import Navbar from '@/app/components/navbar'
import StanokBlock from '@/app/components/stanokBlock'
import React from 'react'



export default function Master() {
  return (
    <div><Navbar />
      <div style={{ padding: '10px', width: '100%' }}><StanokBlock /></div>
    </div>

  )
}