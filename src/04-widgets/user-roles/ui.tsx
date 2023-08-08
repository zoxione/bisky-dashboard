"use client"

import ReactECharts from "echarts-for-react"
import { useTheme } from "next-themes"

interface IUserRolesProps {
  data: any[]
}

export const UserRoles = ({ data }: IUserRolesProps) => {
  const { theme } = useTheme()

  const option = {
    title: {
      text: "User roles",
      x: "center",
      textStyle: {
        color: theme === "dark" ? "#FAFAFA" : "#0A0A0A",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/> {b}: <b>{c}</b> ({d}%)",
    },
    legend: {
      orient: "horizontal",
      top: "8%",
      left: "center",
      data: ["admin", "moderator", "user"],
      itemStyle: {
        borderWidth: 0,
      },
      textStyle: {
        color: theme === "dark" ? "#FAFAFA" : "#0A0A0A",
      },
    },
    series: [
      {
        name: "Count user roles",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
          borderWidth: 4,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: 400 }} />
}
