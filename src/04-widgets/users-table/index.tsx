import { getUsers } from "@/02-entities/user/api"


const UsersTable = async () => {
  const data = await getUsers()

  return (
    // <DataTable
    //   columns={columns}
    //   data={JSON.parse(JSON.stringify(data))}
    //   columnFilter="username"
    // />
    <></>
  )
}

export default UsersTable
