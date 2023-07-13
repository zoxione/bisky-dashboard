import { cn } from "@/01-shared/libs/shadcn/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-900/10 dark:bg-neutral-50/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
