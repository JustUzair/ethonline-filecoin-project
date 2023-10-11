import React, { Component, useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaCommentDots } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Image from "next/image";
import Logo from "../../assets/img/logo.png";
import styled from "styled-components";
import contractAddresses from "../../constants/networkMapping.json";

import abi from "../../constants/Abi.json";

const Navbar = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [creatorContractAddress, setCreatorContractAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );

  const { runContractFunction } = useWeb3Contract();
  const { enableWeb3, authenticate, account, isWeb3Enabled } = useMoralis();
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const contractAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId]["UserFactory"][
          contractAddresses[chainId]["UserFactory"].length - 1
        ]
      : null;
  const getStyle = {
    navbar: {
      position: "fixed",
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      boxShadow: "0px 0px 2px grey",
      zIndex: 100,
      backgroundColor: "white",
      height: "85px !important",
      alignItems: "center",
    },
    navbarBrand: {
      paddingLeft: "15px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    navbarMenu: {
      display: "flex",
      margin: "0",
      padding: "0",
      listStyle: "none",
      width: "50% !important",
      alignItems: "center",
      justifyContent: "space-evenly",
      // backgroundColor: 'yellow'
    },
    navbarItem: {
      textDecoration: "none",
      display: "inline-block",
      padding: "20px",
      color: "black",
      // backgroundColor: 'teal'
    },
  };

  async function checkOwner() {
    if (!isWeb3Enabled) await enableWeb3();
    if (account) {
      runContractFunction({
        params: {
          abi,
          contractAddress,
          functionName: "isSignedUp",
          params: { _creatorAddress: account },
        },
        //
        onError: (error) => {
          console.error(error);
        },
        onSuccess: (data) => {
          //   console.log(`data : ${data}`);
          setIsSignedUp(data);
        },
      });
    }
  }

  async function getCreatorContractAddress() {
    if (!isWeb3Enabled) await enableWeb3();
    if (account) {
      runContractFunction({
        params: {
          abi,
          contractAddress,
          functionName: "getCreatorContractAddress",
          params: { _creatorAddress: account },
        },
        //
        onError: (error) => {
          console.error(error);
        },
        onSuccess: (data) => {
          //   console.log(data);
          setCreatorContractAddress(data.toString());
        },
      });
    }
  }
  useEffect(() => {
    checkOwner();
    if (isSignedUp) {
      getCreatorContractAddress();
    }
  }, [account, isSignedUp]);
  return (
    <nav style={getStyle.navbar}>
      <Link href="/" className="nav__link">
        <div style={getStyle.navbarBrand}>
          <Image src={Logo} alt={"logo"} width={50} height={50}></Image>
        </div>
      </Link>
      <ul style={getStyle.navbarMenu}>
        <li>
          <Link href="/" className="nav__link">
            Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="nav__link">
            Dashboard
          </Link>
        </li>

        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
