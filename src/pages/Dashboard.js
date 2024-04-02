import React from 'react'
import { Flex, Box, Heading } from '@chakra-ui/react'
import CreateForm from '../components/Dashboard/CreateForm'
import ElectionCard from '../components/Dashboard/ElectionCard'
import useApi from '../context/AppContext'

const Dashboard = () => {

    const {myPolls} = useApi()

    console.log(myPolls)
 
    return (
        <Flex direction={'column'} bg={'black'} minH={"100vh"}>
            <Box px={8} mt={24} mb={12} mx="auto">
                <CreateForm />
            </Box>
            <Heading
                mt={2}
                fontSize={{
                    base: "3xl",
                    sm: "4xl",
                }}
                fontWeight="extrabold"
                letterSpacing="tight"
                _light={{
                    color: "gray.900",
                }}
                textAlign={'center'}
            >
                Things that require your attention!
            </Heading>
            <Flex direction={'row'} justifyContent={'space-evenly'} flexWrap={'wrap'} gap={10} my={10}>

                {myPolls.map((poll, index) => {
                    return (
                        <ElectionCard title={poll.name} id={poll.id} />
                    )
                })}
            </Flex>

        </Flex>
    )
}

export default Dashboard