import { useState } from 'react';
import '../styles/TodoListPage.css'
const TodoListPage=()=>{
  const [isUpdate, setIsUpdate]=useState(false);
  const [id, setId]=useState(Date.now());
    const [error, setError]=useState("");
      const [name, setName]=useState("");
      const [toDo, setToDo]=useState([]);
      const [infoButton, setInfoButton]=useState("Tambah");
      const addToDo=(item)=>{
        setToDo([...toDo,item]);
      }
      const updateToDo=(itemId, itemName)=>{
        const tempItems2=[...toDo];
        let tempItem;
        let tempIndex;
        for(let i=0;i<tempItems2.length;i++){
            if(tempItems2[i].id===itemId){
                tempItem=tempItems2[i];
                tempIndex=i;
                break;
            }
        }
        tempItem.name=itemName;
        const tempItemsFinal=tempItems2.filter(
          (item)=>{
            return item.id!==itemId;
          }
        );
      tempItemsFinal.splice(tempIndex,0,tempItem);
      setToDo([...tempItems2]);
      }
      const onDeleteItem=(itemId)=>{
        const tempItems1=[...toDo];
        const tempItems=tempItems1.filter(
          (item)=>{
            return item.id!==itemId;
          }
        );
        setToDo([...tempItems]);
      }
      const onUpdateItemName=(itemId, itemName)=>{
        setName(itemName);
        setIsUpdate(true);
        setId(itemId);
        setInfoButton("Update");
      }
      const onUpdateItem=(itemId)=>{
        const tempItems2=[...toDo];
        let tempItem;
        let tempIndex;
        for(let i=0;i<tempItems2.length;i++){
            if(tempItems2[i].id===itemId){
                tempItem=tempItems2[i];
                tempIndex=i;
                break;
            }
        }
        if(tempItem.isDone===false){
        tempItem.isDone=true;
        }else{
        tempItem.isDone=false;
        }
        const tempItemsFinal=tempItems2.filter(
            (item)=>{
              return item.id!==itemId;
            }
          );
        tempItemsFinal.splice(tempIndex,0,tempItem);
        setToDo([...tempItems2]);
      }
      const handleSubmit=(event)=>{
        event.preventDefault();
        if(name===""){
            alert("INPUT IS EMPTY");
          return;
        }
        if(isUpdate===false){
        const newItem={
          name,
          isDone: false,
          id: Date.now()
        }
        addToDo(newItem);
      }else{
        updateToDo(id, name);
        setIsUpdate(false);
        setInfoButton("Tambah");
      }
      setName("");
      }
    return(
        <>
        <div className="app">
    <h1>My ToDo List</h1>
    <div className='error-message'>{error}</div>
    <form className="add-form" onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="input nama kegiatan..." value={name} onChange={
            (event)=>
                {
                    if(name.length>10){
                        setError("Input Too Long");
                        setName("");
                        return;
                    }   
                    if(name.length===0){
                        setError("");
                    }
                    setName(event.target.value);
                }
            }/>
      </div>
      <button>{infoButton}</button>
    </form>
    <div className="list">
      <ul>
        {
        toDo.map((item, index)=>(
        <li key={item.id}>
          <span style={item.isDone ? {textDecoration: 'line-through'} : {}}>{index+1}. {item.name}</span>
          <button className='delete' onClick={()=>onDeleteItem(item.id)}>Delete</button>
          <button className='updateName' onClick={()=>onUpdateItemName(item.id, item.name)}>Update</button>
          <button className='update' onClick={()=>onUpdateItem(item.id)}>CheckList</button>
        </li>
        )
            )
        }
      </ul>
    </div>
  </div>
        </>
    )
}

export default TodoListPage;