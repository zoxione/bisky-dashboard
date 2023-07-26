import { Trash2Icon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Button } from "@/01-shared/ui/button"
import { Separator } from "@/01-shared/ui/separator"

interface IReportsListProps {
  data: any
}

const ReportsList = ({ data }: IReportsListProps) => {
  return (
    <div className="">
      {data.map((item: any, index: number) => (
        <div key={item.id}>
          <div className="flex flex-col gap-2">
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none">
                Reporter: {item.from}
              </p>
              <p className="text-sm font-medium leading-none">
                Perpetrator: {item.to}
              </p>
              <p className="text-sm font-medium leading-none">{item.message}</p>
              <p className="text-sm text-muted-foreground">10:12 18/10/1917</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline">Mute</Button>
              <Button variant="destructive">Ban</Button>
              <Button variant="secondary">
                <Trash2Icon size={18} />
              </Button>
            </div>
          </div>
          {data.length - 1 !== index && <Separator className="my-8" />}
        </div>
      ))}
    </div>
  )
}

export default ReportsList
