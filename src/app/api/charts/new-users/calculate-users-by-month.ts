export interface IMonth {
  month: string
  count: number
}

const calculateUsersByMonth = (users: any[]) => {
  let res: { [year: number]: IMonth[] } = {}

  for (let i = 0; i < users.length; i++) {
    const year = users[i].created_at.getFullYear()
    const month = users[i].created_at.getMonth()
    let currentYear: IMonth[]

    if (year in res) {
      currentYear = res[year]
    } else {
      currentYear = [
        {
          month: "Jan",
          count: 0,
        },
        {
          month: "Feb",
          count: 0,
        },
        {
          month: "Mar",
          count: 0,
        },
        {
          month: "Apr",
          count: 0,
        },
        {
          month: "May",
          count: 0,
        },
        {
          month: "Jun",
          count: 0,
        },
        {
          month: "Jul",
          count: 0,
        },
        {
          month: "Aug",
          count: 0,
        },
        {
          month: "Sep",
          count: 0,
        },
        {
          month: "Oct",
          count: 0,
        },
        {
          month: "Nov",
          count: 0,
        },
        {
          month: "Dec",
          count: 0,
        },
      ]
    }

    currentYear[month].count += 1

    res[year] = currentYear
  }

  return res
}

export default calculateUsersByMonth
