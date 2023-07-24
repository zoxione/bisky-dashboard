import { Badge } from "@/01-shared/ui/badge"
import { getUsers } from "@/02-entities/user/api"
import UsersTable from "@/04-widgets/users-table"

export default async function Page() {
  const data = await getUsers()

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        Users table from mongoDB
        <Badge variant="secondary" className="ml-4">
          Only reading
        </Badge>
      </h3>
      <UsersTable />
    </>
  )
}
