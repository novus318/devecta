'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import Dropzone from 'react-dropzone'
import { Cloud, File, Loader2 } from 'lucide-react'
import { Progress } from './ui/progress'
import { useUploadThing } from '@/lib/uploadthing'
import {  useToast } from './ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const UploadDropzone = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const {startUpload} = useUploadThing("pdfUploader")

  const startPolling = async (key:any) => {
    let intervalId:any = null;

    const poll = async () => {
            const res = await axios.get(`${apiUrl}/api/file/check/${key}`);

            if (!res.data.success) {
             
            } else {
                clearInterval(intervalId); // Stop polling
                router.push(`/dashboard/${res.data.existingFile._id}`);
            }
    };
    intervalId = setInterval(poll, 200);
};




  const startSimulatedProgress = ()=>{
    setUploadProgress(0)
   const interval = setInterval(()=>{
setUploadProgress((prevProgress)=>{
  if (prevProgress >= 95) {
    clearInterval(interval)
    return 95
  }
  return prevProgress + 5
})
   },500)
   return interval
  }
  
  return (
    <Dropzone multiple={false} onDrop={async(acceptedFiles) => {
      setIsLoading(true)
    const processInterval = startSimulatedProgress()

const res = await startUpload(acceptedFiles)
if (!res) {
  return toast({
    variant : 'destructive',
    title: "Something went wrong",
    description: "Please try again later."
});
}

const [fileResponse]:any = res

const key =fileResponse?.key

if(!key){
  return toast({
    variant : 'destructive',
    title: "Something went wrong",
    description: "Please try again later."
})
}
    startPolling(key)
    clearInterval(processInterval)
      setUploadProgress(100)

    }}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <section>
          <div {...getRootProps()} className='border h-64 m-3 border-dashed border-gray-300 rounded-lg'>
            <div className='flex items-center justify-center h-full w-full'>
              <label htmlFor="dropzone-file" className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
                <div className='flex flex-col items-center pt-5 pb-6 justify-center'>
                  <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                  <p className='text-sm text-zinc-700 mb-2'>
                    <span className='font-semibold'>Click to upload</span> or drag n drop
                  </p>
                  <p className='text-xs text-zinc-500'>PDF (up to 4MB)</p>
                </div>
                {acceptedFiles && acceptedFiles[0] ? (
                  <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                    <div className='px-3 py-2 h-full grid place-items-center'>
                      <File className='h-4 w-4 text-green-500' />
                    </div>
                    <div className='px-3 py-2 h-full truncate text-sm'>
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}
                {isLoading ? (
                  <div className='w-full mt-4 max-w-xs mx-auto'>
                    <Progress className='h-1 w-full bg-zinc-200' value={uploadProgress}/>
                    {uploadProgress === 100 ?(
                      <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
                        <Loader2 className='animate-spin h-3 w-3 text-green-500' />
                      </div>
                    ):null}
                  </div>
                ):null}
              </label>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  )
}

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog open={isOpen} onOpenChange={(v) => {
      if (!v) {
        setIsOpen(v)
      }
    }}>
      <DialogTrigger onClick={() => { setIsOpen(true) }} asChild >
        <Button>
          Upload PDF
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className='hidden'/>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton
