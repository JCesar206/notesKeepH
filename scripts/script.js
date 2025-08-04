const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const notesContainer = document.getElementById('notes-container');
const clearBtn = document.getElementById('clear-btn');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
	notesContainer.innerHTML = '';
	notes.forEach((note, index) => {
		const div = document.createElement('div');
		div.className = 'note';

		const text = document.createElement('div');
		text.textContent = note;
		div.appendChild(text);

		const btns = document.createElement('div');
		btns.className = 'note-buttons';

		const editBtn = document.createElement('button');
		editBtn.textContent = 'Editar';
		editBtn.onclick = () => editNote(index);

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Eliminar';
		deleteBtn.onclick = () => deleteNote(index);

		btns.append(editBtn, deleteBtn);
		div.appendChild(btns);

		notesContainer.appendChild(div);
	});
}

function addNote(note) {
	notes.push(note);
	saveNotes();
}

function editNote(index) {
	const newText = prompt('Edita la nota:', notes[index]);
	if (newText !== null && newText.trim() !== '') {
		notes[index] = newText.trim();
		saveNotes();
	}
}

function deleteNote(index) {
	if (confirm('¿Eliminar esta nota?')) {
		notes.splice(index, 1);
		saveNotes();
	}
}

function saveNotes() {
	localStorage.setItem('notes', JSON.stringify(notes));
	renderNotes();
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const note = input.value.trim();
	if (note !== '') {
		addNote(note);
		input.value = '';
	}
});

clearBtn.addEventListener('click', () => {
	input.value = '';
	input.focus();
});

renderNotes();