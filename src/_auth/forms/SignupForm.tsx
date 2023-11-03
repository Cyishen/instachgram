import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate} from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { formSchema } from "@/lib/validation"
import z from "zod"

import Loader from "@/components/shared/Loader"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/query"
import { useUserContext } from "@/Context/AuthContext"



const SignupForm = () => {
    const { toast } = useToast()
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
    const navigate = useNavigate()

    const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount()
    const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
      const newUser = await createUserAccount(values)
      
      if(!newUser) {
        return toast({ title: "Sign up failed", }) }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      })

      if(!session) {
        return toast({ title: "Sign up failed", }) }
      

      const isLoggedIn = await checkAuthUser()

      if(isLoggedIn) {
        form.reset()
        navigate('/')
      } else {
        return toast({ title: "Sign up failed", }) }
      }
    

  return (
    <div className="sm:w-420 flex-center flex-col">
      <h1 className="text-3xl md:text-4xl font-extrabold text-shadow">instachgram</h1>
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
        Create a new account
      </h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        To use Instachgram, please enter your details
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="shad-input" placeholder="chen"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="shad-input" placeholder="cyi"/>
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="shad-input" placeholder="test@gmail.com"/>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="shad-input" placeholder="@123456"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount || isUserLoading || isSigningIn ? (
              <div className="flex-center gap-3">
                <Loader /> Loading...
              </div>
            ) : "Sign up"}
          </Button>

          <p className="text-small-regular mt-2">
            Already have an account?
            <Link to="/sign-in" className="ml-2 text-light-3">Sign in</Link>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default SignupForm

