import {showSuccess, showError} from './alertMessage.js';
import { request } from './fetch.js';
const form = document.querySelector('.img-upload__form');
const hashtag = form.querySelector('.text__hashtags');
const commentText = form.querySelector('.text__description');
const publicBtn = form.querySelector('.img-upload__submit');


const validateComments = ()=>{
  commentText.value = '';
  commentText.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
  commentText.addEventListener('change',()=>{
    if(commentText.value.length>10){
      commentText.setCustomValidity('длина комментария не может составлять больше 140 символов');
    }else{
      commentText.setCustomValidity('');
    }
  });
};

const validateHashtag = ()=>{
  hashtag.value = '';
  hashtag.style.outline = 'none';
  hashtag.setCustomValidity('');
  hashtag.addEventListener('input', () => {
    hashtag.setCustomValidity('');
    let hashtagText = hashtag.value.toLowerCase().trim();
    if(!hashtagText){
      hashtag.style.outline= 'none';
      return;
    }
    let hashtagArr = hashtagText.split(/\s+/);
    if(hashtagArr.length===0){

      return;
    }

    hashtagArr.forEach((element, index) => {

      if (!(/^[a-zа-я ^0-9#]*$/i.test(element))) {
        hashtag.setCustomValidity('не может содержать пробелы, спецсимволы (@, $ и т. п.)');
      }
      if (index > 4) {
        hashtag.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      }
    });
    const isNotHash = hashtagArr.some((value) => {
      return value[0] !== '#';
    });
    if (isNotHash) {
      hashtag.setCustomValidity('хэш-тег начинается с символа #');
    }
    const isTooLong = hashtagArr.some((value) => {
      return value.length > 20;
    });
    if (isTooLong) {
      hashtag.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
    }

    const isTooShort = hashtagArr.some((value) => {
      return value === '#';
    });
    if (isTooShort) {
      hashtag.setCustomValidity('хеш-тег не может состоять только из одной решётки');
    }

    const isSameHashtag = hashtagArr.some((value, index, arr) => {
      return arr.indexOf(value, index + 1) >= index;
    });
    if (isSameHashtag) {
      hashtag.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    }

    if (!hashtag.validity.valid) {
      hashtag.style.outline = '3px red solid';
    } else {
      hashtag.style.outline = 'none';
    }
    hashtag.reportValidity();
  });
  hashtag.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
  publicBtn.addEventListener('click', (evt) => {
    if(!hashtag.validity.valid){
      evt.preventDefault();
    }
  });
};


const setUserFormSubmit = (closeForm) => {
  const onSuccess = ()=>{
    showSuccess();
    closeForm();
  };
  form.addEventListener('submit',(evt)=>{
    evt.preventDefault();

    const formData = new FormData(evt.target);

    request(onSuccess,showError,'POST',formData);
  });
};

export {validateHashtag, validateComments,setUserFormSubmit};
