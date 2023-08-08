
import { Card, CardContent, CardHeader, CardTitle } from "@/01-shared/ui/card"
import { getCountUsersByMonth } from "@/02-entities/user/services/get-count-users-by-month"
import { getCountUserRoles } from "@/02-entities/user/services/get-count-user-roles"
import { UserRoles } from "@/04-widgets/user-roles"
import { VerifiedEmail } from "@/04-widgets/verified-email"
import { NewUsers } from "@/04-widgets/new-users"

// const NewUsers = dynamic(() => import("@/04-widgets/new-users").then((module) => module.NewUsers))
// const UserRoles = dynamic(() => import("@/04-widgets/user-roles").then((module) => module.UserRoles))
// const VerifiedEmail = dynamic(() => import("@/04-widgets/verified-email").then((module) => module.VerifiedEmail))

export default async function Page() {
  const { data: countUsersByMonth, error: errorCountUsersByMonth } = await getCountUsersByMonth()

  const { data: countUserRoles, error: errorCountUserRoles } = await getCountUserRoles()

  return (
    <div className="space-y-4">
      <Card className="">
        <CardHeader>
          <CardTitle>New users</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">{countUsersByMonth && <NewUsers data={countUsersByMonth} />}</CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>User roles</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">{countUserRoles && <UserRoles data={countUserRoles} />}</CardContent>
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
