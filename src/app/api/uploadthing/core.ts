import axios from "axios";
import { NextRequest } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
 

export const ourFileRouter = {

  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })

  .middleware(async ({ req }: { req: NextRequest }) => {
const userId = req.headers.get('x-user-id');
    if (!userId) {
      throw new Error("User ID is required");
    }
    return { userId };
  })
    .onUploadComplete(async ({ metadata, file }) => { 
      const data ={
        name:file.name,
        key:file.key,
        user:metadata.userId,
        url:file.url,
        uploadStatus: 'PROCESSING'
      }
    
        await axios.post(`${apiUrl}/api/file/upload`, data);
    }
    ),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;