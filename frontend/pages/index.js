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
import stonks from "../assets/img/stonks.webp";
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
    <div className="bg-gradient-to-tr from-[#2b1b6f] via-[#472ed5] to-[#0090ff]">
      <section className="">
        {/* <Header className="bg-gradient-to-r from-black via-black via-black to-black"/> */}
        <section className="w-full flex-1 md:h-screen">
          <div className="bg-gradient-to-tr from-[#2b1b6f] via-[#472ed5] to-[#0090ff] pt-24 md:pt-16 w-full h-full px-4 flex flex-col items-center justify-center md:grid md:grid-cols-12 text-white">
            <div className="flex flex-col md:mt-0 items-start px-4 ssm:px-8 justify-center md:col-span-6 space-y-4">
              <div className="animate__animated animate__backInDown  text-[#fafafa] text-xl ss:text-2xl ssm:text-4xl xl:text-5xl font-medium ">
                <p>Decentralized</p>
                <p>
                  <span className="text-[#0090ff] text-bold">Lending</span> And{" "}
                  <span className="text-[#0090ff] text-bold">Borrowing</span>
                </p>
              </div>
              <p className="text-[#fafafa] text-sm ssm:text-lg lg:text-xl leading-relaxed">
                The core purpose of this project is to showcase my adept
                undestanding of lending and borrowing strategies in the context
                of blockchain technology.
              </p>

              <Link
                href="/dashboard"
                className="flex items-center space-x-2 ssm:space-x-4 bg-[#0090ff] rounded-full hover:border-orange-900 py-3 px-4 ssm:px-8 text-sm ssm:text-base text-white "
              >
                <p>Go to Dashboard</p>
                <FaChevronRight className="text-[#0090ff] w-5 h-5 bg-white rounded-full p-1" />
              </Link>
            </div>
            <div className="md:col-span-6 ">
              <Image
                src={stonks}
                className="object-cover w-full w-12/12 md:w-10/12"
              />
            </div>
          </div>
        </section>
      </section>
      {/* bg-gradient-to-tr from-[#2b1b6f] via-[#472ed5] to-[#0090ff] */}
      <section className="h-full w-full flex flex-col  text-white py-8  items-center justify-center">
        <h1 className="text-center text-4xl sm:text-5xl pb-5 underline text-[#f5c9ff] font-bold">
          About the App
        </h1>
        <p className="w-9/12 sm:w-8/12 text-[#fafafa] text-sm sm:text-base text-center leading-relaxed italic">
          The application serves as a decentralized platform for lending and
          borrowing, creating an avenue where users can engage in lending
          activities while also facilitating the borrowing process. A
          distinctive feature of this platform is its decentralized nature,
          meaning that it operates without a central authority or intermediary.
          Instead, it relies on a network of participants who collectively
          contribute to its functioning.
          <span className="py-4">
            This project development process extensively delved into the DEFI
            platform, AAVE, as a critical source of insights and guidance.
            Notably, it's crucial to emphasize that the project code is entirely
            independent and doesn't encompass any code originating from AAVE.
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
