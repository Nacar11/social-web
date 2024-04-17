import LoadingButton from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SignUpValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";

function SignUpForm() {
  const { toast } = useToast()
  const { checkAuthUser} = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();
  const { mutateAsync: signInAccount} = useSignInAccount();
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  })
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
   const updatedValues = 
   { name: `${values.first_name} ${values.last_name}`,
     username: values.username,
     email: values.email,
     password: values.password,
    };
   const newUser = await createUserAccount(updatedValues);
   
  //  console.log(typeof(newUser))
   if(newUser && newUser.Error) {
    toast({
          title: "Sign Up Failed, Please Try Again.",
          description: `${newUser.Error}`
        })
        return
      }
    // const session = await signInAccount({
    //   email: values.email,
    //   password: values.password
    // })

    // if(!session){
    //   toast({
    //       title: "Sign In Failed, Please Try Again.",
    //     })
    // }
    // const isLoggedIn = await checkAuthUser();
    // if(isLoggedIn){
    //   form.reset();
    //   navigate('/');
    // }
    // else{
    //   return toast({
    //     title: "Sign Up Failed, Please Try Again.",
    //   })
    // }
  }
  return (
    <div className="w-800 md:w-[700px] md:flex flex-col">
   <Form {...form}>
    <div className="md:rounded-lg md:shadow-lg p-12 m-12">
      <div className="flex items-center justify-center">
      <img className="w-60 h-50" src="/assets/images/logo_complete.png"/>
    </div>

    <h2 className="h3-bold md:h2-bold sm:pt-12">Create New Account</h2>
    <p className="small-medium md:base-regular py-2 md:mb-5">To access Social, please register your details</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-4">
         <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                type="text" 
                className="shad-input" 
                placeholder="First Name" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                type="text" 
                className="shad-input"
                placeholder="Last Name"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                type="text"
                className="shad-input"
                placeholder="Username" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                 <Input 
                type="email"
                className="shad-input"
                placeholder="Email" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                <Input 
                type="password" 
                className="shad-input"
                placeholder="Password" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
         <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                <Input 
                type="password" 
                className="shad-input"
                placeholder="Confirm Password" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
  {isCreatingAccount ? <LoadingButton></LoadingButton> : (
   <Button type="submit" className="shad-button_primary">Sign Up</Button>
    )}
  <p className="small-regular text-center mt-2">Already have an account?
    <Link to="/sign-in" className="text-primary-500 small-medium md:small-semibold ml-1 base-semibold">Log in</Link>
  </p>
      </form>
      </div>
    </Form>
    </div>
  )
}

export default SignUpForm