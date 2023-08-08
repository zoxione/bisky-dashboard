import { Badge } from "@/01-shared/ui/badge"
import { UsersTable } from "@/04-widgets/users-table"

export default async function Page() {
  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        Users table from mongoDB
        <Badge variant="secondary" className="ml-4">
          Can edit
        </Badge>
      </h3>

      <UsersTable />
    </>
  )
}
