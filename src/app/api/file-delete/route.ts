
import { NextResponse,NextRequest } from 'next/server';
import { UTApi } from "uploadthing/server";
const utapi = new UTApi();

export const POST = async (req: NextRequest) => {
  const { url } = await req.json();
  const res = await utapi.deleteFiles(url);
  if(res.success){
    return NextResponse.json({ message: 'done' });
  }else{
  return NextResponse.json({ message: 'done' });
  }
};