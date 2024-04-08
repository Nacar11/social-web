import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


function SignupForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
   <Form {...form}>
    <div className="sm:w-420 flex-center flex-col">
      <div className="flex items-center justify-center gap-2">
      <img className="w-100 h-100" src="/assets/images/logo.png"/>
        <h1 className="h3-bold">Social</h1>
    </div>

    <h2 className="h3-bold md:h2-bold pt-4 sm:pt-12"> Create New Account</h2>
    <p className="text-light-3 small-medium md:base-regular">To use Social, enter your details</p>

    
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input px-3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input px-3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input px-3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input px-3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button className="shad-button_primary"> Button</Button>
      </form>
      </div>
    </Form>
  )
}

export default SignupForm