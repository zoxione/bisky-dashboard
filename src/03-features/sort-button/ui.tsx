import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { Button } from "@/01-shared/ui/button"

interface ISortButtonProps<TData, TValue> {
  label: string
  column: Column<TData, TValue>
}

export const SortButton = <TData, TValue>({ column, label }: ISortButtonProps<TData, TValue>) => {
  return (
    <Button variant="ghost" className="p-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}
      {column.getIsSorted() === "asc" ? (
        <ArrowDownIcon className="ml-1 h-4 w-4" />
      ) : (
        <ArrowUpIcon className="ml-1 h-4 w-4" />
      )}
    </Button>
  )
}
