"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { AuthCredentials } from "@/types";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";



export const signInWithCredentials = async (
    params : Pick<AuthCredentials, "email" | "password">,
) => {
    const {email, password} = params;

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if(result?.error) {
            return { success: false, error: result.error }
        }

        return { success: true };
    } catch(error) {
        console.log(error, "SignIn error");
        return {success: false , error: "SignIn Error"}
    }
};


export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, universityCard, password } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);


  if(existingUser.length > 0) {
     return { success: false, error: "User already exists" }
  }

  // hash users password for security / second value refers to the complexity at which passwords are hashed
  const hashedPassword = await hash(password, 10);
 
  try {
      
   await db.insert(users).values({
    fullName,
    email,
    universityId,
    password:hashedPassword,
    universityCard
   });
     
    await signInWithCredentials({email, password}); 

    return {success: true}
  } catch(error) {
    console.log(error);
    return {success : false, error: "Signup error"}
  }
};
