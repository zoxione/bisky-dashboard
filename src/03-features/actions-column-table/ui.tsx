import { ExternalLinkIcon, Loader2, MoreHorizontal, PencilIcon, Trash2Icon } from "lucide-react"
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query"
import { UseMutation } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { ReactNode, useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/01-shared/ui/alert-dialog"
import { Button } from "@/01-shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/01-shared/ui/dropdown-menu"
import { useToast } from "@/01-shared/ui/use-toast"

interface IActionsColumnTableProps<IData> {
  data: IData
  editDataForm?: ReactNode
  useDeleteMutation: UseMutation<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      any,
      any,
      any
    >
  >
  link?: string
}

export const ActionsColumnTable = <TData,>({
  data,
  editDataForm,
  useDeleteMutation,
  link,
}: IActionsColumnTableProps<TData>) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [deleteData] = useDeleteMutation()

  const handleDeleteItem = async () => {
    setIsLoading(true)

    await deleteData(data)
      .unwrap()
      .then((payload: any) => {
        toast({
          variant: "default",
          title: "Data deleted",
        })
      })
      .catch((error: any) => {
        console.error("rejected", error)
        toast({
          variant: "destructive",
          title: "Data delete error",
          description: error.error,
        })
      })

    setIsLoading(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" role="option">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {editDataForm && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                }}
              >
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit data
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Edit data</AlertDialogTitle>
              </AlertDialogHeader>
              {editDataForm}
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="text-red-600"
              onSelect={(e) => {
                e.preventDefault()
              }}
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              Delete from database
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the item from the database and remove its
                data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteItem} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {link && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href={link} target="_blank">
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Open on bisky
              </a>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
