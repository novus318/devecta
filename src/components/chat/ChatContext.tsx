import { ReactNode, createContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";

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
    userId:any,
    children:ReactNode
}

export const ChatContextProvider = ({children,fileId,userId}:Props) => {
const [message,setMessage]=useState('')
const [isLoading,setIsLoading]=useState(false)
const {toast} =useToast()
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const addMessage = async () => {
    const contentText = message
      const response:any = await axios.post(`${apiUrl}/api/message/create-message/${userId}/${fileId}`, {
        contentText
      });
    if(!response){
        toast({
            variant : 'destructive',
            description: "Network error occurred. Please try again later.",
        });
    }
    return response.body
  };
const handleInputChange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
setMessage(e.target.value)
}


return(
    <ChatContex.Provider value={{message,addMessage,isLoading,handleInputChange}}>
        {children}
    </ChatContex.Provider>
)
}