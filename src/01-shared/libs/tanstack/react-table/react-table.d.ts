/* eslint-disable unused-imports/no-unused-vars */
import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface TableMeta {
    revertData: () => void
    updateData: (rowIndex: number, columnId: string, value: any) => void
  }
  interface ColumnMeta {
    type?: string
    disabled?: boolean
    options?: { value: string; label: string }[]
  }
}
