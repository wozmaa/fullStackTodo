import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodos,
  fetchTodos,
  patchTodos,
  postTodos,
} from "./feauters/todoSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const deleteTodo = (item) => {
    dispatch(deleteTodos(item));
  };

  const patchTodo = (item) => {
    dispatch(patchTodos(item));
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const postTodo = () => {
    if(text !== '')
    dispatch(postTodos(text));
    setText("");
  };


  return (
    <div className="main">
      <div className="tittle">
        <h1 className="textTodo">Todo</h1>
        <h1 className="textList">list</h1>
      </div>

      <div className="form">
        <input
          type="text"
          onChange={handleChange}
          value={text}
          placeholder="Введите текст..."
        />
        <button onClick={() => postTodo(text)}>+</button>
      </div>

      <div className="todoList">
        <div className="load">
         {(loading && <div class="lds-heart"><div></div></div>)}
        </div>
        {todos.map((item, id) => {
          return (
            <>
            <div key={id} className="todoshk">
              
              <button onClick={() => patchTodo(item)}>★</button>
              {!item.done ? item.text : <strike>{item.text}</strike>}
              <button onClick={() => deleteTodo(item)}>x</button>
            </div>
      
        
            </>
          );
        })}
        
      </div>
    </div>
  );
}

export default App;
