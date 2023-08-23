"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Edit2Icon, Loader2, RotateCcwIcon } from "lucide-react"
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

interface IEditUserForm {
  defaultData: User
}

export const EditUserForm = ({ defaultData }: IEditUserForm) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-3 grid grid-cols-4 gap-4">
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
                <FormItem className="grid grid-cols-4 items-center gap-x-4 col-span-4">
                  <FormLabel>{item}</FormLabel>
                  {isUnion ? (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="col-span-3">
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
                    <FormControl className="col-span-3">
                      <Input type="text" {...field} />
                    </FormControl>
                  )}
                  <FormMessage className="col-span-4" />
                </FormItem>
              )
            }}
          />
        ))}
        <Button
          type="reset"
          onClick={() => form.reset()}
          variant="outline"
          className="col-span-1"
          disabled={isLoading || !form.formState.isDirty}
        >
          <RotateCcwIcon className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button type="submit" className="col-span-3" disabled={isLoading || !form.formState.isDirty}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Edit2Icon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </form>
    </Form>
  )
}
