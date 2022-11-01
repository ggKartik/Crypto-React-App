import { Container, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {PropagateLoader} from 'react-spinners'
const Loader = () => {
  return (
    <VStack h={'90vh'} justifyContent={'center'} >
        <PropagateLoader color="#000000" />
    </VStack>
  )
}

export default Loader