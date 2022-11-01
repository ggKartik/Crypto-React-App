import { Box, Button, Container, HStack, Radio, RadioGroup, VStack,Text,Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { server } from '..';
import ErrorComp from './ErrorComp';
import Loader from './Loader';
import ChartComp from './ChartComp'

const CoinsDetails = () => {

  const [coin,setCoin]= useState({});
  const [loading,setLoading] =useState(true);
  const [error,setError] =useState(false);
  const [currrency,setCurrency] =useState("inr");
  const [days,setDays] =useState("24H");
  const [chartArray,setChartArray] =useState([]);

  const params=useParams();

  const btns = ['24H','7d','14d','30d','6m','1y','Max'];

  const currencySymbol= currrency==='inr'?'₹':currrency==='eur'?'€':'$';

  const switchChart=(key)=>{
    switch (key) {
      case "24H":
        setDays("24H");
        setLoading(true)
        break;
      case "7d":
        setDays("7d");
        setLoading(true)
        break;
      case "14d":
        setDays("14d");
        setLoading(true)
        break;
      case "30d":
        setDays("30d");
        setLoading(true)
        break;
      case "6m":
        setDays("182d");
        setLoading(true)
        break;
      case "1y":
        setDays("365d");
        setLoading(true)
        break;
      case "Max":
        setDays("max");
        setLoading(true)
        break;
    
      default:
        break;
    }
  }

  useEffect(()=>{
    const fetchCoin=async ()=>{
      try {
        const {data}=await axios.get(`${server}/coins/${params.id}`);
        const {data:chartData }= await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currrency}&days=${days}`);

        setCoin(data);
        console.log(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    };
    fetchCoin();
  },[params.id,currrency,days]);

  if(error){
    return <ErrorComp/>
  }

  return (
    <Container maxW={'container.xl'}>
      {loading?<Loader/>:
        <>
        <Box w={'full'} borderWidth={'2'} py={'10'} pr={['1','32']} pl={['1','32']}  >
          <ChartComp arr={chartArray} currrency={currencySymbol} days={days} />
        </Box>

        <HStack w={'full'} wrap={'wrap'} pl={['6','32']} pr={['6','32']} spacing={'2'} >
          {btns.map((i)=>(
            <Button key={i} onClick={()=>switchChart(i)} >{i}</Button>
          ))}
        </HStack>

        <RadioGroup value={currrency} onChange={setCurrency} pl={['6','32']} pr={['6','32']} >
            <HStack p={'5'} spacing={'7'} >
              <Radio value={'inr'} >INR</Radio>
              <Radio value={'eur'} >EUR</Radio>
              <Radio value={'usd'} >USD</Radio>
            </HStack>
          </RadioGroup>

        <VStack alignItems={'flex-start'} spacing={'4'} pl={['6','32']} pr={['6','32']} >
          <Text fontSize={'small'} alignSelf='center' opacity={'0.8'} >
            Last Updated On {" "} {Date().split('G')[0]}
          </Text>

          <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>
              {currencySymbol}
              {coin.market_data.current_price[currrency]}
            </StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_24h >0? 'increase':'decrease'} />
              {coin.market_data.price_change_24h}%
            </StatHelpText>
          </Stat>

          <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}
          </Badge>

          <CustomBar days={days} curr={Math.random()*100} low={`${currencySymbol}${coin.market_data.low_24h[currrency]}`} high={`${currencySymbol}${coin.market_data.high_24h[currrency]}`} />
        
          <Box w={'full'} p={'4'} >
            <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currrency]}`} />
            <Item title={'Max Supply'} value={coin.market_data.max_supply} />
            <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply} />
            <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currrency]}`} />
            <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currrency]}`} />
          </Box>


        </VStack>
        </>
      }
    </Container>
  )
};

const Item=({title,value})=>(
  <HStack w={'full'} my={'3'} justifyContent={'space-between'}  >
    <Text letterSpacing={'widest'} >{title}</Text>
    <Text>{value?value:'NA'}</Text>
  </HStack>
)

const CustomBar=({days,curr,low,high})=>(
  <VStack w={'full'} >
    <Progress  value={curr} colorScheme={'teal'} w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'}> 
        <Badge children={low} colorScheme={'red'} />
        <Text fontSize={'sm'} >{days}</Text>
        <Badge children={high} colorScheme={'green'} />
      </HStack>
  </VStack>
);


export default CoinsDetails