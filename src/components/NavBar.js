import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useApi from "../context/AppContext";

const Navbar = () => {
  const { accountData, connect } = useApi();
  console.log(accountData);

  return (
    <Flex
      // position={'fixed'}
      top={0}
      // h={10}
      // bg={'red'}
      // w={"100vw"}
      boxShadow={"2xl"}
      zIndex={100}
    >
      <Flex
        w={"100vw"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={5}
        py={5}
      >
        <Text>PVS</Text>
        <Flex>
          <Button as={"flex"} flexDirection={"column"} onClick={connect}>
            {accountData.accountNo ? (
              <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                // alignItems={'center'}
              >
                <Text color={"rgba(255,255,255, 0.3)"}>
                  {accountData?.accountNo.substring(1, 6) +
                    "..." +
                    accountData?.accountNo.substring(
                      accountData?.accountNo.length - 2
                    )}
                </Text>
                <Text fontSize={14}>
                  {parseFloat(accountData?.balance).toPrecision(3)} eth
                </Text>
              </Flex>
            ) : (
              "Connect Wallet"
            )}
          </Button>
          
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
