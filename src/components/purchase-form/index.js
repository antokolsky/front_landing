import { sculpture_order } from "../../api/sculpture_order";
const modalElement = document.getElementById("purchase");
const closeBtn = document.getElementById("close-btn");

const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);
const bodyElementHTML = document.body;

const bodyMargin = (x) => (bodyElementHTML.style.marginRight = x + "px");

export const purchaseDialogOpen = (lot) => {
  const inputLot = document.getElementById("sculpture_name");
  if (lot) {
    inputLot.value = lot;
  }
  bodyMargin(scrollbarWidth);
  closeBtn.addEventListener("click", handleModalClose);
  modalElement.addEventListener("click", handleModalClick);
  modalElement.showModal();
  bodyElementHTML.classList.add("scroll-lock");
};

export const purchaseDialogInit = () => {
  const headerBtn = document.querySelector(".header__button");
  headerBtn.addEventListener("click", handleModalOpen);
  submitPurchase();
};

const handleModalOpen = () => {
  purchaseDialogOpen("Not sure yet");
};

const handleModalClose = () => {
  bodyElementHTML.classList.remove("scroll-lock");
  bodyMargin(0);
  modalElement.close();
  // modalElement.removeEventListener("click", handleModalClose);
};

const handleModalClick = ({ currentTarget, target }) => {
  if (target === currentTarget) {
    handleModalClose();
  }
};

const submitPurchase = () => {
  const form = modalElement.querySelector(".purchase__form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    if (window.localStorage.getItem("sculpture_order")) {
      return;
    }
    const sculpture_name = event.currentTarget.sculpture_name.value;
    const email = event.currentTarget.email.value;
    const phone = event.currentTarget.phone.value;

    sculpture_order({ sculpture_name, email, phone })
      .then((ref) => {
        if (ref.ok === false) throw ref.json();

        return ref.json();
      })
      .then((ref) => {
        window.localStorage.setItem("sculpture_order", "true");
        alert("The order is accepted. We will get in touch with you.");
      })
      .catch((er) => {
        er.then((errors) => {
          setErrors(errors, form);
        });
      });
  });
};

function setErrors(errors, form) {
  const fields = Object.keys(errors);

  fields.forEach((field) => {
    const errorEl = form.elements[field].parentElement.querySelector(".error");

    form.elements[field].classList.add("field-error");
    errorEl.classList.add("error_active");
    errorEl.textContent = errors[field].join(" ");
  });
}

function clearErrors() {
  const errorTexts = document.querySelectorAll(".error_active");
  const errorFields = document.querySelectorAll(".field-error");
  errorTexts.forEach((el) => {
    el.classList.remove("error_active");
  });

  errorFields.forEach((el) => {
    el.classList.remove("field-error");
  });
}
