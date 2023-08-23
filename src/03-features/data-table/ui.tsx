"use client"

import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons"
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
  QueryDefinition,
} from "@reduxjs/toolkit/dist/query"
import { UseMutation, UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks"
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
import { Loader2, RotateCcwIcon, SaveAllIcon } from "lucide-react"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useDebounce } from "usehooks-ts"

import { Badge } from "@/01-shared/ui/badge"
import { Button } from "@/01-shared/ui/button"
import { Input } from "@/01-shared/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/01-shared/ui/select"
import { Skeleton } from "@/01-shared/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/01-shared/ui/table"
import { useToast } from "@/01-shared/ui/use-toast"

import { DefaultCell } from "./default-cell"

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  filter?: string
  useQuery: UseQuery<
    QueryDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      never,
      any,
      any
    >
  >
  prefetchNextPage: (arg: { page: number; limit: number; search: string }) => void
  useUpdateManyMutation: UseMutation<
    MutationDefinition<
      any[],
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      any,
      any[],
      any
    >
  >
}

export function DataTable<TData, TValue>({
  columns,
  filter = "",
  useQuery,
  prefetchNextPage,
  useUpdateManyMutation,
}: IDataTableProps<TData, TValue>) {
  const [modifiedData, setModifiedData] = useState<TData[]>([])
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnFilter, setColumnFilter] = useState<string>(filter)
  const [searchFilter, setSearchFilter] = useState<string>("")
  const searchFilterDebounced = useDebounce<string>(searchFilter, 500)
  const [sorting, setSorting] = useState<SortingState>([])

  const { toast } = useToast()

  // API methods
  const {
    data: queryData = [],
    isLoading,
    isFetching,
    refetch: refetchQueryData,
  } = useQuery({
    page: pageIndex,
    limit: pageSize,
    search: searchFilterDebounced,
  })
  const [updateManyData, { isLoading: isLoadingUpdateManyMutation }] = useUpdateManyMutation()

  // Table
  const table = useReactTable({
    data: queryData.data,
    columns: columns,
    defaultColumn: {
      cell: DefaultCell,
      minSize: 220,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    columnResizeMode: "onChange",
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
    meta: {
      revertData: () => {
        refetchQueryData()
        setModifiedData([])
      },
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setModifiedData((old) => {
          if (old.length !== 0) {
            return old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex],
                  [columnId]: value,
                }
              }
              return row
            })
          } else {
            return table.options.data.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...table.options.data[rowIndex],
                  [columnId]: value,
                }
              }
              return row
            })
          }
        })
      },
    },
  })

  const calcMaxPageIndex = useCallback(() => {
    return Math.floor(queryData.stats.count / pageSize)
  }, [queryData.stats?.count, pageSize])

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value)
    setPageIndex(0)
  }, [])

  const handleSelectPageIndex = useCallback(
    (value: string) => {
      setPageIndex(0)
      setPageSize(Number(value))
      table.setPageSize(Number(value))
    },
    [table],
  )

  const handleChangePageIndex = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0
    setPageIndex(page + 1)
  }, [])

  const handlePrevButton = useCallback(() => {
    setPageIndex((prev) => prev - 1)
  }, [])

  const handleNextButton = useCallback(() => {
    setPageIndex((prev) => prev + 1)
  }, [])

  const handleSaveData = async () => {
    if (modifiedData) {
      await updateManyData(modifiedData)
        .unwrap()
        .then((payload: any) => {
          toast({
            variant: "default",
            title: "Data updated",
          })
        })
        .catch((error: any) => {
          console.error("rejected", error)
          toast({
            variant: "destructive",
            title: "Data update error",
            description: error.error,
          })
        })
      setModifiedData([])
    }
  }

  const handleRevertData = () => {
    table.options.meta?.revertData()
  }

  // Prefetch one next page
  useEffect(() => {
    if (queryData.stats) {
      if (pageIndex !== calcMaxPageIndex()) {
        prefetchNextPage({ page: pageIndex + 1, limit: pageSize, search: searchFilterDebounced })
      }
    }
  }, [calcMaxPageIndex, queryData, pageIndex, pageSize, searchFilterDebounced, prefetchNextPage])

  return (
    <div className="space-y-4">
      {columnFilter !== "" && (
        <div className="flex items-center gap-2">
          <span>Search: </span>
          <Input
            placeholder={`Find ${columnFilter}...`}
            value={searchFilter}
            onChange={(event) => handleSearch(event)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <span className="flex flex-row items-center gap-2">
          Count items:
          {isLoading ? (
            <Skeleton className="h-[24px] w-[80px] ml-2" />
          ) : (
            <Badge variant="outline">{queryData.stats.count}</Badge>
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
                  onChange={(event) => handleChangePageIndex(event)}
                />
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => handleSelectPageIndex(value)}
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
            <Button variant="outline" size="sm" onClick={handlePrevButton} disabled={isFetching || pageIndex <= 0}>
              <CaretLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextButton}
              disabled={isFetching || pageIndex >= calcMaxPageIndex()}
            >
              <CaretRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table style={{ minWidth: table.getTotalSize(), width: "100%" }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="w-fit">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                      }}
                      className="[&:has([role=option])]:sticky [&:has([role=option])]:right-0 [&:has([role=option])]:bg-white [&:has([role=option])]:dark:bg-neutral-950 relative"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      <div
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: ` absolute right-0 top-0 w-[4px] h-full bg-neutral-200 dark:bg-neutral-800 cursor-col-resize select-none touch-none ${
                            header.column.getIsResizing() ? "bg-neutral-300 dark:bg-neutral-600" : ""
                          }`,
                        }}
                      />
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto mb-1" />
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 text-center [&:has([role=option])]:sticky [&:has([role=option])]:right-0 [&:has([role=option])]:bg-white [&:has([role=option])]:dark:bg-neutral-950"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 justify-items-stretch ">
        <p className="font-mono text-sm font-semibold col-span-4">
          Press <kbd>Shift</kbd> + <kbd>Scroll</kbd> to scroll the table horizontally.
        </p>
        <div className="flex flex-row items-center justify-end gap-2">
          <Button
            variant="secondary"
            className="w-fit justify-self-end"
            onClick={handleRevertData}
            disabled={modifiedData.length === 0}
          >
            <RotateCcwIcon className="mr-2 h-4 w-4" />
            Revert
          </Button>
          <Button
            variant="default"
            className="w-fit justify-self-end"
            onClick={handleSaveData}
            disabled={isLoadingUpdateManyMutation || modifiedData.length === 0}
          >
            {isLoadingUpdateManyMutation && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <SaveAllIcon className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
