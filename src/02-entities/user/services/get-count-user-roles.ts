export const getCountUserRoles = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/charts/user-roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    return { data: null, error: true }
  }

  const data = await res.json()

  return { data: data, error: false }
}
