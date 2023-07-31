import { getStudios } from "@/02-entities/studio/api"


const StudiosTable = async () => {
  const data = await getStudios()

  return (
    // <DataTable
    //   columns={columns}
    //   data={JSON.parse(JSON.stringify(data))}
    //   columnFilter="name"
    // />
    <></>
  )
}

export default StudiosTable
