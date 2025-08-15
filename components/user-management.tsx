"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Users, GraduationCap, Shield } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface UserManagementProps {
  users: any[]
}

export default function UserManagement({ users }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return Shield
      case "instructor":
        return GraduationCap
      default:
        return Users
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "instructor":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage all users on the platform</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="instructor">Instructors</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const RoleIcon = getRoleIcon(user.role)
              return (
                <div key={user.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{user.full_name || "No name"}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className={getRoleColor(user.role)}>
                      <RoleIcon className="h-3 w-3 mr-1" />
                      {user.role}
                    </Badge>
                    <Badge variant="outline">{user.enrollments?.length || 0} courses</Badge>
                  </div>
                </div>
              )
            })}

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No users found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
