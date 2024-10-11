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
