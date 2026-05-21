import * as React from "react"
import { X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

function getFileIcon(filename: string): string | null {
  const ext = filename.split(".").pop()?.toLowerCase()
  if (!ext) return null
  if (ext === "pdf") return "/img/file-icons/pdf.svg"
  if (["doc", "docx"].includes(ext)) return "/img/file-icons/word.svg"
  if (["xls", "xlsx", "csv"].includes(ext)) return "/img/file-icons/xls.svg"
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "/img/file-icons/zip.svg"
  if (["mp4", "mov", "avi", "mkv", "webm"].includes(ext)) return "/img/file-icons/video.svg"
  if (["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp"].includes(ext)) return "/img/file-icons/image.svg"
  return null
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-14 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-[border-color,box-shadow] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:shadow-[0_0_0_4px_var(--primary-focus-ring)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_4px_color-mix(in_oklch,var(--destructive)_15%,transparent)] md:text-sm dark:bg-input/30 dark:disabled:bg-input/80",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

interface FileInputProps {
  onChange?: (file: File | null) => void
  accept?: string
  className?: string
  id?: string
}

function FileInput({ onChange, accept, className, id }: FileInputProps) {
  const [file, setFile] = React.useState<File | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    onChange?.(f)
  }

  function handleRemove() {
    setFile(null)
    onChange?.(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border  border-input bg-transparent px-4 py-3 transition-colors",
        "hover:border-primary/50 hover:bg-muted/20",
        className
      )}
    >
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />

      {file ? (
        <>
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-9  flex items-center justify-center shrink-0">
              {getFileIcon(file.name)
                ? <img src={getFileIcon(file.name)!} alt="" className="size-9 object-contain" />
                : <FileText className="size-4 text-muted-foreground" />}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 rounded-full p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Remove file"
          >
            <X className="size-4" />
          </button>
        </>
      ) : (
        <>
          <span className="text-sm text-muted-foreground">Add a file</span>
          <label
            htmlFor={id}
            className="shrink-0 cursor-pointer rounded-lg border border-primary/50 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            Choose a file
          </label>
        </>
      )}
    </div>
  )
}

export { FileInput }

interface MultiFileInputProps {
  onChange?: (files: File[]) => void
  accept?: string
  className?: string
  id?: string
  maxFiles?: number
}

function MultiFileInput({ onChange, accept, className, id, maxFiles }: MultiFileInputProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [dragging, setDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function addFiles(incoming: FileList | null) {
    if (!incoming) return
    const next = [...files]
    for (const f of Array.from(incoming)) {
      if (maxFiles && next.length >= maxFiles) break
      if (!next.find((e) => e.name === f.name && e.size === f.size)) next.push(f)
    }
    setFiles(next)
    onChange?.(next)
    if (inputRef.current) inputRef.current.value = ""
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index)
    setFiles(next)
    onChange?.(next)
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
    setDragging(true)
  }

  function onDragLeave() {
    setDragging(false)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const canAdd = !maxFiles || files.length < maxFiles

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Drop zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => canAdd && inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border  border-input px-4 py-6 transition-colors text-center",
          canAdd ? "cursor-pointer hover:border-primary/50 hover:bg-muted/20" : "opacity-50 cursor-not-allowed",
          dragging && "border-primary bg-primary/5"
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <div className="size-10 rounded-full bg-muted flex items-center justify-center">
          <FileText className="size-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {dragging ? "Drop files here" : "Drag & drop or"}{" "}
            {!dragging && (
              <span className="text-primary">browse</span>
            )}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {maxFiles ? `Up to ${maxFiles} files` : "Any number of files"}
            {accept && ` · ${accept}`}
          </p>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 rounded-lg border border-input bg-transparent px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-9 flex items-center justify-center shrink-0">
                  {getFileIcon(file.name)
                    ? <img src={getFileIcon(file.name)!} alt="" className="size-9 object-contain" />
                    : <FileText className="size-4 text-muted-foreground" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="shrink-0 rounded-full p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Remove file"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { MultiFileInput }
