import React, { useState } from "react";
import { Contract, ethers } from "ethers";
import {
  CREATOR_CONTRACT_ADDRESS,
  abi1,
  count,
  abi2,
} from "../../constants/index";
import router from "next/router";
import { Button, Text } from "@chakra-ui/react";
function testGroup() {
  const [signer, setSigner] = useState(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);

  const owners = [
    "0x43626432525ccEcaF2eA9ba41192e998404A9807",
    "0x2cE7cA7D8BF56A28f654E47F66CC8b2657Ad7fCc",
  ];
  const address = "0xEE2B0097bD3a59B73c77DA31D99C21A144bF60d9";
  const withAdd = "0x2cE7cA7D8BF56A28f654E47F66CC8b2657Ad7fCc";
  const value = 100000000000000;
  const data = "0x6761726c616761";
  const num = 3;

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const ethereum = window.ethereum as unknown as MetaMaskInpageProvider;
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
        console.log(provider.getSigner());
        // router.push("/registerSucces"),
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }
  async function getWallet() {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(
        CREATOR_CONTRACT_ADDRESS,
        abi1,
        signer
      );
      try {
        const owner = await contract.getWallet(num);
        console.log(owner);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  async function widthdraw() {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(address, abi2, signer);
      try {
        const owner = await contract.submitTransaction(withAdd, value, data);
        console.log(owner);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  return (
    <>
      {!hasMetamask ? (
        isConnected ? (
          <Text>Хэтэвч холбогдсон</Text>
        ) : (
          <>
            <Button
              variant="ghost"
              colorScheme="teal"
              onClick={() => connect()}
            >
              Хэтэвчээ холбох
            </Button>
          </>
        )
      ) : (
        "Please install metamask"
      )}
      <>
        <Button variant="ghost" colorScheme="teal" onClick={() => getWallet()}>
          Хэтэвчийн хаяг авах
        </Button>
        <Button variant="ghost" colorScheme="teal" onClick={() => widthdraw()}>
          Зарлага гаргах
        </Button>
      </>
    </>
  );
}

export default testGroup;
