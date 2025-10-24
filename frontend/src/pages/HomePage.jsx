import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { useStreamChat } from '../hooks/useStreamChat'

const HomePage = () => {
  const { chatClient, isLoading, error } = useStreamChat()
  return (
    <div >
        <UserButton/>
        HomePage
    </div>
  )
}

export default HomePage