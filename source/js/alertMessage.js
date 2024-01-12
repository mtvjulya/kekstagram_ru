import {isEscEvent} from './util.js';



const showSuccess = ()=>{
  const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  console.log(successMessage);
  const closeSuccessMessageButton = successMessage.querySelector('.success__button');

  const closeMassage = ()=>{
    successMessage.remove();
  };

  closeSuccessMessageButton.addEventListener('click',closeMassage);

  const EscKeydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMassage();
    }
  };
  document.addEventListener('keydown', EscKeydownHandler);
  document.addEventListener('click',(evt)=>{
    let e = successMessage.querySelector('.success__title');
    if(!e.contains(evt.target)){
      closeMassage();
    }
  });
  document.body.appendChild(successMessage);
};

const showError = ()=>{
  const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  errorMessage.style.zIndex= '2';
  const closeErrorMessageButton = errorMessage.querySelector('.error__button');

  const closeMassage = ()=>{
    errorMessage.remove();
  };

  closeErrorMessageButton.addEventListener('click',closeMassage);

  const EscKeydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMassage();
    }
  };
  document.addEventListener('keydown', EscKeydownHandler);
  document.addEventListener('click',(evt)=>{
    let e = errorMessage.querySelector('.error__title');
    if(!e.contains(evt.target)){
      closeMassage();
    }
  });
  document.body.append(errorMessage);
};
export {showSuccess,showError};
