import { Badge } from "@/01-shared/ui/badge"
import { StudiosTable } from "@/04-widgets/studios-table"

export const revalidate = 60

export default async function Page() {
  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        Studios table from mongoDB
        <Badge variant="secondary" className="ml-4">
          Only reading
        </Badge>
      </h3>
      <StudiosTable />
    </>
  )
}
