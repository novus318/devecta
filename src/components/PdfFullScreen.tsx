'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Expand, Loader2 } from 'lucide-react'
import SimpleBar from 'simplebar-react'
import { Document, Page } from 'react-pdf'
import { useToast } from './ui/use-toast'
import { useResizeDetector } from 'react-resize-detector'


interface PdfFullScreenProps {
    url: string
}
const PdfFullScreen = ({ url }: PdfFullScreenProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [numPages, setNumPages] = useState()
    const { width, ref } = useResizeDetector()
    const { toast } = useToast()
    return (
        <Dialog open={isOpen} onOpenChange={(v) => {
            if (!v) {
                setIsOpen(v)
            }
        }}>
            <DialogTrigger
                onClick={() => setIsOpen(true)} asChild>
                <Button
                    aria-label='full screen' variant='ghost' className='gap-1.5'>
                    <Expand className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-7xl w-full'>
                <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)] mt-6'>
                    <div ref={ref}>
                        <Document loading={
                            <div className='flex justify-center'>
                                <Loader2 className='h-8 w-8 my-24 text-green-600 animate-spin' />
                            </div>
                        }
                            onLoadError={() => {
                                toast({
                                    variant: 'destructive',
                                    title: 'Error Loading PDF',
                                    description: 'Something went wrong',
                                })
                            }}
                            onLoadSuccess={({ numPages }: any) => setNumPages(numPages)}
                            file={url} className='max-h-full'>
                            {new Array(numPages).fill(0).map((_, i) => (
                                <Page width={width ? width : 1} className='' pageNumber={i + 1} key={i} />
                            ))}
                        </Document>
                    </div>
                </SimpleBar>
            </DialogContent>
        </Dialog>
    )
}

export default PdfFullScreen
