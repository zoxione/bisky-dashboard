import { clientPromise } from "@/01-shared/libs/mongo"
import { DataTable } from "@/01-shared/ui/data-table"
import { IUser } from "@/02-entities/user"
import { getUsers } from "@/02-entities/user/api"

import { columns } from "./columns"

const UsersTable = async () => {
  const data = await getUsers()

  let editData = data.map((obj) => {
    const { _id, ...newObj } = obj
    return newObj
  })

  return <DataTable columns={columns} data={editData} columnFilter="username" />
}

export default UsersTable
