"use client"

import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChangeEvent, useState } from "react"
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from "@reduxjs/toolkit/dist/query"
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { useDebounce } from "usehooks-ts"
import { Loader2 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/01-shared/ui/table"


import { Button } from "./button"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Skeleton } from "./skeleton"


interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  // data: TData[]
  filter?: string
  useQuery: UseQuery<
    QueryDefinition<
      any,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      any,
      any
    >
  >
}

export function DataTable<TData, TValue>({
  columns,
  // data,
  filter = "",
  useQuery,
}: IDataTableProps<TData, TValue>) {
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnFilter, setColumnFilter] = useState<string>(filter)
  const [searchFilter, setSearchFilter] = useState<string>("")
  const searchFilterDebounced = useDebounce<string>(searchFilter, 500)
  const [sorting, setSorting] = useState<SortingState>([])

  const {
    data: dataQuery = [],
    isLoading,
    isFetching,
  } = useQuery({
    page: pageIndex,
    limit: pageSize,
    search: searchFilterDebounced,
  })

  const table = useReactTable({
    data: dataQuery.data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value)
    setPageIndex(0)
  }

  const calcMaxPageIndex = () => {
    return Math.floor(dataQuery.stats.count / pageSize)
  }

  return (
    <div className="space-y-4">
      {columnFilter !== "" && (
        <div className="flex items-center ">
          <Input
            placeholder={`Filter ${columnFilter}...`}
            value={searchFilter}
            onChange={(event) => handleSearch(event)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <span className="flex flex-row items-center">
          Count items:{" "}
          {isLoading ? (
            <Skeleton className="h-[24px] w-[80px] ml-2" />
          ) : (
            dataQuery.stats.count
          )}
        </span>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1">
            {isLoading ? (
              <Skeleton className="h-[36px] w-[180px]" />
            ) : (
              <>
                <span>Page (0-{calcMaxPageIndex()}):</span>
                <Input
                  className="w-[120px]"
                  type="number"
                  disabled={isFetching}
                  min={0}
                  max={calcMaxPageIndex()}
                  value={pageIndex}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    setPageIndex(page + 1)
                  }}
                />
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Select
              value={pageSize.toString()}
              onValueChange={(value: string) => {
                setPageSize(Number(value))
                table.setPageSize(Number(value))
              }}
              disabled={isFetching}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a page size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[10, 20, 30, 40, 50].map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      Show {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPageIndex((prev) => prev - 1)
              }}
              disabled={isFetching || pageIndex <= 0}
            >
              <CaretLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPageIndex((prev) => prev + 1)
              }}
              disabled={
                isFetching || pageIndex >= dataQuery?.stats?.count / pageSize
              }
            >
              <CaretRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="h-4 w-4 animate-spin mx-auto mb-1" />
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
