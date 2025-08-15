import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface RecentActivityProps {
  enrollments: any[]
}

export default function RecentActivity({ enrollments }: RecentActivityProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enrollments.length > 0 ? (
            enrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {enrollment.profiles?.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {enrollment.profiles?.full_name || "Unknown User"} enrolled in
                  </p>
                  <p className="text-sm text-primary font-medium">{enrollment.courses?.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(enrollment.enrolled_at), { addSuffix: true })}
                  </p>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">No recent activity</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
