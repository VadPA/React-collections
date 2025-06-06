import { useState } from 'react';

const data = [
  {
    id: 1,
    item: 'Hello Bob',
    isCompleted: false,
  },
  {
    id: 2,
    item: 'Hello Sally',
    isCompleted: false,
  },
  {
    id: 3,
    item: 'Hello Ann',
    isCompleted: false,
  },
];

const TodoList = () => {
  const [list, setList] = useState(data);
  const [text, setText] = useState('');
  const [edit, setEdit] = useState(null);

  const addHandler = (e) => {
    setText(e.target.value);
  };

  const addTodoHandler = () => {
    if (edit) {
      setList(
        list.map((todo) =>
          todo.id === edit ? { id: edit, item: text, isCompleted: false } : todo
        )
      );
      setText('');
      setEdit(null);
    } else {
      setList([
        ...list,
        {
          id: Math.random().toString(),
          item: text,
          isCompleted: false,
        },
      ]);
      setText('');
    }
  };

  const deleteHandler = (todo) => {
    const FilteredArray = list.filter((item) => item.id !== todo.id);
    setList(FilteredArray);
  };

  const editHandler = (todo) => {
    setEdit(todo.id);
    setText(todo.item);
  };

  const setToggle = (id) => {
    setList(
      list.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div
      style={{
        width: '800px',
        margin: '30px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontFamily: 'sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#333' }}>ToDoList App</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add item"
          value={text}
          onChange={addHandler}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={addTodoHandler}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {edit ? 'Update' : 'Add'}
        </button>
      </div>
      <div>
        {list.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f9f9f9',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
            }}
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => setToggle(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <h3
              style={{
                flex: 1,
                margin: 0,
                textDecoration: todo.isCompleted ? 'line-through' : 'none',
                color: todo.isCompleted ? '#888' : '#000',
              }}
            >
              {todo.item}
            </h3>
            <button
              onClick={() => editHandler(todo)}
              style={{
                marginRight: '10px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(todo)}
              style={{
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
