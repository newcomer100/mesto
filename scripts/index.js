const forms = document.querySelectorAll('form')
const popups = document.querySelectorAll('[data-popup]')
const closePopupButtons = document.querySelectorAll('.popup__close')
const image = document.querySelector('.card__image')
const title = document.querySelector('.card__title')

const nameInput = document.querySelector('.popup__input_field_name')
const profileName = document.querySelector('.profile__name')

const jobInput = document.querySelector('.popup__input_field_job')
const profileJob = document.querySelector('.profile__job')

const cards = document.querySelector('.cards')
const cardDeleteButton = document.querySelector('.card__trash')
const cardLikeButton = document.querySelector('.card__like')

const placeNameInput = document.querySelector('.popup__input_place_name')
const placeLinkInput = document.querySelector('.popup__input_place_link')
const card = document.querySelector('.card')
const cardTemplate = document.querySelector('#template')
const popup = document.querySelector('.popup')

function openPopup(popup) {
  document.querySelector(`#${popup}`).classList.add('popup_opened');
}

function openPopupImage(popupId, data){
  const popup = document.querySelector(`#${popupId}`)
  document.querySelector(`#${popupId}`).classList.add('popup_opened');
  document.querySelector('.popup__image').src = data.src
  document.querySelector('.popup__title_place').innerHTML =  data.parentNode.querySelector('h2').innerHTML
}

function removeCard(element) {
  element.closest('.card').remove()
} 

function likeCard(element) {
  element.classList.toggle('card__like_active')
}
// ставит лайк только после добавления новой карточки//
function foo(){
  cards.addEventListener('click', (e) => {
    const el = e.target
    if (el.classList.contains('card__like')){
      likeCard(el) 
    } 
    if (el.classList.contains('card__image')){
      const name = e.target.closest('.card').title.textContent
      openPopupImage(e.target.dataset.popup, e.target, name)
    }
  });
 }
 foo()
function createCardElement(name, link) {
    const cardElement = cardTemplate.content.cloneNode(true)
    cardElement.querySelector('.card__title').textContent = name
    cardElement.querySelector('.card__image').src = link
    cardElement.querySelector('.card__title').alt = name
   return cardElement
 }
 

   
 let count = 1
function generateCards() {
  cards.innerHTML = ''
  console.log(initialCards)
  initialCards.map((item) => {
    const element = createCardElement(item.name, item.link) 
    cards.prepend(element)
  });
}

generateCards()

function addCards() {
    initialCards.push({
      name: placeNameInput.value,
      link: placeLinkInput.value,
      id: count++
    })
    generateCards()
}


function closePopup(popup){
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
        } else if (event.target.closest('#add')) {
            addCards()
            closePopup(event.target)
            document.forms['addForm'].reset()
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
