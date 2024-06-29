'use client'
import { ChevronDown, ChevronUp, Loader2, RotateCw, Search } from 'lucide-react';
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useToast } from './ui/use-toast';

import { useResizeDetector } from 'react-resize-detector';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import SimpleBar from 'simplebar-react'
import PdfFullScreen from './PdfFullScreen';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`

interface PdfRendererProps {
    url: string;

}
const PdfRenderer = ({ url }: PdfRendererProps) => {
    const { toast } = useToast()
    const { width, ref } = useResizeDetector()
    const [numPages, setNumPages] = useState()
    const [renderedScale, setRenderedScale] = useState<any>(null)
    const [currPages, setCurrPages] = useState(1)
    const [scale, setScale] = useState(1)
    const [rotation, setRotation] = useState(0)

    const isloading= renderedScale !==scale
    const CustomPageValidator = z.object({
        page: z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages!)
    })
    type TCustomPageValidator = z.infer<typeof CustomPageValidator>

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<TCustomPageValidator>({
        defaultValues: {
            page: '1'
        },
        resolver: zodResolver(CustomPageValidator)
    })
    const handlePageSubmit = ({ page }: TCustomPageValidator) => {
        setCurrPages(Number(page))
        setValue('page', String(page))
    }


    return (
        <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
            <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2'>
                <div className='flex items-center gap-1.5'>
                    <Button variant='ghost' aria-label='previous page'
                        disabled={currPages <= 1}
                        onClick={() => {
                            setCurrPages((prev: any) => (prev - 1 > 1 ? prev - 1 : 1))
                            setValue('page',String(currPages -1))
                        }}>
                        <ChevronDown className='h-4 w-4' />
                    </Button>
                    <div className='flex items-center gap-1.5'>
                        <Input {...register('page')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(handlePageSubmit)()
                                }
                            }} className={cn('w-12 h-8', errors.page && 'focus-visible:ring-red-400')} />
                        <p className='text-zinc-700 text-sm space-x-1'>
                            <span>/</span>
                            <span>{numPages ?? 'x'}</span>
                        </p>
                    </div>
                    <Button variant='ghost' aria-label='previous page'
                        disabled={numPages === undefined || currPages === numPages}
                        onClick={() => {
                            setCurrPages((prev: any) => (prev + 1 > numPages! ? numPages! : prev + 1))
                            setValue('page',String(currPages +1))
                        }}>
                        <ChevronUp className='h-4 w-4' />
                    </Button>
                </div>
                <div className='space-x-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-label='zoom' variant='ghost' className='gap-1.5'>
                                <Search className='h-4 w-4' />
                                {scale * 100}%<ChevronDown className='h-3 w-3 opacity-50' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => setScale(1)}>100%</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScale(1.5)}>150%</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScale(2)}>200%</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setScale(2.5)}>250%</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        onClick={(prev: any) => setRotation((prev) => prev + 90)}
                        aria-label='rotate 90 degrees' variant='ghost'>
                        <RotateCw className='h-4 w-4' />
                    </Button>
                    <PdfFullScreen url={url}/>
                </div>
            </div>

            <div className='flex-1 w-full max-h-screen'>
                <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)]'>
                    <div ref={ref}>
                        <Document loading={
                            <div className='flex justify-center'>
                                <Loader2 className='h-8 w-8 my-24 text-green-600 animate-spin' />
                            </div>
                        }
                        noData={
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
                            {isloading && renderedScale ?
                                <Page
                                key={"@"+renderedScale} width={width ? width : 1} pageNumber={currPages} scale={scale} rotate={rotation} />:null}
                                <Page
                                key={"@"+scale} width={width ? width : 1} className={cn(isloading ? 'hidden':'')} pageNumber={currPages} scale={scale} rotate={rotation}
                                loading={
                                    <div className='flex justify-center'>
                                        <Loader2 className='h-6 w-6 my-24 text-green-600 animate-spin' />
                                    </div>
                                } 
                                onRenderSuccess={()=> setRenderedScale(scale)}/>
                        </Document>
                    </div>
                </SimpleBar>
            </div>
        </div>
    )
}

export default PdfRenderer
