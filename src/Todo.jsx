import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function () {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  function inpValue(event) {
    // console.log(event.target.value);
    setNewTodo((e) => {
      return event.target.value;
    });
  }

  const addTodo = (e) => {
    e.preventDefault();
    // we create if statement to prevent adding empty todo
    if (newTodo) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      //   console.log(todos);
      // clear the input field
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(todos);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
          <form onSubmit={addTodo} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={inpValue}
              placeholder="Add a new todo"
              className="flex-grow mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
            <button
              type="submit"
              className="bg-stone-900 px-4 rounded-lg text-white"
            >
              Add
            </button>
          </form>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
              >
                <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`flex-grow ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.text}
                </label>
                <button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
