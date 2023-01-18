const forms = document.querySelectorAll('form')
const popups = document.querySelectorAll('[data-popup]')
const closePopupButtons = document.querySelectorAll('.popup__close')

const nameInput = document.querySelector('.popup__input_field_name')
const profileName = document.querySelector('.profile__name')

const jobInput = document.querySelector('.popup__input_field_job')
const profileJob = document.querySelector('.profile__job')

const cards = document.querySelector('.cards')

function openPopup(popup) {
  document.querySelector(`#${popup}`).classList.add('popup_opened');
  inputInf()
}

function closePopup(popup){
  const form = popup.parentNode.querySelector('form')
  Array.from(form.elements).map(item => item.value = '')
  popup.closest('.popup').classList.remove('popup_opened')
}

function inputInf(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function savePersonData () {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

forms.forEach(function(element) {
    element.addEventListener('submit', event => {
        event.preventDefault()
        if(event.target.closest('#edit')) {
            savePersonData()
            closePopup(event.target)
        }
    });
});

Array.from(popups).forEach(function(element) {
    element.addEventListener('click', event => {
        openPopup(event.target.dataset.popup, event.target)
    });
});

Array.from(closePopupButtons).forEach(function(element) {
    element.addEventListener('click', event => {
        closePopup(event.target)
    });
});
