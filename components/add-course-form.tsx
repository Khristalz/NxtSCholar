"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createCourse } from "@/lib/admin-actions"

interface AddCourseFormProps {
  categories: any[]
}

export default function AddCourseForm({ categories }: AddCourseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await createCourse(formData)
      window.location.reload()
    } catch (error) {
      console.error("Failed to create course:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input id="title" name="title" required placeholder="Enter course title" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category_id" required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required placeholder="Enter course description" rows={4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration_hours">Duration (hours)</Label>
          <Input id="duration_hours" name="duration_hours" type="number" required placeholder="40" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Select name="level" required>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="is_featured" name="is_featured" />
        <Label htmlFor="is_featured">Featured Course</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="is_published" name="is_published" />
        <Label htmlFor="is_published">Publish Immediately</Label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
        {isSubmitting ? "Creating..." : "Create Course"}
      </Button>
    </form>
  )
}
