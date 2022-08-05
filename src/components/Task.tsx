import styles from "./Task.module.css";

import { CheckCircle, Circle, Trash } from "phosphor-react";

export interface TaskModel {
  description: string;
  isCompleted: boolean;
}

interface TaskProps {
  task: TaskModel;
  onFinishTask: (task: TaskModel) => void;
  onDeleteTask: (task: TaskModel) => void;
}

export function Task({ task, onFinishTask, onDeleteTask }: TaskProps) {
  function handleFinishTask() {
    if (task.isCompleted) return;

    onFinishTask(task);
  }

  function handleDeleteTask() {
    onDeleteTask(task);
  }

  return (
    <div
      className={`${styles.task} ${
        task.isCompleted ? styles.taskCompleted : ""
      }`}
    >
      <div>
        <button onClick={handleFinishTask}>
          {task.isCompleted ? (
            <CheckCircle
              size={24}
              className={styles.circleFilled}
              weight="fill"
            />
          ) : (
            <Circle size={24} className={styles.circle} />
          )}
        </button>

        <p>{task.description}</p>
      </div>

      <button onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </div>
  );
}
