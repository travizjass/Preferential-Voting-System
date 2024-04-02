import React from 'react'
import { Box, Flex, Stack, chakra, SimpleGrid, Button } from '@chakra-ui/react'
import {Link, useNavigate} from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

const CreateForm = () => {

    const navigate = useNavigate()

    return (
        <Box
            bg={'teal.300'}
            py={12}
            px={{
                base: "4",
                md: "8",
            }}
            w={[
                 "md",
                 '2xl',
                 '4xl',
                 '6xl',
            ]}
            borderRadius="3xl"
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
                    color="gray.900"
                    _dark={{
                        color: "gray.100",
                    }}
                    mb={6}
                >
                    <chakra.span display="block" color={'black'}>Welcome, User </chakra.span>
                    <chakra.span
                        display="block"
                        
                        _dark={{
                            color: "gray.700",
                        }}
                    >
                        Let's Create another Poll
                    </chakra.span>
                </chakra.h2>
                <Stack
                    direction={{
                        base: "column",
                        sm: "row",
                    }}
                    justifyContent='flex-end'
                >
                    <Button size="lg" bgColor={'gray.800'} _hover={{ bg: 'gray.800' }}
                        _active={{ bg: 'black' }} leftIcon={<FiPlus />} onClick={() => navigate('/createPoll')}>
                        Create Poll
                    </Button>
                </Stack>
            </Box>

        </Box>

    )
}

export default CreateForm