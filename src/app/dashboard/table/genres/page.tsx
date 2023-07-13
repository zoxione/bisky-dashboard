import { Badge } from "@/01-shared/ui/badge"
import { getGenres } from "@/02-entities/genre/api"
import GenresTable from "@/04-widgets/genres-table"

export default async function Page() {
  const data = await getGenres()

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        Genres table from mongoDB
        <Badge variant="secondary" className="ml-4">
          Only reading
        </Badge>
      </h3>
      <GenresTable />

      <span className="">Count rows: {data.length}</span>
    </>
  )
}
