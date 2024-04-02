import React from 'react'
import { MdHowToVote } from 'react-icons/md'
import { Box, Flex, Stack, chakra, SimpleGrid, Button, Text } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
const ElectionCard = (props) => {

    const navigate = useNavigate()

    return (
        <Flex
            direction={'column'}
            
            py={12}
            px={12}
            borderRadius="3xl"
            bg={'gray.800'}
            minW={'md'}
        >
            <Box>
                <chakra.h2
                    fontSize={{
                        base: "3xl",
                        sm: "4xl",
                    }}
                    fontWeight="extrabold"
                    letterSpacing="tight"
                    lineHeight="shorter"

                    mb={6}
                >
                    <chakra.span display="block" >{props.title}</chakra.span>
                </chakra.h2>

                <Stack
                    direction={{
                        base: "column",
                        sm: "row",
                    }}
                    justifyContent='flex-end'
                    mt={8}
                >
                    <Button size="lg" colorScheme={'teal'} leftIcon={<MdHowToVote />} onClick={() => navigate(`/vote/${props.id}`)}>
                        Participate
                    </Button>
                </Stack>
            </Box>

        </Flex>
    )
}

export default ElectionCard