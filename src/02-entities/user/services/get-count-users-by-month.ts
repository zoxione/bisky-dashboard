export const getCountUsersByMonth = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/charts/new-users`, {
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
