import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserContext } from "@/context/AuthContext"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { PostValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Models } from "appwrite"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import FileUploader from "../shared/FileUploader"
import LoadingButton from "../shared/LoadingButton"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"

type PostFormProps = {
    post? : Models.Document;
    action: 'Create' | 'Update'
}

const PostForm = ({ post, action }: PostFormProps) => {
    const { mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate} = useUpdatePost();
    const { user } = useUserContext();
    const { toast } = useToast();
    const navigate = useNavigate();


    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
        caption: post ? post?.caption : "",
        file: [],
        location: post ? post?.location : "",
        tags: post ? post.tags.join(',') : "",
        },
    })
 
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if(post && action ==='Update'){
      const updatedPost = await updatePost({
        ...values, 
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl
      })

      if(!updatedPost){
        toast({
          title: 'Please Try Again'
        })
      }

      return navigate(`/posts/${post.$id}`)

    }


    const newPost = await createPost({
        ...values,
        userId: user.id
    })
    if(!newPost){
        toast({
            title: 'Error Creating Post, Please Try Again'
        })
    }

    navigate('/');


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              
              <FormControl className="">
                <Textarea className="shad-textarea border border-black custom-scrollbar" placeholder="Make a Caption! What's on your mind?" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                fieldChange={field.onChange}
                mediaUrl={post?.imageUrl}/>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input p-2" {...field}></Input>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="shad-form_label">Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input type="text"
                placeholder="Beauty, Aesthetics, Fashion" 
                className="shad-input p-2"
                 {...field}
                 >
                </Input>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <div className="flex-center">
            {isLoadingCreate || isLoadingUpdate ? 
            <LoadingButton>
              {isLoadingCreate && 'Creating'}
              {isLoadingUpdate && 'Updating'}
            </LoadingButton> :
                (  
                <Button type="submit" 
                className="shad-button_primary w-full">
                {action} Post
                </Button>)

            }
      
        </div>
      </form>
    </Form>
  )
}

export default PostForm