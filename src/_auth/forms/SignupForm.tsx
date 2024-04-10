import LoadingButton from "@/components/shared/LoadingButton";
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
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SignupValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";


function SignupForm() {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
   const updatedValues = 
   { name: `${values.first_name} ${values.last_name}`,
     username: values.username,
     email: values.email,
     password: values.password,
    };
    
   const newUser = await createUserAccount(updatedValues);
   
   if(!newUser) {
    toast({
          title: "Sign Up Failed, Please Try Again.",
        })
      }
      console.log(newUser);
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session){
      toast({
          title: "Sign In Failed, Please Try Again.",
        })
    }
    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      navigate('/');
    }
    else{
      return toast({
        title: "Sign Up Failed, Please Try Again.",
      })
    }
   


   
  }
  return (
   <Form {...form}>
    <div className="sm:w-420 flex-center flex-col">
      <div className="flex items-center justify-center gap-2">
      <img className="w-80 h-50" src="/assets/images/logo_complete.png"/>
    </div>

    <h2 className="h3-bold md:h2-bold sm:pt-12"> Create New Account</h2>
    <p className="text-light-3 small-medium md:base-regular">To use Social, please enter your details</p>

    
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <div className="flex items-center gap-4">
         <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input px-3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
         <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input px-3" {...field} />
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
            <FormItem className="flex flex-col">
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
            <FormItem className="flex flex-col">
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
            <FormItem className="flex flex-col">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input px-3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />

        
  {isCreatingAccount ? <LoadingButton></LoadingButton> : (
   <Button type="submit" className="shad-button_primary">Sign Up</Button>
)}

<p className="text-small-regular text-light-2 text-center mt-2">Already have an account?
<Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
</p>
      </form>
      </div>
    </Form>
  )
}

export default SignupForm