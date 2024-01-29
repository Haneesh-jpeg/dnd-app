"use client"
import React, {useState} from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Home() {

  const [date, setDate] = useState(new Date());
  const [TitlesArray, setTitlesArray] = useState([]);
  const [Title, setTitle] = useState('');
  const [des,setDes] = useState('');

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today.setHours(0, 0, 0, 0);



  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const desChange = (e) => {
    setDes(e.target.value);
  };


  const inputChange = (e) => {
    setTitle(e.target.value);
  };

  const inputSubmit = (e) => {
    e.preventDefault();
    if (Title.trim() && des.trim) {
      setTitlesArray([...TitlesArray, Title]);
      setTitle('');
      setDes('');
    }
  };

  const handleDelete = (index) => {
    setTitlesArray(TitlesArray.filter((_, i) => i !== index));
  };


  return (
    <main className="p-0 m-0 relative flex flex-col justify-center">
      <div className="bg-red-300 flex flex-col p-[5rem] rounded-2xl w-1/2 space-y-6">
      <input className="w-[10rem] rounded-lg text-sm p-2.5" type="text" placeholder="Title" name="title" value={Title} onChange={inputChange} />
      {/* date*/}
       <div class="relative max-w-sm">
       <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
         <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
      </svg>
      </div>
        <input type="date"
          value={date.toISOString().split('T')[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          min={minDate.toISOString().split('T')[0]} 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Select date" />
      </div>
    

      <input className="h-10 rounded-lg" name="Description" placeholder="Description" value={des} onChange={desChange}/>
      <button className="text-white bg-blue-300" onClick={inputSubmit}>Save</button>
      </div>


      <div className="relative flex flex-col my-12">
 
      <ul className="p-11 bg-green-400 w-[40rem] rounded-lg justify-around my-8 characters">
        {TitlesArray.map((Title, index) => (
          <li key={index} className="text-2xl my-12">
            {Title}
            <button className="text-lg bg-red-500 p-2.5 rounded-lg float-end" onClick={() => handleDelete(index)}>Delete</button>
          </li>
       
        ))}
      </ul>
      </div>
    
    </main>
  );
}
