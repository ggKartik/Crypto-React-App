import React from 'react'

import axios from 'axios'
import {server} from '../index'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, HStack, VStack,Image,Heading,Text, Button, RadioGroup, Radio} from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComp from './ErrorComp'
import CoinCard from './CoinCard'
import { useLocation } from 'react-router-dom'


const Coins = () => {

  const [coins,setCoins]= useState([]);
  const [loading,setLoading] =useState(true);
  const [error,setError] =useState(false);
  const [page,setPage] =useState(1);
  const [currrency,setCurrency] =useState("inr");

  const currencySymbol= currrency==='inr'?'₹':currrency==='eur'?'€':'$';

  const changePage = (page)=>{
    setPage(page);
    setLoading(true);
  }

  const btns  = new Array(10).fill(0); 
  useEffect(()=>{
    const fetchCoins=async ()=>{
      try {
        const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currrency}&page=${page}&per_page=50`);
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    };
    fetchCoins();
  },[currrency,page]);


  if(error){
    return <ErrorComp/>
  }
    return (
      <Container maxW={'container.xl'}>
        {loading?(<Loader/>):(
          <>
          <RadioGroup value={currrency} onChange={setCurrency} >
            <HStack justifyContent={'center'} p={'5'} spacing={'7'} >
              <Radio value={'inr'} >INR</Radio>
              <Radio value={'eur'} >EUR</Radio>
              <Radio value={'usd'} >USD</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={'wrap'} justifyContent={'space-evenly'} m={'16'} >
            {coins.map((i)=>(
              <CoinCard key={i.id} id={i.id} name={i.name} symbol={i.symbol} img={i.image} price={i.current_price} currencySymbol={currencySymbol}/>
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




export default Coins