const notes = document.querySelector('.notes')
const addBtn = document.getElementById('add')

const notesLS = JSON.parse(localStorage.getItem('notes'))

if (notesLS) {

    notesLS.forEach(text => {
        addNewNote(text)
    });
}


addBtn.addEventListener('click', () => {
    addNewNote()
})



function addNewNote(text = '') {

    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
   
        <div class="tools">
            <button class="edit"><i class="fas fa-edit ${text ? '' : "hide"}"></i><i class="fas fa-check ${text ? "hide" : ""}"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? '' : "hidden"}"></div>
        <textarea id="textarea"  class=${text ? 'hidden' : ''}></textarea>
    
    `

    const editBtn = note.querySelector('.edit')
    const deletebtn = note.querySelector('.delete')

    const icon_edit = note.querySelector('.fa-edit')
    const icon_check = note.querySelector('.fa-check')



    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    editBtn.addEventListener('click', () => {
        main.classList.toggle("hidden")
        textArea.classList.toggle("hidden")

        //console.log(icon_edit, icon_check)
        icon_edit.classList.toggle("hide")
        icon_check.classList.toggle("hide")

    })

    textArea.value = text;
    main.innerHTML = marked(text)

    deletebtn.addEventListener('click', () => {
        note.remove()
        updateLS()
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS()
    })

    notes.appendChild(note)


}


function updateLS() {

    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => {
        notes.push(note.value)
    })

    localStorage.setItem('notes', JSON.stringify(notes))
}

