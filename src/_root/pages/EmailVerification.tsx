import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const EmailVerification = () => {
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
        <CardDescription>We just sent an email to nacariodale@gmail.com.</CardDescription>
        <CardDescription>Click the link in the email to verify your account.</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between gap-2">
        <Button className="shad-button_white">Resend Email</Button>
        <Button className="shad-button_dark_4">Update Email</Button>
      </CardFooter>
      </div>
    </Card>
    
  )
}


export default EmailVerification


{/* <div className="flex flex-1">
      <div className="common-container"></div> */}