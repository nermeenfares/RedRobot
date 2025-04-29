"use client"
import { useState } from "react"
import { Spinner } from "@/app/ui/loading"

type AddTodoFormProps = {
  onSubmit?: (text: string) => void       // Optional client-side handler
  action?: (formData: FormData) => void   // Optional server action
  isSubmitting?: boolean                  // Optional loading state
  defaultValue?: string                   // Optional default value
}

export function AddTodoForm({
  onSubmit,
  action,
  isSubmitting = false,
  defaultValue = ""
}: AddTodoFormProps) {
  const [text, setText] = useState(defaultValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (text.trim()) {
      if (onSubmit) {
        // Client-side handling
        onSubmit(text.trim())
        setText("")
      } else if (action) {
        // Server action handling
        const formData = new FormData()
        formData.append("text", text.trim())
        action(formData)
        setText("")
      }
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      action={onSubmit ? undefined : action} // Only use action if no onSubmit
      className="flex mb-6"
    >
      <input
        type="text"
        name="text"  // Required for server actions
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo..."
        disabled={isSubmitting}
        className={`flex-1 px-4 py-2 border rounded-l-lg focus:outline-none ${
          isSubmitting ? "bg-gray-100" : ""
        }`}
      />
      <button
        type="submit"
        disabled={!text.trim() || isSubmitting}
        className={`px-4 py-2 rounded-r-lg text-white min-w-[80px] ${
          !text.trim() ? "bg-gray-400" :
          isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? <Spinner size="sm" /> : "Add"}
      </button>
    </form>
  )
}