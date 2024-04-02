import { Box, Button, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Hero from '../components/Landing/Hero'
import Navbar from '../components/Global/Navbar'
import About from '../components/Landing/About'
import Footer from '../components/Global/Footer'

const Home = () => {
  return (
    <Flex direction={'column'} bg={'black'} minH={"100vh"}>
      <Hero />
      <About />
    </Flex>
  )
}

export default Home