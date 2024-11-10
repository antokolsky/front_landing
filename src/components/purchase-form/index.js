import { sculpture_order } from "../../api/sculpture_order";
const modalElement = document.getElementById("purchase");
const closeBtn = document.getElementById("close-btn");

const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);
const bodyElementHTML = document.body;

const bodyMargin = (x) => bodyElementHTML.style.marginRight = x + "px";

export const purchaseDialogOpen = (lot) => {
    const inputLot = document.getElementById("lot");
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
    submitPurchase()
};

const handleModalOpen = () => {
    purchaseDialogOpen('Not sure yet');
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

const submitPurchase=()=>{
  const form=  modalElement.querySelector(".purchase__form")
    form.addEventListener("submit",(event)=>{
        event.preventDefault()

      const sculpture_name=  event.currentTarget.lot.value
     const email=   event.currentTarget.email.value
       const phone= event.currentTarget.phone.value
        sculpture_order({sculpture_name,email,phone})
        .then(ref=>console.log(ref))
        .catch(er=>console.log(er))
    })
    
}