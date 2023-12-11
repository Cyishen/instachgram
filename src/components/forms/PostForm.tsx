import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"

import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/query"
import { useUserContext } from "@/Context/AuthContext"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import Loader from "../shared/Loader"



type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ( {post, action}: PostFormProps ) => {
    const navigate = useNavigate()
    const { mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost()

    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost()

    const { user } = useUserContext()

    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
      resolver: zodResolver(PostValidation),
      defaultValues: {
        caption: post ? post?.caption : "",
        file: [],
        location: post ? post.location : "",
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
      if(post && action === "Update") {
        const updatedPost = await updatePost({
          ...values,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageUrl,
        })

        if(!updatedPost){
          toast({ title: "Update failed, try again"})
        }

        return navigate('/')
      }

      const newPost = await createPost({
        ...values,
        userId: user.id,
      })

      if(!newPost) {
        toast({
          title: "Oop, try again"
        })
      } else {
        toast({
          title: "success"
        })
        navigate('/')
      }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader 
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 justify-end">
          <Button type="submit" className="bg-black text-white gap-2" disabled={isLoadingCreate || isLoadingUpdate}>
            {isLoadingCreate || isLoadingUpdate && <Loader />}
            {action}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm