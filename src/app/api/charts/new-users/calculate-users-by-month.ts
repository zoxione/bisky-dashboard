// export interface IYear {
//   Jan: number
//   Feb: number
//   Mar: number
//   Apr: number
//   May: number
//   Jun: number
//   Jul: number
//   Aug: number
//   Sep: number
//   Oct: number
//   Nov: number
//   Dec: number
// }

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

    // switch (month) {
    //   case 0:

    //     break
    //   case 1:
    //     current["Feb"] += 1
    //     break
    //   case 2:
    //     current["Mar"] += 1
    //     break
    //   case 3:
    //     current["Apr"] += 1
    //     break
    //   case 4:
    //     current["May"] += 1
    //     break
    //   case 5:
    //     current["Jun"] += 1
    //     break
    //   case 6:
    //     current["Jul"] += 1
    //     break
    //   case 7:
    //     current["Aug"] += 1
    //     break
    //   case 8:
    //     current["Sep"] += 1
    //     break
    //   case 9:
    //     current["Oct"] += 1
    //     break
    //   case 10:
    //     current["Nov"] += 1
    //     break
    //   case 11:
    //     current["Dec"] += 1
    //     break
    // }

    res[year] = currentYear
  }

  return res
}

export default calculateUsersByMonth
