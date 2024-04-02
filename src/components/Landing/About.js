import { Box, Flex, Icon, Stack, chakra, Text } from "@chakra-ui/react";
import { SiBlockchaindotcom } from "react-icons/si";
import { AiFillEye } from "react-icons/ai"
import React from 'react'

const About = () => {
    const Feature = (props) => {
        return (
            <Flex>
                <Flex shrink={0}>
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        h={12}
                        w={12}
                        rounded="md"
                        _light={{
                            bg: "teal.500",
                        }}
                        color="white"
                    >
                        <Icon
                            boxSize={6}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            {props.icon}
                        </Icon>
                    </Flex>
                </Flex>
                <Box ml={4}>
                    <chakra.dt
                        fontSize="lg"
                        fontWeight="medium"
                        lineHeight="6"
                        _light={{
                            color: "gray.900",
                        }}
                    >
                        {props.title}
                    </chakra.dt>
                    <chakra.dd
                        mt={2}
                        color="gray.500"
                        _dark={{
                            color: "gray.400",
                        }}
                    >
                        {props.children}
                    </chakra.dd>
                </Box>
            </Flex>
        );
    };

    return (
        <Flex
            bg="black"
            p={20}
            w="auto"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                py={12}
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                rounded="xl"
            >
                <Box
                    maxW="7xl"
                    mx="auto"
                    px={{
                        base: 4,
                        lg: 8,
                    }}
                >
                    <Box
                        textAlign={{
                            lg: "center",
                        }}
                    >
                        <chakra.h2
                            _light={{ color: "teal.600" }}
                            fontWeight="semibold"
                            textTransform="uppercase"
                            letterSpacing="wide"
                        >
                            Features
                        </chakra.h2>
                        <Text
                            mt={2}
                            fontSize={{
                                base: "3xl",
                                sm: "4xl",
                            }}
                            lineHeight="8"
                            fontWeight="extrabold"
                            letterSpacing="tight"
                            _light={{
                                color: "gray.900",
                            }}
                        >
                            Redefining the way you vote
                        </Text>
                        <Text
                            mt={4}
                            maxW="2xl"
                            fontSize="xl"
                            mx={{
                                lg: "auto",
                            }}
                            color="gray.500"
                            _dark={{
                                color: "gray.400",
                            }}
                        >
                            Our blockchain-based voting system ensures fair and transparent decision-making for DAO's with customizable parameters, real-time tracking, and robust analytics.
                        </Text>
                    </Box>

                    <Box mt={10}>
                        <Stack
                            spacing={{
                                base: 10,
                                md: 0,
                            }}
                            display={{
                                md: "grid",
                            }}
                            gridTemplateColumns={{
                                md: "repeat(2,1fr)",
                            }}
                            gridColumnGap={{
                                md: 8,
                            }}
                            gridRowGap={{
                                md: 10,
                            }}
                        >
                            <Feature
                                title="Secure and transparent blockchain technology"
                                icon={
                                    <SiBlockchaindotcom />
                                }
                            >
                                Our system utilizes blockchain technology to ensure the security and transparency of every vote, eliminating the risk of tampering and fraud.

                            </Feature>

                            <Feature
                                title="Preferential voting system for fair and efficient decision-making"
                                icon={
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                    />
                                }
                            >
                                Our preferential voting system allows for fair and efficient decision-making by allowing members to rank their choices and eliminating the need for multiple rounds of voting.
                            </Feature>

                            <Feature
                                title="Real-time vote tracking and result display"
                                icon={
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                }
                            >
                                Our system provides real-time tracking and display of votes, allowing members to stay informed and engaged throughout the voting process.
                            </Feature>

                            <Feature
                                title="User-friendly interface for easy participation"
                                icon={
                                    <AiFillEye />
                                }
                            >
                                Our system provides a user-friendly interface that makes it easy for members to participate in the voting process, regardless of their technical expertise.
                            </Feature>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

export default About

