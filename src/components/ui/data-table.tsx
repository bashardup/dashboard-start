import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

/* ── Table primitives ── */

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-left align-middle text-xs font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn("px-4 py-3 align-middle text-sm [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  )
}

/* ── DataTableToolbar ── */

interface DataTableToolbarProps {
  globalFilter: string
  onGlobalFilterChange: (v: string) => void
  searchPlaceholder?: string
  filterSlot?: React.ReactNode
  onAdd?: () => void
}

export function DataTableToolbar({
  globalFilter,
  onGlobalFilterChange,
  searchPlaceholder = "Quick search",
  filterSlot,
  onAdd,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <InputGroup className="w-full">
        <InputGroupAddon align="inline-start">
          <InputGroupText>
            <Search className="size-3.5" />
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={e => onGlobalFilterChange(e.target.value)}
        />
      </InputGroup>

      {filterSlot}
      
      {onAdd && (
        <Button className="ms-auto rounded-lg">
          <Plus className="size-3.5" />
        </Button>
      )}
    </div>
  )
}

/* ── DataTable ── */

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchPlaceholder?: string
  searchColumn?: string
  filterSlot?: React.ReactNode
  onAdd?: () => void
  globalFilter?: string
  onGlobalFilterChange?: (v: string) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Quick search",
  searchColumn: _searchColumn,
  filterSlot,
  onAdd,
  globalFilter: controlledFilter,
  onGlobalFilterChange: onControlledFilterChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [internalFilter, setInternalFilter] = useState("")
  const [pageSize, setPageSize] = useState(10)

  const isControlled = controlledFilter !== undefined
  const globalFilter = isControlled ? controlledFilter : internalFilter
  const setGlobalFilter = isControlled ? (onControlledFilterChange ?? setInternalFilter) : setInternalFilter
  const [goToPage, setGoToPage] = useState("")

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, rowSelection, columnVisibility, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })

  const { pageIndex } = table.getState().pagination
  const pageCount = table.getPageCount()
  const totalRows = table.getFilteredRowModel().rows.length
  const from = pageIndex * pageSize + 1
  const to = Math.min(from + pageSize - 1, totalRows)

  function handlePageSizeChange(val: string) {
    const size = Number(val)
    setPageSize(size)
    table.setPageSize(size)
  }

  function handleGoToPage() {
    const p = Number(goToPage) - 1
    if (p >= 0 && p < pageCount) {
      table.setPageIndex(p)
    }
    setGoToPage("")
  }

  return (
    <div className="flex flex-col gap-3">
      {/* ── Toolbar (only when uncontrolled) ── */}
      {!isControlled && (
        <div className="px-8 pb-6">
          <DataTableToolbar
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            searchPlaceholder={searchPlaceholder}
            filterSlot={filterSlot}
            onAdd={onAdd}
          />
        </div>
      )}

      {/* ── Table ── */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id} className="border-0">
                {hg.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        className="flex items-center gap-1 select-none hover:text-foreground"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc" ? (
                          <ChevronUp className="size-3" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ChevronDown className="size-3" />
                        ) : (
                          <ChevronsUpDown className="size-3 opacity-40" />
                        )}
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-muted-foreground">
        <span>Showing {from} to {to} of {totalRows} results</span>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Page buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="gray"
              size="md"
              className="w-10 p-1 bg-transparent disabled:bg-transparent dark:text-white"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className="size-3.5" />
            </Button>

            {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
              const p = i
              return (
                <Button
                  key={p}
                  variant={pageIndex === p ? "filled" : "gray"}
                  size="md"
                  className={`w-10 ${pageIndex === p ? "" : "bg-transparent dark:text-white"}`}
                  onClick={() => table.setPageIndex(p)}
                >
                  {p + 1}
                </Button>
              )
            })}

            {pageCount > 5 && <span className="px-1">...</span>}

            {pageCount > 5 && (
              <Button
                variant={pageIndex === pageCount - 1 ? "filled" : "gray"}
                size="md"
                 className="w-10"
                onClick={() => table.setPageIndex(pageCount - 1)}
              >
                {pageCount}
              </Button>
            )}

            <Button
              variant="linkGreen"
              size="md"
              className="w-10 p-1 bg-transparent disabled:bg-transparent dark:text-white"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ChevronRight className="size-3.5" />
            </Button>
          </div>

          {/* Rows per page */}
          <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-7 w-24 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map(n => (
                <SelectItem key={n} value={String(n)} className="text-xs">{n} / page</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Go to page */}
          <div className="flex items-center gap-1">
            <span>Go to</span>
            <input
              type="number"
              min={1}
              max={pageCount}
              value={goToPage}
              onChange={e => setGoToPage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleGoToPage()}
              placeholder="Page"
              className="h-7 w-14 rounded-md border bg-transparent px-2 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Re-export helpers ── */
export { type ColumnDef }
export function createSelectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
        }
        onCheckedChange={v => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={v => row.toggleSelected(!!v)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}
