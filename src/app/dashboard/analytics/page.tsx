import { Card, CardContent, CardHeader, CardTitle } from "@/01-shared/ui/card"
import { getCountUsersByMonth } from "@/02-entities/user/api"
import NewUsers from "@/04-widgets/new-users"

export default async function Page() {
  let countUsersByMonth = {}

  try {
    countUsersByMonth = await getCountUsersByMonth()
  } catch (error: any) {
    console.log(error)
  }

  return (
    <div className="space-y-4">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>New users</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <NewUsers data={countUsersByMonth} />
        </CardContent>
      </Card>
    </div>
  )
}
