import { getOneUserById } from "@/02-entities/user/db/get-user-by-id"
import { UserModal } from "@/04-widgets/user-modal"

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const data = await getOneUserById(id)

  return <UserModal user={data} />
}
