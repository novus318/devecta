'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import Dropzone from 'react-dropzone'
import { Cloud, File } from 'lucide-react'
import { Progress } from './ui/progress'

const UploadDropzone = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [uploadProgress, setUploadProgress] = useState(0)

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
    <Dropzone multiple={false} onDrop={(acceptedFiles) => {
      setIsLoading(true)
    const processInterval = startSimulatedProgress()


    
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
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton
