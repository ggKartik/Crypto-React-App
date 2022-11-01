import React from 'react'
import {Link} from 'react-router-dom'
import {Text,Heading,VStack,HStack,Stack,Image} from '@chakra-ui/react'
const CoinCard = ({id,name,symbol,img,price,currencySymbol="₹"}) =>(
    <Link to={`/coin/${id}`}>
      <VStack w={'40'} shadow={'xl'} p={'8'} borderRadius={'lg'} transition={'all 0.4'} m={'4'} css={{
        "&:hover":{
          transform:"scale(1.1)"
        }
      }} >
  
        <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt={'excahnge'}/>
        <Heading size={'md'} noOfLines={'1'} >{symbol}</Heading>
        <Text noOfLines={'1'}>{name}</Text>
        <Text noOfLines={'1'}>{price?`${currencySymbol}${price}`:"NA"}</Text>
      </VStack> 
      </Link>
  )

export default CoinCard