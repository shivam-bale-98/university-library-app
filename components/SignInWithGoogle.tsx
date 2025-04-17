"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const SignInWithGoogle = () => {
  return (
    <button
      className="mt-10 mx-auto flex justify-between items-center gap-3 py-3 px-5 bg-[#131314] border border-[#8E918F] rounded-lg text-[#E3E3E3]"
      onClick={() => signIn("google")}
    > 
     <span>
        <Image src="/images/google_logo.svg" alt="google" width={18} height={18}/>
     </span>
      <span>Sign In With Google</span>
    </button>
  );
}

export default SignInWithGoogle
