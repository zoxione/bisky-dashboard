import dynamic from "next/dynamic"

import { Card, CardContent, CardHeader, CardTitle } from "@/01-shared/ui/card"
import { getCountUserRoles, getCountUsersByMonth } from "@/02-entities/user/api"

const NewUsers = dynamic(() => import("@/04-widgets/new-users"))
const UserRoles = dynamic(() => import("@/04-widgets/user-roles"))
const VerifiedEmail = dynamic(() => import("@/04-widgets/verified-email"))

export default async function Page() {
  const { data: countUsersByMonth, error: errorCountUsersByMonth } =
    await getCountUsersByMonth()

  const { data: countUserRoles, error: errorCountUserRoles } =
    await getCountUserRoles()

  if (errorCountUserRoles) {
    console.error("errorCountUserRoles")
  }

  return (
    <div className="space-y-4">
      <Card className="">
        <CardHeader>
          <CardTitle>New users</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <NewUsers data={countUsersByMonth} />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>User roles</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <UserRoles data={countUserRoles} />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Verified user email</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <VerifiedEmail />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
