"use client";

import { useState, useEffect } from "react";
import Title from "./Tile";
import styles from './Form.module.css';

let edit = -1;
export default function Form() {
  const [txtValue, setTxtValue] = useState('');

  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setTxtValue(e.target.value);
  };

  const addHandle = (e) => {

    e.preventDefault();

    if(tasks.indexOf(txtValue) !== -1) {
      alert(`Task (${txtValue}) já existe na lista!`);
      return;
    };

    if(txtValue !== '') {
      if(edit === -1) {
        setTasks([txtValue.trim(), ...tasks]);

      } else {
        const editListOfTasks = [ ...tasks ];

        // get item for edit
        editListOfTasks.splice(edit, 1, txtValue.trim());

        // const updateListOfTasks = [ ...editListOfTasks, txtValue ];
        const updateListOfTasks = [ ...editListOfTasks ];

        setTasks(updateListOfTasks);

        edit = -1;
      }
    }

    setTxtValue('');
  }

  const taskEdit = (e, indice) => {
    console.log('Edit current', edit);
    edit = indice;
    console.log('Edit after setEdit', edit);

    setTxtValue(tasks[indice]);
  }

  const handleDelete = (e, indice) => {

    const novaLista = [...tasks];

    novaLista.splice(indice, 1);

    setTasks([...novaLista]);
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('tasks'));

    if(todos) {
      setTasks(tasks);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <Title txt="List of taks" />

      <form className={styles.form}>
        <input
          autoFocus
          type="text"
          name="task"
          placeholder="Your task here..."
          onChange={handleChange}
          value={txtValue}
          className={styles.input} />

        <button
          disabled={!txtValue ? true : false}
          onClick={addHandle}
          className="primary">Add</button>
      </form>

      <section className={styles.tasks}>
        <ul>
          {!tasks.length && (
            <p>No tasks (0).</p>
          )}

          {tasks.map((t, indice) => (
            <li key={t} className={styles.taskActions}>
              {t}
              <div>
                <span onClick={(e) => taskEdit(e, indice)}>+</span>
                <span onClick={(e) => handleDelete(e, indice)}>-</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
