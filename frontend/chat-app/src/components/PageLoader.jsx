import React from 'react'
import {LoaderIcon} from "lucide-react"
function PageLoader() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <LoaderIcon className='animate-spin ' size={40}/>
    </div>
  )
}

export default PageLoader