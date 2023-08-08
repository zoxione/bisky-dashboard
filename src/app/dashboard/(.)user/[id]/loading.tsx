import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader2 className="h-16 w-16 animate-spin" />
    </div>
  )
}
