"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/01-shared/ui/select"
import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface INewUsersProps {
  data: { [year: string]: { month: string; count: number }[] }
}

const NewUsers = ({ data }: INewUsersProps) => {
  const dataKeys = Object.keys(data)

  const [currentYear, setCurrentYear] = useState<string>(
    dataKeys[dataKeys.length - 1],
  )

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
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data[currentYear]}>
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="count" fill="#DD5480" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default NewUsers
