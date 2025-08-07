import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Body.css";
import type { Task } from "./Body"; // Import Task interface

interface CreateTaskProps {
  onClose: () => void;
  onTaskCreated: () => Promise<void>;
  taskToEdit?: Task | null; // Optional prop for editing
}

function CreateTask({ onClose, onTaskCreated, taskToEdit }: CreateTaskProps) {
  const [taskName, setTaskName] = useState(taskToEdit?.taskName || "");
  const [priority, setPriority] = useState<"high" | "medium" | "low" | "">(
    taskToEdit?.priority || "medium"
  );
  const [status, setStatus] = useState<"pending" | "completed" | "">(
    taskToEdit?.status || "pending"
  );
  const [error, setError] = useState<string | null>(null);

  // Prefill form when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.taskName);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
    } else {
      setTaskName("");
      setPriority("medium");
      setStatus("pending");
    }
  }, [taskToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) {
      setError("Task name is required");
      return;
    }
    if (!priority) {
      setError("Priority is required");
      return;
    }
    if (!status) {
      setError("Status is required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    try {
      if (taskToEdit) {
        // Update existing task
        await axios.put(
          `http://localhost:3000/tasks/update/${taskToEdit._id}`,
          {
            taskName,
            priority,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create new task
        await axios.post(
          "http://localhost:3000/tasks/create",
          {
            taskName,
            priority,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      await onTaskCreated(); // Refresh task list
    } catch (error) {
      console.error("Error saving task:", error);
      setError("Failed to save task. Please try again.");
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>{taskToEdit ? "Edit Task" : "Create New Task"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
              required
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "pending" | "completed")}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="formActions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">{taskToEdit ? "Update Task" : "Create Task"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;