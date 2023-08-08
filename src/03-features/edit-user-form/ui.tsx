import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/01-shared/ui/use-toast"
import { Input } from "@/01-shared/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/01-shared/ui/form"
import { Button } from "@/01-shared/ui/button"
import { useUpdateOneUserMutation } from "@/02-entities/user/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/select"
import { User } from "@/02-entities/user/models/user"

import { editUserFormSchema } from "./edit-user-form-schema"
import { IEditDataFormProps } from "../data-table"

export const EditUserForm = ({ defaultData }: IEditDataFormProps<User>) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [updateUser] = useUpdateOneUserMutation()

  const form = useForm<z.infer<typeof editUserFormSchema>>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      _id: defaultData._id.toString(),
      username: defaultData.username,
      password: defaultData.password,
      email: defaultData.email,
      image: defaultData.image ?? "",
      role: defaultData.role,
      name: defaultData.name ?? "",
      refreshToken: defaultData.refreshToken ?? "",
    },
  })

  const formFields = Object.keys(editUserFormSchema.shape) as (keyof typeof editUserFormSchema.shape)[]

  const onSubmit = async (values: z.infer<typeof editUserFormSchema>) => {
    setIsLoading(true)

    await updateUser(values)
      .unwrap()
      .then((payload: any) => {
        toast({
          variant: "default",
          title: "Data changed",
        })
      })
      .catch((error: any) => {
        console.error("rejected", error)
        toast({
          variant: "destructive",
          title: "Data change error",
          description: error.error,
        })
      })

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map((item, index) => (
          <FormField
            key={index}
            control={form.control}
            name={item}
            render={({ field }) => {
              const isUnion = editUserFormSchema.shape[item]._def.typeName === "ZodUnion"
              const unionOptions: any[] = isUnion
                ? //@ts-ignore
                  editUserFormSchema.shape[item]._def.options
                : undefined
              return (
                <FormItem>
                  <FormLabel>{item}</FormLabel>
                  {isUnion ? (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unionOptions.map((unionValue) => (
                          <SelectItem key={unionValue._def.value} value={unionValue._def.value}>
                            {unionValue._def.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        ))}
        <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isDirty}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Edit
        </Button>
      </form>
    </Form>
  )
}
