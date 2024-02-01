"use client"
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTodos = [...todos];
    const [reorderedItem] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, reorderedItem);

    setTodos(updatedTodos);
  };

  const handleSaveTodo = () => {
    if (title && date && description) {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = { title, date, description };
        setTodos(updatedTodos);
      } else {
        const newTodo = { title, date, description };
        setTodos([...todos, newTodo]);
      }

      setTitle('');
      setDate('');
      setDescription('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const todoToEdit = todos[index];
    setTitle(todoToEdit.title);
    setDate(todoToEdit.date);
    setDescription(todoToEdit.description);

    setEditIndex(index);
  };

  return (
    <div className='flex flex-col self-center items-center justify-center'>
    <div className='relative grid grid-cols-2 gap-4 place-content-evenly w-1/2 p-8 rounded-2xl bg-red-300 my-24'>
      <div>
        <input 
        type="text" 
        placeholder='Title' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className="w-[10rem] rounded-lg text-sm p-2.5 text-black"
        />
      </div>
      <div>
        <input 
        type="date" 
        value={date} 
        min={new Date().toISOString().split('T')[0]} 
        onChange={(e) => setDate(e.target.value)} 
        className='w-[12rem] rounded-lg text-sm p-2.5 text-black float-end'
        />
      </div>
      <div>
        <input 
        type="text" 
        placeholder='Description' 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className="w-[20rem] rounded-lg text-sm p-2.5 text-black"
        />
      </div>
      <button onClick={handleSaveTodo} className="w-1/5 h-10 rounded-lg text-sm bg-green-400"> {editIndex !== null ? 'Update' : 'Save'} </button>
      </div>

      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-1/3 mt-6 space-y-2"
            >
              {todos.map((todo, index) => (
                <Draggable key={index} draggableId={`todo-${index}`} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-blue-300 p-4 rounded-3xl border ${
                        snapshot.isDragging && 'bg-gray'
                      }`}
                    >
                      <span className="font-bold text-lg text-black ">{todo.title}</span>
                      <span className="text-black ml-2 float-end">{todo.date}</span>
                      <p className="text-sm mt-4 text-black ">{todo.description}</p>
                      <div className="flex mt-6">
                        <button
                          onClick={() => handleEditTodo(index)}
                          className="p-2.5 bg-blue-500 rounded-lg w-[5rem] mr-8 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(index)}
                          className="p-2.5 rounded-lg w-[5rem] bg-red-500 hover:underline "
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    
    </div>
  );
};

export default Home;
