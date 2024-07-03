import { ReactNode, createContext, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

type StreamResponse = {
    addMessage:()=>void,
    message:string,
    combinedMessages:any[],
    totalCount:number,
    handleInputChange:(event:React.ChangeEvent<HTMLTextAreaElement>)=>void,
    isLoading:boolean,
}
export const ChatContex = createContext<StreamResponse>({
    addMessage:()=>{},
    message:'',
    combinedMessages:[],
    totalCount:0,
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
const [totalCount, setTotalCount] = useState(0);
const [combinedMessages, setCombinedMessages] = useState<any>([]);
const {toast} =useToast()
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchMessages =async()=>{
    const res = await axios.get(`${apiUrl}/api/message/getFileMessages/${userId}/${fileId}`)
    if(res.data.success){
      setCombinedMessages(res.data.messages)
      setTotalCount(res.data.totalCount)
      setIsLoading(false)
    }
      }
      useEffect(()=>{
        if(userId && fileId){
          fetchMessages()
        }
      },[])
const addMessage = async () => {
    const contentText = message
    const optimisticMessage = {
        _id: Date.now().toString(), // Temporary ID
        text:contentText,
        createdAt: new Date().toISOString(),
        isUserMessage: true, // Flag for optimistic update
      };
      const loadingMessage = {
        createdAt: new Date().toISOString(),
        id: 'loading-message',
        isUserMessage: false,
        text: (
          <span className='flex h-full items-center justify-center'>
            <Loader2 className='h-4 w-4 animate-spin' />
          </span>
        ),
      }
      setCombinedMessages((prevMessages:any) => [loadingMessage,optimisticMessage, ...prevMessages]);
      setMessage("");
      const response = await fetch(`${apiUrl}/api/message/create-message/${userId}/${fileId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentText })
    });
    if(!response){
        toast({
            variant : 'destructive',
            description: "Network error occurred. Please try again later.",
        });
    }
 
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = '';

    while (true) {
        const { done, value }:any = await reader?.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setCombinedMessages((prevMessages: any) => {
            const newMessages = prevMessages.map((msg: any) =>
                msg.id === 'loading-message' ? { ...msg, text: result } : msg
            );
            return newMessages;
        });
    }
    fetchMessages()
  };
const handleInputChange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
setMessage(e.target.value)
}


return(
    <ChatContex.Provider value={{message,addMessage,isLoading,handleInputChange,combinedMessages,totalCount}}>
        {children}
    </ChatContex.Provider>
)
}