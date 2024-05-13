import LoadingButton from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useSendEmailVerification } from '@/lib/react-query/queriesAndMutations';
import { useEffect, useState } from 'react';

const EmailVerification = () => {
  const [seconds, setSeconds] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);
  const { toast } = useToast()
  const { user } = useUserContext();
  const {mutate: sendEmailVerification, isSuccess, isPending } = useSendEmailVerification();
    useEffect(() => {
    if(isSuccess){
        toast({
          duration: 5000,
          title: "Email Verification Link Sent",
          description: `The verification link has been sent to ${user.email}. Please check your email inbox and spam folder if you don't see it in your inbox.`,
      });
      setIsDisabled(true); 
      const interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            setIsDisabled(false); 
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }
  },
  [isSuccess]
  )
  return (
    
    <Card className="w-[350px] flex-start flex-col flex-1 p-8">
        <div className="p-2 rounded-md border-gray-400 border">
      <CardHeader className="flex flex-col items-center justify-center">
          <img src="/assets/images/emailVerification.svg"
                alt="logo"
                className=""
                width={100}
                height={100}
                />
        <CardTitle className="py-4 h3-bold">Please Verify your Email</CardTitle>
        <CardDescription>We just sent an email to {user.email}.</CardDescription>
        <CardDescription>Click the link in the email to verify your account.</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between gap-2">
         {isPending ? <LoadingButton></LoadingButton> : (
          isDisabled ? <Button disabled className="shad-button_white">Link sent. Resend? {seconds}</Button>
          :
        <Button onClick={() => {sendEmailVerification(); }} className="shad-button_white">Resend Email</Button>
        )}
        <Button className="shad-button_dark_4">Update Email</Button>
      </CardFooter>
      </div>
    </Card>
  )
}
export default EmailVerification
