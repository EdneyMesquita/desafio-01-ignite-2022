import { ChangeEvent, FormEvent, useState } from "react";

import "./globals.css";
import styles from "./App.module.css";

import logo from "./assets/todo-logo.svg";
import clipboard from "./assets/clipboard.svg";

import { PlusCircle } from "phosphor-react";
import { Task, TaskModel } from "./components/Task";

function App() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [newTask, setNewTask] = useState("");

  const finishedTasks = tasks.filter((task) => task.isCompleted);

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (newTask.trim()) {
      setTasks((state) => [
        ...state,
        { description: newTask, isCompleted: false },
      ]);
      setNewTask("");
    }
  }

  function finishTask(task: TaskModel) {
    const listWithoutTheFinishedOne = tasks.filter(
      (item) => item.description !== task.description
    );

    task.isCompleted = true;

    setTasks([...listWithoutTheFinishedOne, task]);
  }

  function deleteTask(task: TaskModel) {
    const listWithoutTheDeletedOne = tasks.filter(
      (item) => item.description !== task.description
    );

    setTasks(listWithoutTheDeletedOne);
  }

  return (
    <main className={styles.wrapper}>
      <header>
        <img src={logo} alt="Logo" />
      </header>
      <div className={styles.content}>
        <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTaskChange}
            value={newTask}
          />

          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.tasksContainer}>
          <header>
            <strong className={styles.createdTasks}>
              Tarefas criadas <span>{tasks.length}</span>
            </strong>

            <strong className={styles.finishedTasks}>
              Concluídas{" "}
              <span>
                {finishedTasks.length === 0
                  ? 0
                  : `${finishedTasks.length} de ${tasks.length}`}
              </span>
            </strong>
          </header>

          <div className={styles.tasksList}>
            {tasks.length === 0 && (
              <div className={styles.emptyList}>
                <img src={clipboard} alt="" />

                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            )}

            {tasks?.map((task) => (
              <Task
                key={task.description}
                task={task}
                onFinishTask={finishTask}
                onDeleteTask={deleteTask}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
