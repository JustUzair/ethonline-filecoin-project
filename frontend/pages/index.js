import React, { useEffect } from "react";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";
import { FaChevronRight } from "react-icons/fa";
import MultiStepProgressBar from "../components/MultiStepProgressBar/MultiStepProgressBar";
import Footer from "../components/Footer/Footer";
import Link from "next/link";
import fileLendSplash from "../assets/img/filelendsplash.png";
import Image from "next/image";
export default function Home() {
  const [login, setLogin] = useState(false);
  const dispatch = useNotification();
  const { runContractFunction } = useWeb3Contract();
  const { enableWeb3, authenticate, account, isWeb3Enabled } = useMoralis();
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  useEffect(() => {
    enableWeb3();
  }, []);
  useEffect(() => {
    authenticate();
    // console.log(`Account : ${account}`);
    if (account != null) setLogin(true);
    else setLogin(false);
  }, [account]);

  return (
    <div className="bg-gradient-to-tr from-[#2b1b6f] to-[#111827]">
      <section className="">
        {/* <Header className="bg-gradient-to-r from-black via-black via-black to-black"/> */}
        <section className="w-full flex-1 md:h-screen">
          <div className="bg-gradient-to-tr from-[#2b1b6f] to-[#111827] pt-24 md:pt-16 w-full h-full px-4 flex flex-col items-center justify-center md:grid md:grid-cols-12 text-white">
            <div className="flex flex-col md:mt-0 items-start px-4 ssm:px-8 justify-center md:col-span-6 space-y-4">
              <div className="animate__animated animate__backInDown  text-[#fafafa] text-xl ss:text-2xl ssm:text-4xl xl:text-5xl font-medium ">
                <p>More Liquidity for</p>
                <p>
                  <span className="text-[#0090ff] text-bold">Finance</span> On{" "}
                  <span className="text-[#0090ff] text-bold">FVM</span>
                </p>
              </div>
              <p className="text-[#fafafa] text-sm ssm:text-lg lg:text-xl leading-relaxed">
              Unlock the Power of Your Assets: Seamlessly borrow value against your native Filecoin Virtual Machine holdings. Experience enhanced leverage, greater liquidity, and flexible financial solutions tailored for the decentralized future. Dive into a world where your assets work smarter and harder for you.
              </p>

              <Link
                href="/markets"
                className="flex items-center space-x-2 ssm:space-x-4 bg-[#0090ff] rounded-full hover:border-orange-900 py-3 px-4 ssm:px-8 text-sm ssm:text-base text-white "
              >
                <p>View the Markets</p>
                <FaChevronRight className="text-[#0090ff] w-5 h-5 bg-white rounded-full p-1" />
              </Link>
            </div>
            <div className="md:col-span-6 ">
              <Image
                src={fileLendSplash}
                
              />
            </div>
          </div>
        </section>
      </section>
      {/* bg-gradient-to-tr from-[#2b1b6f] to-[#111827] */}
      <section className="h-full w-full flex flex-col  text-white py-8  items-center justify-center">
        <h1 className="text-center text-4xl sm:text-5xl pb-5 underline text-[#f5c9ff] font-bold">
          About the App
        </h1>
        <p className="w-9/12 sm:w-8/12 text-[#fafafa] text-sm sm:text-base text-center leading-relaxed italic">
          

FileLend offers a decentralized peer-to-peer lending platform on the Filecoin blockchain, enabling users to deposit stablecoins to earn interest and borrow funds by providing collateral. Using dynamic interest rates based on platform utilization, it ensures fair returns for depositors while balancing borrowing costs. Additionally, it incorporates safety mechanisms such as overcollateralization and liquidation to safeguard lenders, while administrators have the ability to adjust platform parameters to maintain its integrity and solvency. The platform's reliance on an external oracle for real-time price data also emphasizes the importance of accuracy and trustworthiness in asset valuation.
          <span className="py-4">
            
          </span>
        </p>
      </section>
      <section className="h-full w-full text-white py-8  items-center justify-center">
        <h1 className="text-center text-4xl sm:text-5xl text-[#f5c9ff] font-bold underline">
          How It Works
        </h1>
        <MultiStepProgressBar />
      </section>
      <Footer />
    </div>
  );
}
