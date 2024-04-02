import { HStack, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { MdHowToVote } from 'react-icons/md'
import { useNavigate } from "react-router-dom";



const Logo = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };
    return (
        <HStack onClick={handleClick} cursor="pointer">
            <MdHowToVote size={'40'} color='#4FD1C5' />
            <Heading display={['none', 'none', 'block', 'block']} mt={2}
                fontSize={{
                    base: "xl",
                    sm: "2xl",
                }}
                lineHeight="8"
                fontWeight="extrabold"
                // letterSpacing="tight"
                _light={{
                    color: "gray.900",
                }} >Preferential Voting System</Heading>
        </HStack>
    )
}

export default Logo