import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComp = () => {
  return (
    <Alert pos={'fixed'}  >
        <AlertIcon/>
        Error While Fetching Data
    </Alert>
  )
}

export default ErrorComp