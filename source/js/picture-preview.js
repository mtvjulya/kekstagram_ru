// import {
//   getPhotoDescriptionArray
// } from './data.js';
import {
  openBigPicture
} from './big-photo.js';

const picture = document.querySelector('#picture').content.querySelector('.picture');
let pictures = document.querySelector('.pictures');
//const photoArray = getPhotoDescriptionArray();

const renderPhoto = (photoArray) => {
  let fragment = document.createDocumentFragment();

  photoArray.forEach((photo) => {
    let newPicture = picture.cloneNode(true);
    newPicture.querySelector('.picture__img').src = photo.url;
    newPicture.querySelector('.picture__likes').textContent = photo.likes;
    newPicture.querySelector('.picture__comments').textContent = photo.comments.length;
    newPicture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });
    fragment.appendChild(newPicture);
  });

  pictures.appendChild(fragment);
}

export {
  renderPhoto
};
