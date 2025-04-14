"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "./ui/ImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {

  const isSignIn = type === 'SIGN_IN';
  const router = useRouter();

  // 1. Define your form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    
    console.log("submit data", result);
    if(result.success) {
      toast("Success", {
        description: isSignIn ? "You have successfully signed In"
                              : "You have successfully signed Up"
      });
      
      console.log("sign in successfully");
      router.push("/");
    } else {
      toast(`Error ${isSignIn ? "Signing In" : "Signing Up"}`, {
        description: result.error ?? "An error occured.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 ">

      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome Back to the BookWise" : "Create your Library Account"}
      </h1>

      <p className="text-light-100">
        {isSignIn ? "Access the vast collection of resources, and stay updated" : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full">
          {Object?.keys(defaultValues).map((field) => (
            <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES] }
                </FormLabel>
                <FormControl>
                  {field.name === 'universityCard' ? (
                    <ImageUpload onFileChange={field.onChange}/>
                  ) : (
                    <Input required type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}  {...field}  className="form-input"/>
                  ) }
                  
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          ))}
          <Button type="submit" className="form-btn">{isSignIn ? "Sign In" : "Sign Up"}</Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
         {isSignIn ? "Create an account" : "Already have an account?"}

         <Link href={isSignIn ? "/sign-up" : "sign-in"} className="font-bold text-primary">
           {isSignIn ? "Create an account" : "Sign in"}
         </Link>
      </p>
    </div>
  );
};

export default AuthForm;
