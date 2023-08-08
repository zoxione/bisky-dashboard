import { Skeleton } from "@/01-shared/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-1">
      {Array(10)
        .fill(0)
        .map((_, i) => i + 1)
        .map((index) => (
          <Skeleton key={index} className="h-[35px] w-full " />
        ))}
    </div>
  )
}
