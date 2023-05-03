import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { v4 as uuidv4 } from 'uuid';

const refs = {
  form: document.querySelector('.form'),
  username: document.querySelector('.userName'),
  email: document.querySelector('.email'),
  list: document.querySelector('ul'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', onInput);
refs.list.addEventListener('click', onListRemove);


const STORAGE_KEY = 'form-data';
let formData = {};
populateInput();

function onFormSubmit(event) {
  event.preventDefault();
  if (!refs.username.value || !refs.email.value) {
    Notify.warning('Заполните все поля!');
    return;
  }
  addToList(refs.username.value, refs.email.value);
  console.log(formData);
  refs.form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function addToList(username, email) {
  const id = uuidv4();

  const newListItem = `<li data-id='${id}'>${username} ${email}</li>`;
  refs.list.insertAdjacentHTML('beforeend', newListItem);
}

function onListRemove(event) {
  event.target.remove();
}

function onInput() {
  formData = {
    username: refs.username.value,
    email: refs.email.value,
  };

  const dataString = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, dataString);
}

function populateInput() {
  const localStorageData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(localStorageData);
  if (parsedData && parsedData.username) {
    refs.username.value = parsedData.username;
  }
  if (parsedData && parsedData.email) {
    refs.email.value = parsedData.email;
  }
}



