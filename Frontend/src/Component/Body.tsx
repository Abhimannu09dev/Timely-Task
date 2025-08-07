import { BsExclamationCircle } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { LuCircleCheckBig } from "react-icons/lu";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import "../CSS/Body.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import CreateTask from "./CreateTask";

// Define interface for task types
export interface Task {
  _id: string;
  taskName: string;
  description?: string;
  status: "pending" | "completed";
  priority: "high" | "medium" | "low";
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function Body() {
  const userName = localStorage.getItem("userName");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  type Tab = "all" | "pending" | "completed";
  const [activeTask, setActiveTask] = useState<Tab>("all");

  const handleTabChange = (tab: Tab) => {
    setActiveTask(tab);
  };

  const noTaskMessage = activeTask === "all" ? (
    <div className="noTaskMessage">
      <LuCircleCheckBig />
      <h3>No tasks yet</h3>
      <p>Click the + button to add your first task!</p>
    </div>
  ) : activeTask === "pending" ? (
    <div className="noTaskMessage">
      <LuCircleCheckBig />
      <h3>No pending tasks</h3>
    </div>
  ) : (
    <div className="noTaskMessage">
      <LuCircleCheckBig />
      <h3>No completed tasks yet</h3>
    </div>
  );

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No authenticated user found");
      setIsAuthenticated(false);
      return;
    }
    try {
      const response = await axios.get("http://localhost:3000/tasks/getTasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const sortTasksByPriority = (tasks: Task[]): Task[] => {
    const priorityOrder: { [key: string]: number } = {
      high: 3,
      medium: 2,
      low: 1,
    };
    return [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  };

  const filteredTask = sortTasksByPriority(
    tasks.filter((task) => {
      if (activeTask === "all") return true;
      return task.status === activeTask;
    })
  );

  const handleCheckboxChange = (taskID: string, currentStatus: "pending" | "completed") => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    updateTaskStatus(taskID, newStatus);
  };

  const updateTaskStatus = async (taskID: string, newStatus: "pending" | "completed") => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authenticated user found");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/tasks/update/${taskID}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.task || !response.data.task._id) {
        throw new Error("Invalid task data in response");
      }
      setTasks(tasks.map((task) => (task._id === taskID ? response.data.task : task)));
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status.");
    }
  };

  const updateTask = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const deleteTask = async (taskID: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete the task?");
    if (confirmDelete) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:3000/tasks/delete/${taskID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(tasks.filter((task) => task._id !== taskID));
        console.log("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task.");
      }
    }
  };

  const handleTaskCreatedOrUpdated = async () => {
    await fetchTasks();
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <main>
      <div className="mainContent">
        <div style={{ textAlign: "center" }}>
          <div className="welcome">
            <h1>Welcome back, {userName}</h1>
            <p>Ready to tackle your tasks and make today productive?</p>
          </div>
        </div>
        <div className="tasks">
          <div className="taskList">
            <div className="totalTasks">
              <p>Total Tasks</p>
              <strong>{totalTasks}</strong>
            </div>
            <BsExclamationCircle className="totalIcon" />
          </div>
          <div className="taskList">
            <div className="pendingTasks">
              <p>Pending</p>
              <strong>{pendingTasks}</strong>
            </div>
            <IoMdTime className="pendingIcon" />
          </div>
          <div className="taskList">
            <div className="completedTasks">
              <p>Completed</p>
              <strong>{completedTasks}</strong>
            </div>
            <LuCircleCheckBig className="completedIcon" />
          </div>
        </div>
        <div className="navTasks">
          <button
            className={`all ${activeTask === "all" ? "active" : ""}`}
            onClick={() => handleTabChange("all")}
          >
            All
          </button>
          <button
            className={`pending ${activeTask === "pending" ? "active" : ""}`}
            onClick={() => handleTabChange("pending")}
          >
            Pending
          </button>
          <button
            className={`completed ${activeTask === "completed" ? "active" : ""}`}
            onClick={() => handleTabChange("completed")}
          >
            Completed
          </button>
        </div>

        <div className="overAllTasks">
          <div className="allTasks">
            {filteredTask.length === 0 ? (
              noTaskMessage
            ) : (
              filteredTask.map((task) => (
                <div key={task._id} className="taskItem">
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => handleCheckboxChange(task._id, task.status)}
                  />
                  <div style={{ width: "100%" }}>
                    <h4>{task.taskName}</h4>
                    <div className="taskDesc">
                      <p>Status: {task.status}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="editTask">
                    <button onClick={() => updateTask(task)}><MdEdit /></button>
                    <button onClick={() => deleteTask(task._id)}><MdDeleteOutline /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <button
          className="createTask"
          onClick={() => {
            setTaskToEdit(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus />
        </button>
        {isModalOpen && (
          <CreateTask
            onClose={() => {
              setIsModalOpen(false);
              setTaskToEdit(null);
            }}
            onTaskCreated={handleTaskCreatedOrUpdated}
            taskToEdit={taskToEdit}
          />
        )}
      </div>
    </main>
  );
}

export default Body;