import React, { useState } from "react";
import styles from "./Tasks.module.css";

export default function Tasks() {
  // start with no tasks
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [est, setEst] = useState(1);

  const addNew = () => {
    if (!text.trim()) return;
    setTasks((t) => [
      ...t,
      { id: Date.now(), text: text.trim(), est: Number(est) || 1, completed: 0 },
    ]);
    setText("");
    setEst(1);
    setShowForm(false);
  };

  const cancelAdd = () => {
    setText("");
    setEst(1);
    setShowForm(false);
  };

  // increment completed pomodoros for a task (up to est)
  const incCompleted = (id) => {
    setTasks((t) =>
      t.map((item) =>
        item.id === id
          ? { ...item, completed: Math.min(item.est, (item.completed || 0) + 1) }
          : item
      )
    );
  };

  // decrement completed pomodoros for a task (down to 0)
  const decCompleted = (id) => {
    setTasks((t) =>
      t.map((item) =>
        item.id === id ? { ...item, completed: Math.max(0, (item.completed || 0) - 1) } : item
      )
    );
  };

  const remove = (id) => setTasks((t) => t.filter((x) => x.id !== id));

  return (
    <div className={styles.tasksContainer}>
      <div className={styles.header}>
        <h3>Tasks</h3>
        <button className={styles.menuBtn}>⋮</button>
      </div>

      <div className={styles.list}>
        {tasks.map((task) => {
          const done = (task.completed || 0) >= (task.est || 1);
          return (
            <div key={task.id} className={styles.taskItem}>
              <button
                className={`${styles.check} ${done ? styles.checked : ""}`}
                onClick={() => incCompleted(task.id)}
                aria-label="increment completed"
                title="Klik untuk menandai 1 pomodoro selesai"
              >
                {done ? "✓" : ""}
              </button>

              <div className={styles.taskText}>
                <span className={done ? styles.doneText : ""}>{task.text}</span>
                <div className={styles.counterRow}>
                  <small className={styles.counter}>
                    {(task.completed || 0)}/{task.est}
                  </small>
                  <button
                    className={styles.decBtn}
                    onClick={() => decCompleted(task.id)}
                    aria-label="decrement completed"
                    title="Kurangi 1 pomodoro selesai"
                  >
                    −
                  </button>
                </div>
              </div>

              <div className={styles.rightActions}>
                <button className={styles.more} onClick={() => remove(task.id)} title="Hapus">
                  🗑
                </button>
              </div>
            </div>
          );
        })}

        {/* Inline add area */}
        {!showForm ? (
          <button className={styles.addTask} onClick={() => setShowForm(true)}>
            <span className={styles.plus}>＋</span>
            <span>Add Task</span>
          </button>
        ) : (
          <div className={styles.addForm}>
            <input
              className={styles.input}
              placeholder="Nama tugas"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className={styles.formRow}>
              <label className={styles.estLabel}>Estimasi Pomodoro</label>
              <input
                type="number"
                min="1"
                className={styles.estInput}
                value={est}
                onChange={(e) => setEst(e.target.value)}
              />
            </div>
            <div className={styles.formActions}>
              <button className={styles.cancelBtn} onClick={cancelAdd}>
                Batal
              </button>
              <button className={styles.saveBtn} onClick={addNew}>
                Simpan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}