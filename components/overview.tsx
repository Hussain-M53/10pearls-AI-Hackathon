"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    applications: 45,
    interviews: 28,
    offers: 12,
  },
  {
    name: "Feb",
    applications: 52,
    interviews: 32,
    offers: 15,
  },
  {
    name: "Mar",
    applications: 61,
    interviews: 40,
    offers: 18,
  },
  {
    name: "Apr",
    applications: 58,
    interviews: 35,
    offers: 16,
  },
  {
    name: "May",
    applications: 65,
    interviews: 42,
    offers: 20,
  },
  {
    name: "Jun",
    applications: 74,
    interviews: 48,
    offers: 22,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="applications" fill="#a5b4fc" radius={[4, 4, 0, 0]} name="Applications" />
        <Bar dataKey="interviews" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Interviews" />
        <Bar dataKey="offers" fill="#ec4899" radius={[4, 4, 0, 0]} name="Offers" />
      </BarChart>
    </ResponsiveContainer>
  )
}
