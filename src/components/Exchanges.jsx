import React from 'react'
import axios from 'axios'
import {server} from '../index'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, HStack, VStack,Image,Heading,Text,Button} from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComp from './ErrorComp'
const Exchanges = () => {

  const [exchanges,setExchanges]= useState([]);
  const [loading,setLoading] =useState(true);
  const [error,setError] =useState(false);
  const [page,setPage] =useState(1);

  const btns  = new Array(10).fill(0); 

  const changePage = (page)=>{
    setPage(page);
    setLoading(true);
  }

  useEffect(()=>{
    const fetchExchanges=async ()=>{
      try {
        const {data}=await axios.get(`${server}/exchanges?per_page=51`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    };
    fetchExchanges();
  },[]);

  if(error){
    return <ErrorComp/>
  }
    return (
      <Container maxW={'container.xl'}>
        {loading?(<Loader/>):(
          <>  
          <HStack wrap={'wrap'} justifyContent={'space-evenly'} m={'16'} >
            {exchanges.map((i)=>(
              <ExchangeCard key={i.id} name={i.name} img={i.image} url={i.url} rank={i.trust_score_rank}/>
              // <div>{i.rank}</div>
            ))}
          </HStack>
          <HStack overflowX={'auto'} w={'full'} justifyContent={'center'} marginTop={'-10'} marginBottom={'5'} >
            {btns.map((i,index)=>(
              <Button variant={'unstyled'} bgColor={'black'} color={'white'} onClick={()=>changePage(index+1)}>{index+1}</Button>
            ))}
          </HStack>
          </>
        )}
      </Container>
  );
}

const ExchangeCard = ({name,img,url,rank}) =>(
  <a href={url} target={'blank'}>
    <VStack w={'40'} shadow={'xl'} p={'8'} borderRadius={'lg'} transition={'all 0.4'} m={'4'} css={{
      "&:hover":{
        transform:"scale(1.1)"
      }
    }} >

      <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt={'excahnge'}/>
      <Heading size={'md'} noOfLines={'1'} >{rank}</Heading>
      <Text noOfLines={'1'}>{name}</Text>
    </VStack> 
  </a>
)

export default Exchanges