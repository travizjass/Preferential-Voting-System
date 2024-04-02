import { useEffect, useState } from "react";
import { 
    Box, 
    Flex, 
    Grid, 
    GridItem, 
    Text,
    SimpleGrid,
    Menu, MenuButton, MenuList, MenuItem,
    Button,
    useToast,
    Tooltip
} from "@chakra-ui/react";

import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import useApi from "../context/AppContext";
import { useParams } from 'react-router-dom'

const Drag = () => {

    const params = useParams()
    const {pollData, vote, accountData, closePoll, winner} = useApi()
    const toast = useToast()
    const [id, setId] = useState(0)
    const [data, setData] = useState([])
    const [owner, setOwner] = useState("")
    const [candidates, setCandidates] = useState([])
    const [pollIndex, setPollIndex] = useState(null); 

     useEffect(() => {
        setId(params.id);
        setPollIndex(params.id); // Set the pollIndex from params.id
    }, [params]);

    useEffect(() => {

        console.log("working 1")

        const func = async () => {
            console.log("working...")
            const d = await pollData(id)
            
            setOwner(d.owner)

            setCandidates(d.options)
            setData(d.options.map((c, index) => ({
                id: index+1,
                rank: 'NaN',
                name: c
            })))
        }

        if(id > 0)
            func()

    }, [id])

    useEffect(() => {

        console.log(data)
        console.log(candidates)
        
    }, [data])
    
    const sendData = async () => {

        if(data.filter(d => d.rank === 'NaN').length > 0)
        {
            toast({
                title: 'Rank cannot be NaN',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return;
        }

        const finalRanks = []

        candidates.forEach(c => {
            finalRanks.push(data.filter(d => d.name === c)[0].rank)
        })

        console.log(finalRanks)
        await vote(finalRanks, id)

    }
    
    const Select = (item, id) => {

        const canChange = data.filter(d => d.rank === item)
        
        if(item !== 'NaN')
        if(canChange.length)
        {
            toast({
                title: 'Rank already assigned',
                status: 'error',
                duration: 2000,
                isClosable: true,
              })
            return
        }

        const updatedList = data.map(d => {
            if(d.id === id)
                return {...d, rank: item}
            
            return d;
        }).sort((a,b) => {
            
            console.log(a.rank, b.rank)
            console.log(a.rank === 'NaN')
            if(a.rank === 'NaN' || b.rank === 'NaN')
                return 1;
            else
            return (a.rank - b.rank)
        
        })

        setData(updatedList)
    }

    const handleClosePoll = async () => {
        // Call closePoll with pollIndex
        await closePoll(pollIndex);
        // Call winner function to get the winner
        const winnerInfo = await winner(pollIndex);
        // Display an alert with the winner's information
        alert(`The winner is ${winnerInfo}`);
    }

    return (

        <Flex className="flex-col gap-3 items-center pt-20" minH={'100vh'}>
            <TransitionGroup className={'p-2'}>
                
                {data.map(d => {

                    return (
                        <CSSTransition key={d.id} timeout={500} classNames="item" className=" p-3">
                            <Flex 
                                justifyContent={'space-around'}
                                // borderBottom={1}
                                borderBottom={"1px solid white"}
                                borderColor={"white"}
                                alignItems={'center'}
                                w={"90vw"}
                                // borderEndWidth={10}
                            >
                                <Text width={"40%"}>
                                {d.name}
                                </Text>
                                <Menu>
                                    <MenuButton as={Button} colorScheme="teal">
                                        {d.rank}
                                    </MenuButton>
                                    <MenuList maxH={64} overflowY="auto">
                                        {candidates.map((item, i) => (
                                            <MenuItem key={i} onClick={() => Select(i+1, d.id)} _hover={{ bg: "gray.600" }}>
                                                {i+1}
                                        </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>

            <Button className="w-80"
                colorScheme="teal"
                onClick={() => sendData()}
                
            >Submit</Button>

            {owner.toLowerCase() === accountData?.accountNo.toLowerCase()?

                    <Button className="w-80"
                    colorScheme="red"
                    isDisabled={false}
                    onClick={handleClosePoll}
                    >Close Poll</Button>:""
            }
        </Flex>

    );
    
};

export default Drag