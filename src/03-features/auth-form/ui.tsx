"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Input } from "@/01-shared/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Button } from "@/01-shared/ui/button"
import { useToast } from "@/01-shared/ui/use-toast"

import { authFormSchema } from "./auth-form-schema"

export const AuthForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    setIsLoading(true)

    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    })

    setIsLoading(false)

    if (res && !res.error) {
      router.push("/")
      toast({
        variant: "default",
        title: "Welcome back",
        description: `Hello ${values.username}, you have successfully logged in.`,
      })
    } else {
      console.error(res)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: "Incorrect data entered or an error occurred on the server.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="zoxione" type="text" {...field} />
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
                <Input placeholder="supersecret" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  )
}
