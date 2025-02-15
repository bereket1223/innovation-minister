"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { UsersTable } from "./components/UsersTable"
import { ResearchTable } from "./components/ResearchTable"
import { InnovationTable } from "./components/InnovationTable"
import { TechnologyTable } from "./components/TechnologyTable"
import { StatisticsCards } from "./components/StatisticsCards"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    setActiveTab(tab || "dashboard")
  }, [searchParams])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      {activeTab === "dashboard" && <StatisticsCards />}
      {activeTab === "users" && <UsersTable />}
      {activeTab === "research" && <ResearchTable />}
      {activeTab === "innovation" && <InnovationTable />}
      {activeTab === "technology" && <TechnologyTable />}
    </div>
  )
}

