import "./index.css";
import { enableValidation, config, resetValidation, disableButton } from "../scripts/validation.js";
import avatarSrc from "../images/avatar.jpg";
const avatarImage = document.getElementById("profile_image");
avatarImage.src = avatarSrc;

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    alt: "Outdoor dinning",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const closeButtons = document.querySelectorAll(".modal__close");

// Profile Elemenets
const editModalBtn = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// Form Elements
const editModal = document.querySelector("#edit-modal");
const editForm = editModal.querySelector(".modal__form");
const editSubmitBtn = editModal.querySelector(".modal__submit-btn");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const nameInput = editModal.querySelector("#profile-name-input");
const descriptionInput = editModal.querySelector("#profile-description-input");

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardNameInput = cardModal.querySelector("#add-card-name-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

// Card elements
const cardTemplate = document.querySelector("#card__template");
const cardList = document.querySelector(".cards__list");

// Card Element Data
function getCardElement(data) {
  const cardEl = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardNameEl = cardEl.querySelector(".card__title");
  const cardImgEl = cardEl.querySelector(".card__image");
  const cardLikeBtn = cardEl.querySelector(".card__like-btn");
  const cardDeleteBtn = cardEl.querySelector(".modal__delete-btn");

  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });
  return cardEl;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("mousedown", handleOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", handleOverlay);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = nameInput.value;
  profileDescriptionEl.textContent = descriptionInput.value;
  closeModal(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  evt.target.reset();
  const cardEl = getCardElement(inputValues);
  cardList.prepend(cardEl);
  disableButton(cardSubmitBtn, config);
  closeModal(cardModal);
}

editModalBtn.addEventListener("click", () => {
  nameInput.value = profileNameEl.textContent;
  descriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editForm,
    [nameInput, descriptionInput],
    editSubmitBtn,
    config
  );
  openModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

editForm.addEventListener("submit", handleEditProfileSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

// listing out the cards
initialCards.forEach((card) => {
  const cardEl = getCardElement(card);
  cardList.append(cardEl);
});

enableValidation(config);