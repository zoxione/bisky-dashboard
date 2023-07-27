"use client"

import ReactECharts from "echarts-for-react"
import { useTheme } from "next-themes"

const VerifiedEmail = () => {
  const { theme } = useTheme()

  const option = {
    title: {
      text: "Verified user email",
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
      data: ["verified", "unverified"],
      itemStyle: {
        borderWidth: 0,
      },
      textStyle: {
        color: theme === "dark" ? "#FAFAFA" : "#0A0A0A",
      },
    },
    series: [
      {
        name: "Count verified email",
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
        data: [
          {
            name: "verified",
            value: 10,
          },
          {
            name: "unverified",
            value: 3,
          },
        ],
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: 400 }} />
}

export default VerifiedEmail
