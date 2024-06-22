'use client'
import { GlobalContext } from "@/Context/AppContext"
import { useState } from "react"
import { formatAddress } from "@/Utils/format"
import { ethers } from "ethers"
export const SendModal = () => {
    const { setIsSend } = GlobalContext()
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [receiveAddress, setReceiveAddress] = useState('')
    const [comment, setComment] = useState('')
    const [amount,setAmount] = useState(0)

    const handleSendETH = async() => {
        try {
            
        } catch (error) {
            
        }
    }
    return(
    <div className="inset-0 fixed bg-black/15 bg-opacity-100 w-[100%] z-[99999999] min-h-screen h-auto backdrop-blur-sm flex ">
        <div className="w-[100%] py-4 px-4 bg-white rounded-t-3xl h-auto mt-[180px]">
            <div className="">
                <div onClick={() => setIsSend(false)} className="w-20 rounded-xl text-[14px] font-light flex items-center justify-center h-9 bg-black/25">
                    <p className="text-black">esc</p>
                </div>
            </div>
            {
                isConfirmed ? 
            <div className="mt-8 px-2 py-3 bg-red-600/0 h-[85%] flex flex-col rounded-xl w-[99%] ml-auto mr-auto">
               <div className="w-[100%] h-12 bg-slate-50/0 rounded-xl py-3 px-6">
                <p className="text-[16px] font-light">{`to: ${formatAddress(receiveAddress)}`}</p>
               </div>
               <div className="w-[98%] mt-4 ml-auto mr-auto h-[230px] py-3 px-2 flex flex-col items-center justify-center rounded-xl bg-slate-400/5">
                <div className="w-[100%] ml-auto mr-auto rounded-xl  flex  h-16">
                 <input onChange={(e) => setAmount(e.target.value)} type="number" className="outline-none bg-transparent text-end text-4xl ml- w-[50%] h-[100%] " value={amount} />
                 <p className="mt-5 text-xl font-light ml-1 mr-auto">ETH</p>
                </div>
               </div>
               <div>
               <div className="mt-10 w-[100%] ml-auto mr-auto">
             <div className="w-[98%] ml-auto mr-auto rounded-xl bg-white/90 h-14">
                 <button className="outline-none bg-transparent w-[100%] h-[100%] text-black  py-2 px-4">Send</button>
             </div>
            </div>
               </div>
            </div> : 
            <div className="mt-8 px-2 py-3 bg-red-600/0 h-[85%] flex flex-col rounded-xl w-[99%] ml-auto mr-auto">
            <div className="mt-12 w-[100%] ml-auto mr-auto">
             <div className="w-[100%] ml-auto mr-auto rounded-xl border border-black bg-white/10 h-16">
                 <input onChange={(e) => setReceiveAddress(e.target.value)} type="text" className="outline-none bg-transparent w-[100%] h-[100%]  py-2 px-4" placeholder="Address" />
             </div>
            </div>
            <div className="mt-4 w-[100%] ml-auto mr-auto">
             <div className="w-[100%] ml-auto mr-auto rounded-xl border border-black bg-white/10 h-16">
                 <input type="text" className="outline-none bg-transparent w-[100%] h-[100%]  py-2 px-4" placeholder="Comment" />
             </div>
            </div>
            <div className="mt-20 w-[100%] ml-auto mr-auto">
             <div className="w-[97%] ml-auto mr-auto rounded-xl bg-black/90 h-14">
                 <button onClick={() => {
                    if(receiveAddress.length < 42) {
                        alert('not Valid ETH Address')
                    } else {
                        setIsConfirmed(true)
                    }
                 }} className="outline-none bg-transparent w-[100%] h-[100%] text-white  py-2 px-4">Continue</button>
             </div>
            </div>
         </div>
            }
        </div>
    </div>
)
}