/* global _:readonly */
import { renderPhoto } from './picture-preview.js';
import { uploadPhoto, closeOverlayHandler } from './upload-photo.js';
import {setUserFormSubmit} from './form-validation.js';
import {showError} from './alertMessage.js';
import { request } from './fetch.js';
import {setFilters} from './filter-handlers.js';
const RERENDER_DELAY = 500;
uploadPhoto();

const onSuccess = (photos)=>{
  console.log(photos);
  renderPhoto(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  setFilters(photos);
};

request(onSuccess, showError, 'GET');

setUserFormSubmit(closeOverlayHandler);
