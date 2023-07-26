"use client"

import ReactECharts from "echarts-for-react"
import { useTheme } from "next-themes"
import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/01-shared/ui/select"

interface INewUsersProps {
  data: { [year: string]: { month: string; count: number }[] }
}

const NewUsers = ({ data }: INewUsersProps) => {
  const { theme, setTheme } = useTheme()

  const dataKeys = Object.keys(data)

  const [currentYear, setCurrentYear] = useState<string>(
    dataKeys[dataKeys.length - 1],
  )

  const months = data[currentYear].map(({ month }) => month)
  const counts = data[currentYear].map(({ count }) => count)

  const option = {
    title: {
      text: "New users",
      x: "center",
      textStyle: {
        color: theme === "dark" ? "#FAFAFA" : "#0A0A0A",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: <b>{c}</b>",
    },
    xAxis: {
      type: "category",
      data: months,
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      splitLine: { show: false },
    },
    series: [
      {
        data: counts,
        type: "bar",
        itemStyle: {
          color: "#BE3D73",
          borderRadius: [8, 8, 0, 0],
        },
      },
    ],
  }

  return (
    <>
      <Select
        onValueChange={(value) => setCurrentYear(value)}
        defaultValue={currentYear}
      >
        <SelectTrigger className="w-[180px] ml-4 mb-12">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            {Object.keys(data).map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <ReactECharts option={option} style={{ height: 400 }} />
    </>
  )
}

export default NewUsers
