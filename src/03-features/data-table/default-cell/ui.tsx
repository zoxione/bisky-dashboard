import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { CellContext } from "@tanstack/react-table"

import { Input } from "@/01-shared/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/01-shared/ui/select"
import { Textarea } from "@/01-shared/ui/textarea"
import { DetailsPopover } from "@/03-features/details-popover"

function DefaultCell<TData>({ getValue, row, column, table }: CellContext<TData, unknown>) {
  const initialValue = getValue() ?? ""
  const [value, setValue] = useState(initialValue)
  const columnMeta = column.columnDef.meta
  const tableMeta = table.options.meta

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      tableMeta?.updateData(row.index, column.id, event.target.value)
    },
    [column.id, row.index, tableMeta],
  )

  const handleSelectChange = useCallback(
    (selectValue: string) => {
      setValue(selectValue)
      tableMeta?.updateData(row.index, column.id, selectValue)
    },
    [column.id, row.index, tableMeta],
  )

  const handleObjectChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue((old: any) => ({
        ...old,
        [event.target.id]: event.target.value,
      }))
      tableMeta?.updateData(row.index, column.id, {
        ...value,
        [event.target.id]: event.target.value,
      })
    },
    [column.id, row.index, tableMeta, value],
  )

  const handleTextAreaChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value)
      tableMeta?.updateData(row.index, column.id, event.target.value)
    },
    [column.id, row.index, tableMeta],
  )

  if (columnMeta?.type === "select") {
    return (
      <Select value={value as string} onValueChange={handleSelectChange}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select a value" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Values</SelectLabel>
            {columnMeta?.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  } else if (columnMeta?.type === "object") {
    return <DetailsPopover title={column.id} value={value} onChangeValue={handleObjectChange} />
  } else if (columnMeta?.type === "textarea") {
    return <Textarea value={value as string} onChange={handleTextAreaChange} />
  } else {
    return (
      <Input
        type={columnMeta?.type || "text"}
        className=""
        disabled={columnMeta?.disabled}
        value={(value as string) ?? ""}
        onChange={handleInputChange}
      />
    )
  }
}

export { DefaultCell }
