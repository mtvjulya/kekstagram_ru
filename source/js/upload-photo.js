import {isEscEvent} from './util.js';
import {editingPhoto} from './photo-filters.js';
import {validateHashtag, validateComments} from './form-validation.js';
//import './form-validation.js';
const SCALE_VALUE = {
  MIN:25,
  MAX:100,
  STEP:25,
};
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const photoLoader = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const overlayCloseButton = uploadOverlay.querySelector('#upload-cancel');
const scaleControlSmaller = uploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValue = uploadOverlay.querySelector('.scale__control--value');
const imagePreview = uploadOverlay.querySelector('.img-upload__preview > img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const editPhoto = () => {
  let newScaleControlValue = SCALE_VALUE.MAX;

  scaleControlValue.value = newScaleControlValue + '%';
  imagePreview.style.transform = 'scale('+ (newScaleControlValue/100) +')';

  scaleControlSmaller.addEventListener('click', ()=>{
    if (newScaleControlValue <= SCALE_VALUE.MIN) {
      newScaleControlValue -= 0;
    } else {
      newScaleControlValue -= SCALE_VALUE.STEP;
      scaleControlValue.value = newScaleControlValue + '%' ;
      imagePreview.style.transform = 'scale('+ (newScaleControlValue/100) +')';
    }
  });
  scaleControlBigger.addEventListener('click', ()=>{
    if (newScaleControlValue >= SCALE_VALUE.MAX) {
      newScaleControlValue += 0;
    } else {
      newScaleControlValue += SCALE_VALUE.STEP;
      scaleControlValue.value = newScaleControlValue + '%' ;
      imagePreview.style.transform = 'scale('+ (newScaleControlValue/100) +')';
    }
  });
};

const closeOverlayHandler = ()=>{
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  photoLoader.value = '';
  document.removeEventListener('keydown',EscKeydownHandler);
};

const EscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeOverlayHandler();

    overlayCloseButton.removeEventListener('click', closeOverlayHandler);
  }
};
const uploadPhoto = ()=>{
  photoLoader.addEventListener('change',()=>{

    editPhoto();
    editingPhoto();
    validateHashtag();
    validateComments();
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    overlayCloseButton.addEventListener('click', closeOverlayHandler);
    document.addEventListener('keydown', EscKeydownHandler);

    const file = photoLoader.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        imagePreview.src = reader.result;
        effectsPreview.forEach((filter)=>{
          filter.style.backgroundImage = `url(${reader.result})`;
        })
      });

      reader.readAsDataURL(file);
    }


  });


};

export {uploadPhoto, closeOverlayHandler};
