import { Box, Button, HStack, Select, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { CopyIcon, CorrectIcon } from "../../components/icons";
import { SampleQr } from "../../components/icons/SampleQR";
import { Header } from "../../components/layout/header";
import SelectCommon from "../../components/Select";
import {
  CREATOR_CONTRACT_ADDRESS,
  abi1,
  count,
  abi2,
} from "../../constants/index";
import { Contract, ethers } from "ethers";

const AddFundCrypto: NextPage = () => {
  const [signer, setSigner] = useState(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState();
  const [isCopied, setCopied] = useState(false);
  const [isAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [isSend, setIsSend] = useState(false);
  const router = useRouter();
  const num = 2;

  const transactionParameters = {
    nonce: "0x00", // ignored by MetaMask
    gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
    gas: "0x2710", // customizable by user during MetaMask confirmation.
    to: "address", // Required except during contract publications.
    from: signer, // must match user's active address.
    value: "0x00", // Only required to send ether to the recipient from the initiating external account.
    data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
    chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };
  // const txHash = await ethereum.request({
  //   method: "eth_sendTransaction",
  //   params: [transactionParameters],
  // });

  async function send() {
    setIsSend(true);

    if (typeof window.ethereum !== signer) {
      try {
        const ethereum = window.ethereum as unknown as MetaMaskInpageProvider;
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: "0x2cE7cA7D8BF56A28f654E47F66CC8b2657Ad7fCc",
              to: "0x63E541f073970bebCF72BbFfBE369c4A60812816",
              value: "0x00000002af31dc4611874",
              gasPrice: "0xa",
              gas: "0x5208",
            },
          ],
        });
        router
          .push({
            pathname: "loadTransaction",
            query: {
              title: "Шалгаж байна",
              description: `Таны илгээсэн мөнгөн дүнг шалгаж байна.`,
            },
          })

          .then((txHash) => console.log(txHash))
          .catch((error) => console.error);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

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
  async function Wallet() {
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(
        CREATOR_CONTRACT_ADDRESS,
        abi1,
        signer
      );
      try {
        const owner = await contract.getWallet(num);
        setNewAddress(owner);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  return (
    <Box p={8} w="full">
      <Header isBack title="Хөрөнгө оруулах" />
      <Box gap={5}>
        <Box mt={10}>
          <SelectCommon
            value={selectedAsset}
            options={[{ label: "TBNB", value: "TBNB" }]}
            isMulti={false}
            isClearable={true}
            placeholder={"Asset-аа сонгоно уу"}
          />
        </Box>
        <Box mt={10}>
          <SelectCommon
            value={selectedNetwork}
            options={[
              { label: "Smart-chain Testnet", value: "Smart-chain Testnet" },
            ]}
            isMulti={false}
            isClearable={true}
            placeholder={"Network-оо сонгоно уу"}
          />
        </Box>
        <Box
          borderRadius="10px"
          border="1px solid #E5E5E5"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={8}
          mt={10}
        >
          <SampleQr />
        </Box>
        <HStack
          borderRadius="10px"
          border="1px solid #E5E5E5"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          py={8}
          mt={10}
        >
          {!hasMetamask ? (
            isConnected ? (
              <Text>Yes</Text>
            ) : (
              <>
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() => connect()}
                >
                  Хэтэвч
                </Button>
              </>
            )
          ) : (
            "Please install metamask"
          )}
          <Button
            variant="ghost"
            onClick={() => {
              Wallet();
            }}
          >
            Wallet <br />
            address
          </Button>
          {!address ? (
            <Box maxWidth="200px">
              <Text>{isAddress}</Text>
            </Box>
          ) : (
            <Box maxWidth="200px">
              <Text>Хаягаа авна уу</Text>
            </Box>
          )}

          {isCopied ? (
            <Button variant="unstyled" display="flex" alignItems="center">
              <CorrectIcon />
            </Button>
          ) : (
            <CopyToClipboard text={isAddress} onCopy={() => setCopied(true)}>
              <Button variant="unstyled">
                <CopyIcon />
              </Button>
            </CopyToClipboard>
          )}
        </HStack>
        {!isSend ? (
          <Button variant="solid" w="full" mt={10} onClick={() => send()}>
            Болсон
          </Button>
        ) : (
          <Button
            variant="solid"
            w="full"
            mt={10}
            onClick={() => router.push("/group/myGroups")}
          >
            Дараах
          </Button>
        )}
      </Box>
    </Box>
  );
};
export default AddFundCrypto;
