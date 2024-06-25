import clientPromise from "@/lib/mongodb";
import { hash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const { mode, firstName, lastName, email, password } = req.body;
  
      if (mode !== "register" || "login") {
        res.status(400).json({ error: "Invalid mode" });
        return;
      }
  if(mode=== "register"){
      if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }
  
      const client = await clientPromise;
      const db = client.db();
  
      const existingUser = await db.collection("users").findOne({ email });
  
      if (existingUser) {
        res.status(409).json({ error: "Email already in use" });
        return;
      }
  
      const result = await db.collection("users").insertOne({
        firstName,
        lastName,
        email,
        password
      });
  
      res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
   } 
else{
    if (!email ||!password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const client = await clientPromise;
    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email });
    if (!existingUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const user = existingUser;
    const hashedPassword = password;
    if (hashedPassword!== user.password) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }
    res.status(200).json({ status:true,message: "User logged in successfully", userId: user._id });
    
}} else {
      res.status(405).json({ error: "Invalid request method" });
    }
  }