import { getGenres } from "@/02-entities/genre/api"


const GenresTable = async () => {
  const data = await getGenres()

  return (
    // <DataTable columns={columns} data={JSON.parse(JSON.stringify(data))} />
    <></>
  )
}

export default GenresTable
