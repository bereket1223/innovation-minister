"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface User {
  _id: string
  name: string
  email: string
  role: string
}

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users")
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setUsers(data)
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Loading users...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <Table>
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Link href={`/user-detail/${user._id}`} passHref>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

