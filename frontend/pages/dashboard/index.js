import React from "react";
import Image from "next/image";
import fileCoinLogo from "../../assets/img/filecoin.svg";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-900 py-10">
      <span className="text-[2rem] text-gray-400 align-middle w-[90%] mx-auto my-[30px] font-[400]">
        <div className="flex justify-around items-center w-[20%] text-[3rem] font-[500] text-[#0090FF] sm:flex-wrap md:flex-wrap">
          <Image src={fileCoinLogo} width={100} alt="filecoin" />
          Filecoin <br />
          Network
        </div>
        <br />
        Account : 0x00000000
        <br />
        <span className="text-[1.5rem]">Net Worth : $0</span>
      </span>

      <div className="flex align-center sm:flex-wrap md:flex-wrap">
        <div className="flex flex-col mt-6 mx-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <span className="text-[2rem] text-gray-400 align-middle w-[35vw] font-[600] text-[#7e22ce]">
                  Supplied
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
                        Wallet Balance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      >
                        APY
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      >
                        Is Collateral
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800">
                    <tr>
                      <td className="">
                        <span className="flex justify-between items-center px-6 py-4 ">
                          <Image
                            className="w-5"
                            src={fileCoinLogo}
                            width={50}
                            alt="crypto token"
                          />
                          <span className="ml-2 font-medium">FileCoin</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">9</td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-4 fill-current text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>

                      <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-purple-700 mx-4 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                          Supply
                        </button>
                        <button
                          type="button"
                          class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="">
                        <span className="flex justify-between items-center px-6 py-4 ">
                          <Image
                            className="w-5"
                            src={fileCoinLogo}
                            width={50}
                            alt="crypto token"
                          />
                          <span className="ml-2 font-medium">FileCoin</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">9</td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-4 fill-current text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>

                      <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-purple-700 mx-4 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                          Supply
                        </button>
                        <button
                          type="button"
                          class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-6 mx-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <span className="text-[2rem] text-gray-400 align-middle w-[35vw] font-[600] text-[#a16207]">
                  Borrowed
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
                        Wallet Balance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      >
                        APY
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      >
                        Is Collateral
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      ></th>
                    </tr>
                  </thead>

                  <tbody className="bg-gray-800">
                    <tr>
                      <td className="">
                        <span className="flex justify-between items-center px-6 py-4 ">
                          <Image
                            className="w-5"
                            src={fileCoinLogo}
                            width={50}
                            alt="crypto token"
                          />
                          <span className="ml-2 font-medium">FileCoin</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">9</td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-4 fill-current text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>

                      <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-yellow-700 mx-4 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                        >
                          Borrow
                        </button>

                        <button
                          type="button"
                          class="text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-400 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-yellow-500 dark:focus:ring-yellow-900"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="">
                        <span className="flex justify-between items-center px-6 py-4 ">
                          <Image
                            className="w-5"
                            src={fileCoinLogo}
                            width={50}
                            alt="crypto token"
                          />
                          <span className="ml-2 font-medium">FileCoin</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">9</td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-4 fill-current text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>

                      <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-yellow-700 mx-4 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                        >
                          Borrow
                        </button>

                        <button
                          type="button"
                          class="text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-400 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-yellow-500 dark:focus:ring-yellow-900"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex align-center sm:flex-wrap md:flex-wrap">
        <div className="flex flex-col mt-6 mx-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <span className="text-[2rem] text-gray-400 align-middle w-[35vw] font-[600] text-[#7e22ce]">
                  Supply Assets
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
                        Wallet Balance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      >
                        APY
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      >
                        Is Collateral
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800">
                    <tr>
                      <td className="">
                        <span className="flex justify-between items-center px-6 py-4 ">
                          <Image
                            className="w-5"
                            src={fileCoinLogo}
                            width={50}
                            alt="crypto token"
                          />
                          <span className="ml-2 font-medium">FileCoin</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">9</td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-4 fill-current text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>

                      <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-purple-700 mx-4 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                          Supply
                        </button>
                        <button
                          type="button"
                          class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="">
                        <span className="flex justify-between items-center px-6 py-4 ">
                          <Image
                            className="w-5"
                            src={fileCoinLogo}
                            width={50}
                            alt="crypto token"
                          />
                          <span className="ml-2 font-medium">FileCoin</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">9</td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-4 fill-current text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>

                      <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-purple-700 mx-4 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                          Supply
                        </button>
                        <button
                          type="button"
                          class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-6 mx-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <span className="text-[2rem] text-gray-400 align-middle w-[35vw] font-[600] text-[#a16207]">
                  Borrow Assets
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
                        Wallet Balance
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      >
                        APY
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      >
                        Is Collateral
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider border-b-[1px] border-[#878181]"
                      ></th>
                    </tr>
                  </thead>

                  <tbody className="bg-gray-800">
                    <tr>
                      <td className="">
                        <span className="flex justify-between items-center px-6 py-4 ">
                          <Image
                            className="w-5"
                            src={fileCoinLogo}
                            width={50}
                            alt="crypto token"
                          />
                          <span className="ml-2 font-medium">FileCoin</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">9</td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-4 fill-current text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>

                      <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-yellow-700 mx-4 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                        >
                          Borrow
                        </button>

                        <button
                          type="button"
                          class="text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-400 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-yellow-500 dark:focus:ring-yellow-900"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="">
                        <span className="flex justify-between items-center px-6 py-4 ">
                          <Image
                            className="w-5"
                            src={fileCoinLogo}
                            width={50}
                            alt="crypto token"
                          />
                          <span className="ml-2 font-medium">FileCoin</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">0</td>
                      <td className="px-6 py-4">9</td>
                      <td className="px-6 py-4">
                        <svg
                          className="w-4 fill-current text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>

                      <td className="flex justify-between items-center px-6 py-4 whitespace-nowrap ">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-yellow-700 mx-4 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                        >
                          Borrow
                        </button>

                        <button
                          type="button"
                          class="text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-400 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-yellow-500 dark:focus:ring-yellow-900"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
