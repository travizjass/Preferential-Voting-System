import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  // Toast,
  useColorModeValue,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react';
import useApi from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
const Modal = () => {
  const [options, setOptions] = useState([]);
  const {createPoll} = useApi();

  const [pollId, setPollId] = useState(-1)

  const [loading, setLoading] = useState(false)

  const [pollData, setPollData] = useState({
    name: '',
    // description: "",
    // contact: ""
  })

  const handlePollData = (e) => {
    // console.log(e)

    setPollData({
      ...pollData, 
    [e.target.name]: e.target.value
    })
  }

  const toast = useToast()

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {

    setLoading(true)
    // console.log(options.length)
    if(options.length < 2)
    {
      toast({
        title: 'Atleast 2 options required',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      setLoading(false)
      return
    }
    if(!pollData.name)
    {
      toast({
        title: 'Name Field is required',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      setLoading(false)
      return
    }

    if(options.filter(o => o === "").length > 0)
    {
      toast({
        title: 'Options field cannot be empty',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      setLoading(false)
      return
    }

    const data = await createPoll({

      options: options,
      owner: pollData

    })

    console.log(data)
    setPollId(data)
    setLoading(false)

  }

  useState(() => {
    console.log(options)
  }, [options])

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      flexDirection={'column'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Create Poll
          </Heading>
          <Text fontSize={'lg'} color={'white.600'}>
            to make great decisions for your organization
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Box>
              <FormControl id="Name" isRequired>
                <FormLabel>Name of the Poll</FormLabel>
                <Input type="text" onChange={e => handlePollData(e)} name='name' />
              </FormControl>
            </Box>
            
            <Stack spacing={10} pt={2}>
              {options.map((option, index) => (
                <HStack key={index}>
                  <Input
                    type="text"
                    value={option}
                    onChange={(event) =>
                      handleOptionChange(index, event.target.value)
                    }
                  />
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteOption(index)}
                  >
                    Delete
                  </Button>
                </HStack>
              ))}
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'teal.400'}
                color={'white'}
                _hover={{
                  bg: 'teal.500',
                }}
                onClick={handleAddOption}
              >
                Add Option
              </Button>
            </Stack>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={loading}
                loadingText="Submitting"
                size="lg"
                bg={'teal.400'}
                color={'white'}
                _hover={{
//<<<<<<< HEAD
                  bg: 'teal.500',
                }}
                onClick={() => handleSubmit()}>
                Create the Poll
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>    

      {pollId>0?
        <Button
              size="lg"
              bgColor={"gray.800"}
              _hover={{ bg: "gray.800" }}
              _active={{ bg: "black" }}
              onClick={() => navigate(`/vote/${pollId}`)}
            >
              VOTE HERE...
            </Button>:""
      }
    </Flex>
  );
};

export default Modal;
