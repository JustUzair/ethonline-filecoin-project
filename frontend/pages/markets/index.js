import React, { useEffect, useState } from "react";
import Image from "next/image";
import fileCoinLogo from "../../assets/img/filecoin.svg";
import fileLendLogo from "../../assets/img/fileLendLogo.png";
import Logo from "../../assets/img/fileLendLogo.png";
import usdcLogo from "../../assets/img/usdcLogo.svg";
import { useMoralis, useWeb3Contract } from "react-moralis";
import contractAddresses from "../../constants/networkMapping.json";
import lendingPoolAbi from "../../constants/lendingPoolAbi.json";
import coinAbi from "../../constants/coinAbi.json";
import ierc20Abi from "../../constants/ierc20Abi.json";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";
var authAnimation;

function openAuthModal() {
  authAnimation = gsap
    .timeline({ defaults: { ease: "power2.inOut" } })
    .to("#txModal", {
      scaleY: 0.01,
      x: 1,
      opacity: 1,
      display: "flex",
      duration: 0.4,
    })
    .to("#txModal", {
      scaleY: 1,
      background: "rgba(255,255,255,0.16)",
      duration: 0.6,
    })
    .to("#txModal #second", { scaleY: 1, opacity: 1, duration: 0.6 }, "-=0.4")
    .to("#txModal #third", { scaleY: 1, opacity: 1, duration: 0.4 }, "-=0.2")
    .to(
      "#txModal #fourth",
      {
        background: "rgba(255,255,255,0.3)",
        border: "1px solid rgba(255,255,255,0.3)",
        duration: 0.8,
      },
      "-=0.4"
    );
}

function closeAuthModal() {
  authAnimation.reverse().timeScale(-1.6);
}
const Dashboard = () => {
  const { runContractFunction } = useWeb3Contract();
  const [userAddress, setUserAddress] = useState("0x00000...000");
  const [tokens, setTokens] = useState([]);
  const [supplyModal, setSupplyModal] = useState(false);
  const [supplyAmount, setSupplyAmount] = useState(0);
  const [borrowModal, setBorrowModal] = useState(false);
  const [interactionAddress, setInteractionAddress] = useState("");
  const { enableWeb3, authenticate, account, isWeb3Enabled } = useMoralis();
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const lendingPoolAddress =
    chainId in contractAddresses
      ? contractAddresses[chainId]["lendingPool"][
          contractAddresses[chainId]["lendingPool"].length - 1
        ]
      : null;
  const dispatch = useNotification();
  //****************************************************************/
  //-----------------------NOTIFICATION-----------------------------
  //****************************************************************/

  const successNotification = (msg) => {
    dispatch({
      type: "success",
      message: `${msg} Successfully! `,
      title: `${msg}`,
      position: "bottomR",
    });
  };

  const failureNotification = (msg) => {
    dispatch({
      type: "error",
      message: `${msg} ( View console for more info )`,
      title: `${msg}`,
      position: "bottomR",
    });
  };
  //****************************************************************/
  //--------------------END NOTIFICATION-----------------------------
  //****************************************************************/
  const deposit = async () => {
    if (lendingPoolAddress == null) return;
    if (!isWeb3Enabled) enableWeb3();
    if (account) {
      await runContractFunction({
        params: {
          abi: ierc20Abi,
          contractAddress: "0x54efa9BdAE57a9d6564D1C91494B4A6451ca3543",
          functionName: "approve",
          params: {
            spender: lendingPoolAbi,
            value: ethers.utils.formatUnits(supplyAmount.toString(), "wei"),
          },
        },
        onError: (error) => {
          console.error(error.message);
          failureNotification(error.message);
        },
        onSuccess: async (data) => {},
      });
      await runContractFunction({
        params: {
          abi: lendingPoolAbi,
          contractAddress: lendingPoolAddress,
          functionName: "deposit",
          params: {
            amount: ethers.utils.formatUnits(supplyAmount.toString(), "wei"),
          },
        },
        onError: (error) => {
          console.error(error);
          failureNotification(error.message);
        },
        onSuccess: (data) => {
          successNotification("Deposited");
        },
      });
    }
  };
  useEffect(() => {
    enableWeb3();
    authenticate({
      provider: "walletconnect",
      projectId: "3400c6409b7eace10acd27af5d8f1761",
    });
  }, []);
  useEffect(() => {
    setUserAddress(account);
    if (chainId) {
      setTokens(contractAddresses[chainId]["tokens"]);
    }
  }, [account, userAddress, chainId]);
  return (
    <>
      {/* <div className="w-full h-screen "></div> */}
      {/* {JSON.stringify(contractAddresses[chainId])} */}
      <div className="flex flex-col items-center justify-center w-[100%] min-h-screen bg-gray-900 py-10">
        <div
          id="txModal"
          className="fixed z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 overflow-y-auto bg-gray-800 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
        >
          <div
            id="fourth"
            className="bg-gray-800 max-w-md m-auto mb-0 sm:mb-auto p-3 border border-gray rounded-2xl shadow-sm"
          >
            <div
              id="second"
              className="bg-gray-800 p-4 sm:p-8 w-full rounded-xl shadow-sm scale-y-0 opacity-0"
            >
              <div id="third" className="relative scale-y-0 opacity-0">
                <form>
                  <div className="grid grid-cols-2 gap-5">
                    {supplyModal && (
                      <>
                        <label>
                          <b>Supply USDC</b>
                          <Image src={usdcLogo} width={60} alt="filecoin" />
                        </label>
                        <div style={{ color: "white" }}>
                          Supply USDC for other users to borrow, receive ~4.5%
                          APY
                        </div>
                        <input
                          type="tel"
                          className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                          placeholder="Amount"
                        />
                        <button
                          className="focus:outline-none bg-purple-500 px-4 py-2 text-white font-bold w-full"
                          onClick={(e) => {
                            e.preventDefault();
                            setSupplyModal(true);
                            setSupplyAmount(0);
                            deposit();
                          }}
                        >
                          Submit
                        </button>
                      </>
                    )}

                    {borrowModal && (
                      <>
                        <label>
                          <b>Borrow USDC</b>
                          <Image src={usdcLogo} width={60} />
                        </label>
                        <div style={{ color: "white" }}>
                          Use FIL as collateral.
                          <Image src={fileCoinLogo} width={60} alt="filecoin" />
                        </div>
                        <div style={{ color: "white" }}>
                          <b>Current FIL price:</b>
                        </div>
                        <div style={{ color: "white" }}>$1.20</div>
                        <div style={{ color: "white" }}>
                          <b>Current borrow rate:</b>
                        </div>
                        <div style={{ color: "white" }}>6% APR*</div>
                        <div style={{ color: "white" }}>
                          <b>Minimum collateral required:</b>
                        </div>
                        <div style={{ color: "white" }}>150%</div>
                        <label id="amountBorrow">
                          <b>Borrow</b>
                        </label>
                        <div style={{ color: "white", fontSize: "10px" }}>
                          The maximum amount you can borrow is based on the
                          value of your FIL collateral and the platform's
                          collateral ratio.
                        </div>
                        <input
                          id="amountBorrow"
                          type="tel"
                          className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                          placeholder="Amount to borrow"
                        />
                        <label id="amountBorrow">
                          <b>Collateral</b>
                        </label>
                        <div style={{ color: "white", fontSize: "10px" }}>
                          Depositing more FIL than the minimum required provides
                          a buffer against price volatility and liquidation.
                        </div>

                        <input
                          id="amountBorrow"
                          type="tel"
                          className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
                          placeholder="Amount to collateralize"
                        />
                        <div style={{ color: "white", fontSize: "14px" }}>
                          Liquidation Price: $0.00
                        </div>
                        <label></label>

                        <button
                          className="focus:outline-none bg-purple-500 px-4 py-2 text-white font-bold w-full"
                          onClick={(e) => {
                            e.preventDefault();
                            setSupplyModal(true);
                            setSupplyAmount(0);
                            deposit();
                          }}
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </div>
                </form>
                <br />
                <div className="text-center">
                  <button
                    onClick={closeAuthModal}
                    className="bg-neutral-100 text-neutral-400 font-semibold text-xl rounded-md border-b-[3px] px-3 py-1"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span className="text-[2rem] text-gray-400 align-middle w-[90%] mx-auto my-[30px] font-[400]">
          <div className="flex justify-around items-center w-[40%] text-[3rem] font-[500] text-[#0090FF] sm:flex-wrap md:flex-wrap">
            {chainId != null && chainId == "314159" && (
              <>
                FileCoin - Calibration <br />
                Testnet
              </>
            )}{" "}
          </div>
          <br />
          {/* Account : {userAddress} */}

          <br />
          {/* <span className="text-[1.5rem]">Net Worth : $0</span> */}
        </span>
        <Image src={fileLendLogo} width={100} alt="filecoin" />
        <div style={{ color: "white", fontSize: "40px" }}>
          FileLend Lending and Borrowing
        </div>
        <div className="flex sm:flex-wrap md:flex-wrap">
          <div className="flex flex-col mt-6 mx-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <span className="text-[2rem] text-gray-400 align-middle w-[35vw] font-[600] text-[#7e22ce]">
                    Markets
                  </span>
                  <table className="min-w-full text-sm text-gray-400 text-[1.1rem] align-middle w-[35vw] text-center">
                    <thead className="bg-gray-800 text-xs uppercase font-medium">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        >
                          Collateral Asset
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        >
                          Borrow Asset
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        >
                          Supply APY
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        >
                          Borrow APR
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        >
                          {/* Is Collateral */}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800">
                      {tokens.map((token) => {
                        if (token.name == "USDC")
                          return (
                            <tr>
                              <td className="">
                                <span className="flex justify-between items-center px-6 py-4 ">
                                  <Image
                                    className="w-5"
                                    src={usdcLogo}
                                    width={50}
                                    alt="crypto token"
                                  />

                                  <span className="ml-2 font-medium capitalize">
                                    {token.name}
                                  </span>
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="flex justify-between items-center px-6 py-4 ">
                                  <Image
                                    className="w-5"
                                    src={fileCoinLogo}
                                    width={50}
                                    alt="crypto token"
                                  />

                                  <span className="ml-2 font-medium capitalize">
                                    FIL
                                  </span>
                                </span>
                              </td>
                              <td className="px-6 py-4">4.5%</td>
                              <td className="px-6 py-4"> 6%</td>

                              <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                                <button
                                  type="button"
                                  className="focus:outline-none text-white bg-purple-700 mx-4 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                  onClick={() => {
                                    setInteractionAddress(token.addresses[0]);
                                    setSupplyModal(true);
                                    setBorrowModal(false);
                                    console.log(
                                      "===================================="
                                    );
                                    console.log(token.addresses[0]);
                                    console.log(
                                      "===================================="
                                    );
                                    openAuthModal();
                                  }}
                                >
                                  Supply
                                </button>
                                <button
                                  type="button"
                                  className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                                  onClick={(e) => {
                                    setBorrowModal(true);
                                    setSupplyModal(false);
                                    console.log("borrow modal:", borrowModal);
                                    openAuthModal();
                                  }}
                                >
                                  Borrow
                                </button>
                              </td>
                            </tr>
                          );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col mt-6 mx-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <span className="text-[2rem] text-gray-400 align-middle w-[35vw] font-[600] text-[#a16207]">
                    Borrowed Assets
                  </span>
                  <table className="min-w-full text-sm text-gray-400 text-[1.1rem] align-middle w-[35vw] text-center">
                    <thead className="bg-gray-800 text-xs uppercase font-medium">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        >
                          Assets
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        >
                          Loan Health
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        >
                          APR
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        >
                          Loan Amount
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                        ></th>
                      </tr>
                    </thead>

                    <tbody className="bg-gray-800">
                      {tokens.map((token) => {
                        if(token.name == "filecoin")
                        return (
                          <tr>
                            <td className="">
                              <span className="flex justify-between items-center px-6 py-4 ">
                                <Image
                                  className="w-5"
                                  src={fileCoinLogo}
                                  width={50}
                                  alt="crypto token"
                                />
                                <span className="ml-2 font-medium capitalize">
                                  {token.name}
                                </span>
                              </span>
                            </td>
                            <td className="px-6 py-4">
                            <svg
                                className="w-4 fill-current text-green-600"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </td>
                            <td className="px-6 py-4">6%</td>
                            <td className="px-6 py-4">0
                            </td>

                            <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                              <button
                                type="button"
                                className="focus:outline-none text-white bg-yellow-700 mx-4 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                              >
                                Repay
                              </button>

                              <button
                                type="button"
                                className="text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-400 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-yellow-500 dark:focus:ring-yellow-900"
                              >
                                Add Collateral
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
