import { useState, useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  //Fetch todos from backend
  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  }, []);

  //Add new todo
  const addTodo = async () => {
    if (!title.trim()) return;
    const res = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]); //add new todo to the top
    setTitle("");
  };

  //Toggle Complete
  const toggleTodo = async (id) => {
    const res = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
    });
    const updated = await res.json();
    //if the of what we updated matches the id of what we're worked on replace it with the updated one
    setTodos(todos.map((todo) => (todo._id === id ? updated : todo)));
  };

  //Delete Todo
  const deleteTodo = async (id) => {
    setDeletingId(id);
    setTimeout(async () => {
      await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      setDeletingId(null);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-950 to-emerald-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 p-1 bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
          My Todos
        </h1>
        
        <div className="flex gap-3 mb-8 justify-center">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            className="px-6 py-3 w-80 rounded-full bg-white/10 backdrop-blur-md border border-white/20 focus:border-green-400/50 focus:outline-none shadow-lg transition-all duration-200 text-white placeholder-green-200/50"
          />
          <button
            onClick={addTodo}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold hover:from-green-400 hover:to-emerald-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/50"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300 transform ${
                deletingId === todo._id 
                  ? 'opacity-0 scale-95 -translate-x-4' 
                  : 'opacity-100 scale-100 translate-x-0 animate-slideIn'
              }`}
              style={{
                animation: deletingId !== todo._id ? 'slideIn 0.4s ease-out' : 'none'
              }}
            >
              <div className="flex items-center justify-between p-5">
                <span
                  onClick={() => toggleTodo(todo._id)}
                  className={`flex-1 text-lg cursor-pointer transition-all duration-200 ${
                    todo.completed 
                      ? 'text-green-300/50 line-through' 
                      : 'text-green-50 hover:text-green-300'
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="ml-4 text-2xl hover:scale-125 transition-transform duration-200 opacity-60 hover:opacity-100"
                  aria-label="Delete todo"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <div className="text-center py-12 text-green-300/50 text-lg">
            No todos yet. Add one above! ✨
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default App;