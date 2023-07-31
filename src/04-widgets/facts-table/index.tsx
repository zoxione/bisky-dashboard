import { getFacts } from "@/02-entities/fact/api"


const FactsTable = async () => {
  const data = await getFacts()

  return (
    // <DataTable
    //   columns={columns}
    //   data={JSON.parse(JSON.stringify(data))}
    //   columnFilter="fact"
    // />
    <></>
  )
}

export default FactsTable
