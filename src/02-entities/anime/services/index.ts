export const getAllAnimeInfo = async (
  limit: number | undefined = 100,
  skip: number | undefined = 0,
) => {
  const res = await fetch(
    `${process.env.APP_URL}/api/database/anime-info?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  if (!res.ok) {
    return { data: null, error: true }
  }

  const data = await res.json()

  return { data: data, error: false }
}
