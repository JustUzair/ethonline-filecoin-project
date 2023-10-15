import { useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import dynamic from "next/dynamic";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { NotificationProvider } from "web3uikit";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
// import { filecoin } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MoralisProvider } from "react-moralis";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "../styles/globals.css";
import Script from "next/script";

const filecoin = {
  id: 314,
  name: "Filecoin",
  network: "filecoin",

  rpcUrls: {
    public: { http: ["https://rpc.ankr.com/filecoin"] },
  },
  blockExplorers: {
    default: {
      name: "Filecoin - Mainnet",
      url: "https://filscan.io",
    },
  },

  testnet: false,
};
const filecoinCalibrationTestnet = {
  id: 314159,
  name: "Filecoin-Calibration",
  network: "filecoin-testnet",

  rpcUrls: {
    public: { http: ["https://filecoin-calibration.chainup.net/rpc/v1"] },
  },
  blockExplorers: {
    default: {
      name: "Filecoin - Calibration testnet",
      url: "https://calibration.filscan.io",
    },
  },

  testnet: true,
};
// Testnet faucet  :: https://faucet.calibration.fildev.network/
const { chains, provider } = configureChains(
  [filecoin, filecoinCalibrationTestnet],
  [
    // publicProvider(),
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.public.http[0] }),
    }),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "File-Lend",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {}, []);
  const router = useRouter();
  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossOrigin="anonymous"
      ></Script>

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossOrigin="anonymous"
        defer
      ></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.min.js"
        integrity="sha512-1/RvZTcCDEUjY/CypiMz+iqqtaoQfAITmNSJY17Myp4Ms5mdxPS5UV7iOfdZoxcGhzFbOm6sntTKJppjvuhg4g=="
        crossOrigin="anonymous"
      ></Script>

      <Head>
        <title>Home</title>
        <meta property="og:title" content="Home" key="title" />
        <link
          rel="stylesheet"
          href="https://assets.codepen.io/7773162/swiper-bundle.min.css"
        />
      </Head>
      <div className="cursor"></div>

      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <MoralisProvider initializeOnMount={false}>
            <Navbar></Navbar>
            <NotificationProvider>
              <AnimatePresence mode="wait" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.25,
                    duration: 0.5,
                  },
                }}
                exit={{
                  opacity: 0,
                  backgroundColor: "transparent",

                  transition: {
                    delay: 0.25,
                    ease: "easeInOut",
                  },
                }}
                key={router.route}
                className="content"
              >
                <div className="wrapper">
                  <Component {...pageProps} />
                </div>
              </motion.div>
            </NotificationProvider>
          </MoralisProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
