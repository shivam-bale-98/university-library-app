"use client";
import AuthForm from "@/components/AuthForm";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validation";
import React from "react";

const Page = () => {

  

  return (
    <>
      <AuthForm
        type="SIGN_IN"
        schema={signInSchema}
        defaultValues={{
          email: "",
          password: "",
        }}
        onSubmit={signInWithCredentials}
      />

      <SignInWithGoogle/>
    </>
  );
};

export default Page;
