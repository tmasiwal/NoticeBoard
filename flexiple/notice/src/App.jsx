
import { useState } from 'react'
import './App.css'
import Note from './Note'

function App() {

const [notes ,setNotes]=useState(JSON.parse(localStorage.getItem('notes'))||[])
let x = Math.floor(Math.random() * 50) + 1;
let y = Math.floor(Math.random() * 50) + 1; 
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const addNotes =()=>{
  const newNotes = [...notes,{text:"New Note",x:x*10,y:y*10,isPinned:false}]
  localStorage.setItem('notes',JSON.stringify(newNotes))
  setNotes(newNotes)
}
const removeNotes =(ind)=>{
    const updatedNotes = [...notes];
    updatedNotes.splice(ind, 1);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
}
const updateNotes =( ind,newText)=>{
  console.log(ind,newText)
   const updatedNotes = [...notes];
   updatedNotes[ind].text = newText;
   localStorage.setItem("notes", JSON.stringify(updatedNotes));
   setNotes(updatedNotes);
}
const pinNote = (ind) => {
  const updatedNotes = [...notes];
  updatedNotes[ind].isPinned = !updatedNotes[ind].isPinned;
   localStorage.setItem("notes", JSON.stringify(updatedNotes));
  setNotes(updatedNotes);
};
const handleDragStart = (e, ind) => {
  setMousePosition((prevMousePosition) => ({ x: e.clientX, y: e.clientY }));
  
};

const handleDragEnd = (e, ind) => {

  const offsetX = e.clientX - mousePosition.x;
  const offsetY = e.clientY - mousePosition.y;
  console.log("Drag ended at coordinates:", offsetX, offsetY);
  const updatedNotes = [...notes];
  updatedNotes[ind].x =updatedNotes[ind].x+ offsetX;
  updatedNotes[ind].y = updatedNotes[ind].y+ offsetY;
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  setNotes(updatedNotes);
  
};


  return (
    <>
      <button className="addButton" onClick={addNotes}>+</button>

      {notes?.map((note,ind)=>{return (
        <Note
          key={ind}
          onDragEnd={handleDragEnd}
          ind={ind}
          note={note}
          updateNotes={updateNotes}
          pinNote={pinNote}
          removeNotes={removeNotes}
          onDragStart={handleDragStart}
        />
      );
      })}
    </>
  )
}

export default App
