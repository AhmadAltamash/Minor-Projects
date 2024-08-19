let color = document.getElementById("color");
let createBtn = document.getElementById("b1");
let list = document.getElementById("list");

createBtn.addEventListener("click",()=>{
    try{
        let newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.innerHTML = 
        `<span class="close">x</span>
        <textarea name="notes" id="notes" placeholder="Write Content..." rows="10" cols="30"></textarea>`;
        newNote.style.borderColor = color.value;
        list.appendChild(newNote);
    }
    catch(error){
        console.log(error)
    }
})


document.addEventListener("click", (event)=>{
    if(event.target.classList.contains('close'))
    {
        event.target.parentNode.remove();
    }
})

let cursor = {
    x: null,   
    y: null    
}
let note = {
    dom: null,
    x: null,
    y: null
}
document.addEventListener('mousedown', (event) =>{
    if(event.target.classList.contains('note'))
    {
        cursor = {
            x: event.clientX,   
            y: event.clientY    
        }
        note = {
            dom: event.target,
            x: event.target.getBoundingClientRect().left,
            y: event.target.getBoundingClientRect().top
        }
    }
})

document.addEventListener('mousemove', (event)=>{
    if(note.dom == null) return;

    let currentCursor ={
        x: event.clientX,   
        y: event.clientY  
    }
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y,
    }
    note.dom.style.left = (note.x + distance.x) + 'px'
    note.dom.style.top = (note.y+ distance.y) + 'px'
    note.dom.style.cursor = 'grab'
})

document.addEventListener("mouseup", ()=>{
    if(note.dom == null) return;
    note.dom.style.cursor = 'auto'
    note.dom = null;
})