import { Box,Image,Text } from '@chakra-ui/react'
import React from 'react'
import btcimg from '../assets/btc.png'
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}  >
      <motion.div
        style={{
          height: "75vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          src={btcimg}
        />
      </motion.div>

      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'white'} mt={'-10'} >
        C-react-ypto
      </Text>
    </Box>
  )
}

export default Home