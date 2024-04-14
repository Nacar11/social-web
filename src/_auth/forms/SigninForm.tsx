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
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SigninValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";


function SigninForm() {
  const { toast } = useToast()

  const { checkAuthUser} = useUserContext();
  const { mutateAsync: signInAccount, isPending} = useSignInAccount();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
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

    <h2 className="h3-bold md:h2-bold sm:pt-12">Log in</h2>
    <p className="text-light-3 small-medium md:base-regular">Welcome Back! Please enter your details</p>

    
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
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

        
  {isPending ? <LoadingButton></LoadingButton> : (
   <Button type="submit" className="shad-button_primary">Sign In</Button>
)}

<p className="text-small-regular text-light-2 text-center mt-2">Don't have an account?
<Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
</p>
      </form>
      </div>
    </Form>
  )
}

export default SigninForm