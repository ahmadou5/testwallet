"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHandHoldingWater } from "react-icons/fa";
import {
  IoArrowDown,
  IoArrowForward,
  IoArrowUp,
  IoKey,
  IoScan,
  IoSettings,
} from "react-icons/io5";
import { Menu } from "./menu";
import { SendModal } from "../Modals/SendModal";
import { GlobalContext } from "@/Context/AppContext";
import { ReceiveModal } from "../Modals/ReceiveModal";
import { Supabase } from "@/Utils/supabasedb";
import { Welcome } from "../Modals/WelcomeModal";
import { formatAddress, truncate, handleCopy } from "@/Utils/format";
import { ethers, formatEther } from "ethers";
import { useGetTransaction } from "@/hooks/useGetTransaction";
import { TransactionModal } from "../Modals/TransactionCard";
import { TokenModal } from "../Modals/Token";
import { PhraseModal } from "../Modals/PhraseModal";
import { PkeyModal } from "../Modals/PrivateKeyModal";
import { ChainSelector } from "../Modals/ChainSelector";
import { useGetUserBalance } from "@/hooks/useFetch";
import { FaucetModal } from "../Modals/FaucetModal";

export const Home2 = () => {
  const {
    user,
    setUser,
    isTokenModal,
    setIsTokenModal,
    userAddress,
    ethPrice,
    ethBalance,
    setEthBalance,
    welcome,
    isWallet,
    isTokens,
    isHistory,
    isTCard,setIsTCard,
    tokens,
    history, 
    setHistory,
    setTokens,
    providerName,
    providerImg,
    providerURL,
    providerTick,
    setIsHistory,
    setIsTokens,
    setIsWallet,
    isChainList,
    setIsChainList,
  } = GlobalContext();
 
  const Provider = new ethers.JsonRpcProvider(
    `${providerURL}`
  );
  const { isSend, isReceive, isScan, isFaucet,setIsFaucet, setIsScan, hDate,setHDate, isPrivate,setIsPrivate, hHash,setHHash, isPhrase,setIsPhrase, hAmount,setHAmount, hReceiver,setHReceiver,hSender,setHSender, hIsSend,setHIsSend, setIsReceive, setIsSend } =
    GlobalContext();
    const trx = useGetUserBalance()

    console.log(trx)
  const transaction = useGetTransaction()
  console.log(transaction)
 
  const multiple = (x, y) => {
    return x * y;
  };
  useEffect(() => {
    const getUserTransaction = async () => {
      const { data, error } = await Supabase.from("History")
        .select("*")
        .eq("id", user?.initDataUnsafe?.user?.id);

      if (data) {
        console.log(data, "userData");
        setHistory(data);
      }
      if (error) {
        console.log(error);
       // alert(error);
      }
    };
    getUserTransaction();
    const getUserTokens = async() => {
      const { data, error } = await Supabase
      .from("Tokens")
      .select("*")
      .eq("id", user?.initDataUnsafe?.user?.id);

    if (data) {
      console.log(data, "user Tokens Data");
      setTokens(data);
    }
    if (error) {
      console.log(error);
      //alert(error);
    }
    }
    getUserTokens()
   
    console.log("useTelegram");
    function initTg() {
      if (
        typeof window !== "undefined" &&
        window.Telegram &&
        window.Telegram.WebApp
      ) {
        console.log("Telegram WebApp is set");
        const tgData = window.Telegram.WebApp;
        setUser(tgData);
      } else {
        console.log("Telegram WebApp is undefined, retrying…");
        console.log(user);
        setTimeout(initTg, 500);
      }
    }
    initTg();
   
    Provider.on("block", getUserTransaction);
  }, []);
  
  return (
    <div className="w-[100%] py-2 px-1 h-auto bg-red-400/0">
      {isTokens && (
        <>
          <div className="bg-gothic-950/0 mt-1 flex  mb-2 flex-col items-center justify-center w-[100%] h-auto">
            <div className="w-[40%] mt-4 ml-auto mr-auto flex items-center justify-center bg-black/25 h-10 rounded-3xl ">
              <p className="text-black font-bold">Settings</p>
            </div>
            <div className="w-[96%] mt-2 py-2 px-2 h-auto mb-20 rounded-md bg-black/0">
            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
              
              <div onClick={() => setIsPhrase(true)} className="bg-white/0 border-b-black/5 border-t-black/5 border border-white/0 w-[99%] flex items-center justify-center rounded-sm h-[70px]">
                <div className="ml-[5px]   text-black  mr-auto px-3">
                  <p className="text-[19] font-bold mb-1.5">Show Recovery Phrases</p>
                </div>
              </div>  
              <div onClick={() => setIsPrivate(true)} className="bg-white/0 border-b-black/5 border-t-black/5 border border-white/0 w-[99%] flex items-center justify-center rounded-sm h-[70px]">
                <div className="ml-[5px]   text-black  mr-auto px-3">
                  <p className="text-[19] font-bold mb-1.5">Show Private Key</p>
                </div>
              </div>  
                
            </div>
              
            </div>
          </div>
        </>
      )}
      {isHistory && (
        <>
          <div className="bg-gothic-950/0 mt-1 flex  mb-2 flex-col items-center justify-center w-[100%] h-auto">
            <div className="w-[40%] mt-4 ml-auto mr-auto flex items-center justify-center bg-black/25 h-10 rounded-3xl ">
              <p className="text-black font-bold">Transactions</p>
            </div>
            <div className="w-[96%] mt-2 py-2 px-2 h-auto mb-20 rounded-md bg-black/0">
            
              {history &&
                history.map((item, i) => (
                  <>
                   <div className="bg-gothic-950/0 mt-4 mb-4 flex items-center justify-center w-[100%] h-auto">
                      <div onClick={() => {
                        setIsTCard(true)
                        setHSender(item.sender)
                        setHIsSend(item.isSend)
                        setHAmount(item.amount)
                        setHReceiver(item.receiver)
                        setHDate(item.created_at)
                        setHHash(item.hash)
                      }} className=" w-[100%] bg-white/60 flex items-center justify-start rounded-full h-[68px]">
                        <div className={`${item.isSend === true ? 'bg-red-600/35' : 'bg-green-500/35'} text-gothic-600/85 w-[49px] flex items-center justify-center h-12 ml-[12px] mr-[12px] rounded-full`}>
                          {item.isSend === true ? <IoArrowUp className="text-black text-xl"/> : <IoArrowDown className="text-black text-xl" />}
                        </div>
                        <div className="ml-1 mt-1 text-black/85 mr-1 px-0">
                        <p className="text-[17px] font-semibold">{`${item.isSend === true ? 'Transfer' : 'Receive'}`}</p>
                          <p className="text-sm mb-1.5">{`${item.isSend === true ? 'to' : 'from'} : ${formatAddress(
                            item.receiver
                          )}`}</p>
                        </div>
                        <div className="bg-gothic-600/0 w-[49px] flex items-center justify-center h-12 ml-auto mr-7 rounded-full">
                          <p className={`text-md ${item.isSend === true ? 'text-red-500' : 'text-green-500'}`}>{`${item.isSend === true ? '-' : '+'}${item.amount}`}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </>
      )}
      {isWallet && (
        <>
          <div className="bg-gothic-950/0 mt-1 flex  mb-2 flex-col items-center justify-center w-[100%] h-auto">
            <div className="mt-1 mb-0 w-full">
             <div onClick={() => setIsChainList(true)} className="bg-black/10 text-black mt-1 rounded-xl p-1.5 flex ml-3 mr-auto w-[51%] h-9">
             <img src={providerImg} className="mr-1 rounded-full"/>
              <div>{providerName}</div>
              <MdKeyboardArrowDown className="text-2xl ml-auto mr-1 mb-2" />
             </div>
            </div>
            <div className="bg-s-gray-300/0 w-[90%] flex items-center justify-center rounded-3xl h-[120px]">
              <p className="text-4xl  text-black/85">{`$${multiple(
                ethBalance,
                ethPrice
              )
                .toString()
                .slice(0, 6)}`}</p>
            </div>
            <div
              onClick={() => handleCopy(userAddress)}
              className="w-[185px] mb-5  ml-auto mr-auto py-1 mt-2 px-3 flex  items-center justify-center bg-white/10 rounded-full h-9"
            >
              <p className="text-black/60 font-light ml-auto mr-auto ">
                {formatAddress(userAddress)}
              </p>
            </div>
          </div>
          <div className="bg-gothic-950/0 mt-3 flex items-center justify-center w-[100%] h-auto">
            <div className="bg-gothic-300/0 w-[90%] flex items-center justify-center rounded-3xl h-[100px]">
              <div
                onClick={() => setIsSend(true)}
                className="text-xl bg-white/45 flex flex-col items-center justify-center rounded-3xl h-20 w-20 ml-auto mr-auto  text-white/60"
              >
                <IoArrowUp className="text-2xl text-black/85" />
                <p className="text-sm mt-2.5 text-black/85 font-light ">Send</p>
              </div>
              <div
                onClick={() => setIsReceive(true)}
                className="text-3xl  bg-white/45 flex flex-col items-center justify-center rounded-3xl h-20 w-20 ml-auto mr-auto  text-white/60"
              >
                <IoArrowDown className="text-2xl text-black/85" />
                <p className="text-sm mt-2.5 text-black/85 font-light ">
                  Receive
                </p>
              </div>
              <div
              onClick={() => setIsFaucet(true)} 
              className="text-xl  bg-white/45 flex flex-col items-center justify-center rounded-3xl h-20 w-20 ml-auto mr-auto  text-white/60">
                <FaHandHoldingWater className="text-2xl text-black/85" />
                <p className="text-sm mt-2.5 text-black/85 font-light ">Faucets</p>
              </div>
            </div>
          </div>
          {/**<div className="bg-gothic-950/0 mt-16 flex items-center justify-center w-[100%] h-auto">
            <div className="bg-gothic-300/5 w-[90%] flex items-center justify-center rounded-3xl h-[100px]">
                <div className="bg-gothic-600/85 w-9 flex items-center justify-center h-9 ml-[40px] mr-[20px] rounded-full">
                    <IoKey className="text-white/90 text-2xl" />
                </div>
                <div className="ml-[10px] mr-auto px-3">
                    <p className="text-sm">BackUp Your Seed Phrases</p>
                </div>
            </div>
    </div> **/}
          <div className="bg-gothic-950/0 mt-8 flex flex-col items-center justify-center w-[100%] h-auto">
            <div className="bg-white/55 w-[90%] mb-3 flex items-center justify-center rounded-3xl h-[70px]">
              <div className="bg-gothic-600/85 w-12 flex items-center justify-center h-12 ml-[23px] mr-[10px] rounded-full">
                <img
                  src={providerImg}
                  className="text-white/90 w-full h-full rounded-full text-2xl"
                />
              </div>
              <div className="ml-[5px] text-black/85 mr-auto px-3">
                <p className="text-sm mb-1.5">{providerTick}</p>
                <p className="text-sm">{`$${ethPrice}`}</p>
              </div>
              <div className="ml-[10px]  text-black/85 mr-4 px-3">
                <p className="text-[23] mb-1.5">
                  {ethBalance.toString().slice(0, 4)}
                </p>
              </div>
            </div>
            {
              tokens && tokens.map((token,i) => (
                <>
                <div className="bg-white/55 mt-2 mb-2 w-[90%] flex items-center justify-center rounded-3xl h-[70px]">
              <div className="bg-gothic-600/85 w-12 flex items-center justify-center h-12 ml-[23px] mr-[10px] rounded-full">
                <img
                  src={'./assets/wewe.png'}
                  className="text-white/90 w-full h-full rounded-full text-2xl"
                />
              </div>
              <div className="ml-[5px] text-black/85 mr-auto px-3">
                <p className="text-sm mb-1.5">{token.ticker}</p>
                <p className="text-sm">{`$${0}`}</p>
              </div>
              <div className="ml-[10px]  text-black/85 mr-4 px-3">
                <p className="text-[23] mb-1.5">
                  {0}
                </p>
              </div>
            </div>
                </>
              ))
            }
          <div 
                onClick={() => setIsTokenModal(true)}
                className={`w-[205px] ${tokens?.length > 0 ? 'mt-[30px]' : 'mt-[80px]'}   ${tokens?.length > 0 ? 'mb-[100px]' : 'mb-[30px]'}   ml-auto mr-auto py-1 mb-5 px-3 flex  items-center justify-center bg-black/80 rounded-full h-11`}
              >
                <p className="text-white font-light text-[14px] ml-auto mr-auto ">
                  Add Custom token
                </p>
              </div>
          </div>
          
        </>
      )}
      <div className="mt-auto mb-auto">
        <Menu />
      </div>
      {isFaucet && <FaucetModal/>}
      {isChainList && <ChainSelector/>}
      {isPrivate && <PkeyModal />}
      {isPhrase && <PhraseModal />}
      {isTokenModal && <TokenModal />}
      {isTCard && <TransactionModal />}
      {isSend && <SendModal />}
      {welcome && <Welcome />}
      {isReceive && <ReceiveModal />}
    </div>
  );
};
