import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useUser } from "@/context/UserContext";
 
export const { useUploadThing:baseUseUploadThing} =
  generateReactHelpers<OurFileRouter>();

  export const useUploadThing = (endpoint: keyof OurFileRouter) => {
    const { userId } = useUser();
  
    return baseUseUploadThing(endpoint, {
      headers: {
        'x-user-id': userId || '',
      },
    });
  };