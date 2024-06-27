import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 shadow-md backdrop-blur px-7 py-2 transition-all hover:border-gray-300 
  bg-white/75">
          <p className="text-sm font-semibold text-gray-700">devecta is live Now !</p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Scan with your <span className="text-green-600">Documents</span> in seconds.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg z-10">
          devecta allows you to have conversations with any document, Just by asking questions about it. Upload and start right away.
        </p>
        <Link href='/dashboard' target="_blank" className={buttonVariants({
          size: 'lg',
          className: 'mt-5 z-10'
        })}>
          Try it Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>
      <div>
        <div className="relative isolate">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              style={{
                clipPath: 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)'
              }} className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a36a16] to-[#4a16a3] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image alt="preview" src='/dashboard-preview.jpg' width={1364} height={866} quality={100}
              className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10" />
            </div>
          </div>
          <div>
            </div>
            </div>
        <div className="relative isolate">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              style={{
                clipPath: 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)'
              }} className="relative right-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a36a16] to-[#4a16a3] opacity-20 sm:right-[calc(50%-36rem)] sm:w-[72.1875rem]" />
          </div>
        </div>
        </div>

      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
<div className="mb-12 px-6 lg:px-8">
  <div className="mx-auto max-w-2xl sm:text-center">
    <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
     Get started in <span className="text-green-600">seconds...</span>
    </h2>
    <p className="mt-4 text-lg text-gray-600">
      devecta allows you to have conversations with any document, Just by asking questions about it. Upload and start right away.
    </p>
  </div>
</div>
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
         <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">First thing</span>
              <span className="text-xl font-semibold">Sign Up for an account</span>
              <span className="mt-2 text-zinc-700">Starting out with Free plan or our {''}
                <Link href='' className="text-green-700 underline underline-offset-2">
                Pro plan</Link>
              </span>
              </div>
         </li>
         <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Next</span>
              <span className="text-xl font-semibold">Upload your PDF</span>
              <span className="mt-2 text-zinc-700">We&apos;ll process your file & make it ready for you to chat with.
          
              </span>
              </div>
         </li>
         <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Last thing</span>
              <span className="text-xl font-semibold">Start with your chat</span>
              <span className="mt-2 text-zinc-700">It&apos;s that easy & takes a couple of seconds.
          
              </span>
              </div>
         </li>
        </ol>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-mt-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image alt="Uploading" src='/dashboard-preview.jpg' width={1419} height={732} quality={100}
              className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10" />
            </div>
          </div>
          <div>
            </div>
            </div>
      </div>
    </>
  );
}
