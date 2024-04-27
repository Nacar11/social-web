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
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SignInValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";


function SignInForm() {
  const { toast } = useToast()

  const { checkUser: checkUser} = useUserContext();
  const { checkAuthUserEmailVerification: checkAuthUserEmailVerification} = useUserContext();
  const { mutateAsync: signInAccount, isPending} = useSignInAccount();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session){
      toast({
          title: "Sign In Failed, Please Try Again.",
        })
    }
    const isLoggedIn = await checkUser();
    const isEmailVerified = await checkAuthUserEmailVerification();
    if(isLoggedIn){
      form.reset();
      if(isEmailVerified){
        navigate('/');
      }
      else{
        navigate('/email-verification')
      }
    }
    else{
      return toast({
        title: "Sign Up Failed, Please Try Again.",
      })
    }
   
  }
  return (
    <div className="w-800 md:w-[700px] md:flex flex-col">
    <Form {...form}>
      <div className="md:rounded-lg md:shadow-lg p-12 m-12">
        <div className="flex items-center justify-center">
          <img className="w-60 h-50" src="/assets/images/logo_complete.png"/>
        </div>
          <h2 className="h3-bold md:h2-bold pt-12">Welcome To Social</h2>
          <p className="small-medium md:base-regular py-2 md:mb-5">Login to your account</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 md:gap-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                      <Input className="shad-input"
                      placeholder="Email" 
                      type="email" 
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
                <FormItem>
                  <FormControl>
                    <Input className="shad-input" 
                    type="password" 
                    placeholder="Password"  
                    {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-2 w-full flex items-center justify-end">
              <p className="text-xs md:text-sm whitespace-nowrap cursor-pointer hover:underline underline-offset-2">
                Forget Password?
              </p>

            </div>
        {isPending ? <LoadingButton></LoadingButton> : (
        <Button type="submit" className="shad-button_primary font-bold base-semibold">Log in</Button>
        )}
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400"/>
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400"/>
            </div>
        <Button type="submit" className="shad-button_white gap-2 base-semibold">
          <img src="/assets/images/googleIcon.png" 
            width={20}
            height={20}/>
            Log in with Google
          </Button>
            <p className="small-regular text-center mt-2">Don't have an account?
            <Link to="/sign-up" className="text-primary-500 small-medium md:small-semibold ml-1 base-semibold">Sign up</Link>
              </p>
          </form>
        </div>
      </Form>
    </div>
  )
}
export default SignInForm