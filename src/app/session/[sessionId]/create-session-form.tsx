
import { useState, FormEventHandler } from "react"

const CreateSessionForm = ({
  setShowCreateForm = (x: boolean) => {},
  handleSessionPick = (sessionId: number) => {},
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleCreateSession: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setLoading(true)

    setLoading(false)
    setShowCreateForm(false)

  }

  return (
    <div className="grid w-full place-items-center rounded-md bg-blue-100">
      <form className="flex flex-col gap-3" onSubmit={handleCreateSession}>
        <h2 className="text-center font-bold">New Chat Session</h2>
        <input type="text" placeholder="Title" name="title" className="border-1 rounded-sm border px-2 py-1 bg-white" />
        <button className="border-1 rounded-sm border bg-white px-2 py-1" disabled={loading}>
          {loading ? "Submitting..." : "Create"}
        </button>
      </form>
    </div>
  )
}

export default CreateSessionForm
