import React, {
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
} from "react";
import Web3 from "web3";
import PVSContract from "../contracts/PVS.json";
import { useNavigate } from "react-router-dom";

const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  let navigate = useNavigate();
  const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

  const [polls, setPolls] = useState([]);
  const [myPolls, setMyPolls] = useState([]);

  const [isExecuted, setIsExecuted] = useState(false);

  const [accountData, setAccountData] = useState({
    accountNo: "",
    balance: "",
  });

  const connect = async () => {
    await window.ethereum.enable();

    const account = await window.ethereum.request({ method: "eth_accounts" });
    const accountNo = account[0];

    const balance = await web3.eth.getBalance(accountNo);
    const balanceInEther = web3.utils.fromWei(balance, "ether");

    setAccountData({
      accountNo: accountNo,
      balance: balanceInEther,
    });
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (accountData?.accountNo && window.location.pathname === "/")
      navigate("/dashboard");
  }, [accountData]);

  const contractAddress = "0xD3Ca5E1EAEA0626a86aB709C0e2cF5DABB0A67Ec";
  const contractAbi = PVSContract.abi;

  const pvsContract = new web3.eth.Contract(contractAbi, contractAddress);

  async function createPoll(data) {
    setIsExecuted(false);
    console.log(data);
    const candidates = data.options;
    console.log(candidates);

    const receipt = await pvsContract.methods
      .createPoll(data.owner.name, candidates)
      .send({ from: `${accountData?.accountNo}` });
    console.log(receipt);
    const pollid = await receipt.events.PollCreated.returnValues.pollIndex;

    setIsExecuted(true);
    return pollid;
  }

  async function vote(votes, id) {
    votes = votes.map((v) => parseInt(v));
    const pollIndex = parseInt(id);
    console.log(votes, pollIndex);
    const receipt = await pvsContract.methods
      .vote(votes, pollIndex)
      .send({ from: `${accountData?.accountNo}` });
    console.log(receipt);
  }

  async function closePoll(pollIndex) {
    if (!pollIndex) {
      console.error("No pollIndex provided");
      return;
    }

    const receipt = await pvsContract.methods
      .closePoll(pollIndex)
      .send({ from: accountData?.accountNo });
    console.log(receipt);

    // Call the winner function to get the winner information
    const winnerInfo = await winner(pollIndex);

    // Display an alert with the winner's information
    // alert(`The winner is ${winnerInfo}`);
  }

  async function winner(pollIndex) {
    if (!accountData.accountNo) {
      console.error("Account not connected");
      return;
    }

    // Call the winner method to get the winner information for the given pollIndex
    const winnerInfo = await pvsContract.methods
      .winner(pollIndex)
      .call({ from: accountData.accountNo });
    console.log(winnerInfo);
    return winnerInfo;
  }

  useEffect(() => {
    const func = async () => {
      const filterOptions = {
        // filter: {
        //   owner: accountData?.accountNo
        // },
        fromBlock: 0,
        toBlock: "latest",
      };

      await pvsContract.events
        .PollCreated(filterOptions, (error, event) => {})
        .on("data", (event) => {
          setPolls((p) => [...p, event.returnValues.pollIndex]);
        })
        .on("error", console.error);

      await pvsContract.events
        .VoteCast()
        .on("data", (event) => {})
        .on("event", (event) => {
          console.log(event);
        })
        .on("error", (error) => {
          console.error(error);
        });
    };

    if (accountData?.accountNo || isExecuted) func();
  }, [accountData, isExecuted]);

  const pollData = async (id) => {
    const pollOwner = await pvsContract.methods.polls(id).call();
    const data = await pvsContract.methods.pollData(id).call();

    // console.log(data)

    return {
      id: id,
      name: pollOwner.name,
      owner: pollOwner.owner,
      options: data[0],
      cand: data.cand,
    };
  };

  useEffect(() => {
    console.log("polls: ", polls);

    const func = async () => {
      const pollsOwner = [];

      for (let i = 0; i < polls.length; i++) {
        const data = await pollData(polls[i]);
        console.log(data);
        pollsOwner.push(data);
      }

      setMyPolls([...pollsOwner]);
    };

    if (polls.length) func();
  }, [polls]);

  const pollCount = async () => {
    const result = await pvsContract.methods.pollCount().call();
    return result;
  };

  const memo = useMemo(
    () => ({
      pollCount,
      createPoll,
      connect,
      pollData,
      vote,
      myPolls,
      accountData,
      closePoll,
      winner,
    }),
    [accountData, myPolls]
  );

  return <ApiContext.Provider value={memo}>{children}</ApiContext.Provider>;
};

export default function useApi() {
  return useContext(ApiContext);
}
