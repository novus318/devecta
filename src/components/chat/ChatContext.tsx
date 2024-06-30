import { ReactNode, createContext, useState } from "react";
import { useToast } from "../ui/use-toast";

type StreamResponse = {
    addMessage:()=>void,
    message:string,
    handleInputChange:(event:React.ChangeEvent<HTMLTextAreaElement>)=>void,
    isLoading:boolean,
}
export const ChatContex = createContext<StreamResponse>({
    addMessage:()=>{},
    message:'',
    handleInputChange:()=>{},
    isLoading:false,
})

interface Props{
    fileId:string,
    children:ReactNode
}

export const ChatContextProvider = ({children,fileId}:Props) => {
const [message,setMessage]=useState('')
const [isLoading,setIsLoading]=useState(false)
const {toast} =useToast()

const addMessage= ()=>{

}
const handleInputChange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
setMessage(e.target.value)
}


return(
    <ChatContex.Provider value={{message,addMessage,isLoading,handleInputChange}}>
        {children}
    </ChatContex.Provider>
)
}