"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"

type IndigenousData = {}

export default function IndigenousDetail() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<IndigenousData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/department/indigenous-research/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
      }
      const jsonData = await response.json()
      setData(jsonData)
      setLoading(false)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this entry?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/department/delete/${id}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error(`Failed to delete: ${response.status} ${response.statusText}`)
        }
        router.push("/indigenous-tables")
      } catch (err: any) {
        setError(err.message)
      }
    }
  }

  const handleApprove = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/department/approve/${id}`, {
        method: "PUT",
      })
      if (!response.ok) {
        throw new Error(`Failed to approve: ${response.status} ${response.statusText}`)
      }
      fetchData() // Refresh the data after approval
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading data...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>
  if (!data) return <p>No data found</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{data.fullName}'s Details</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</strong>{" "}
            {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
          </div>
        ))}
      </div>
      <div className="mt-6 space-x-4">
        {data.fileUrl && <Button onClick={() => window.open(data.fileUrl, "_blank")}>View File</Button>}
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="outline" onClick={handleApprove}>
          Approve
        </Button>
      </div>
    </div>
  )
}

