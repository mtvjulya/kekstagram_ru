import {renderPhoto} from './picture-preview.js';
/* global _:readonly */
const RANDOM_PHOTO_AMOUNT = 10;
const RERENDER_DELAY = 500;
const filters = document.querySelector('.img-filters');
const defaultFilter = filters.querySelector('#filter-default');
const randomFilter = filters.querySelector('#filter-random');
const discussedFilter = filters.querySelector('#filter-discussed');
const picturesList = document.querySelector('.pictures');

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const getCommentsNumber = (a, b)=>{
  return b.comments.length - a.comments.length;
};

const debounce = (func, timeout = RERENDER_DELAY) => {
  let timer;
  return ()=> {
    clearTimeout(timer);
    timer = setTimeout(()=>{
      func();
    },timeout)
  };
};

const setFilters = (arr)=>{

  defaultFilter.addEventListener('click',()=>{
    defaultFilter.classList.add('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    const pictures = picturesList.querySelectorAll('.picture');
    pictures.forEach((picture)=>{
      picture.remove();
    });
    //_.debounce(()=>renderPhoto(arr), 500)();
    debounce(()=>renderPhoto(arr))();
  });

  randomFilter.addEventListener('click',()=>{
    defaultFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.add('img-filters__button--active');
    discussedFilter.classList.remove('img-filters__button--active');
    const pictures = picturesList.querySelectorAll('.picture');
    pictures.forEach((picture)=>{
      picture.remove();
    });
    const arrClone = arr.slice();
    let randomPhotoArr = shuffle(arrClone).slice(0,RANDOM_PHOTO_AMOUNT);
    debounce(()=>renderPhoto(randomPhotoArr))();

  });

  discussedFilter.addEventListener('click',()=>{
    defaultFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    discussedFilter.classList.add('img-filters__button--active');
    const pictures = picturesList.querySelectorAll('.picture');
    pictures.forEach((picture)=>{
      picture.remove();
    })
    let disscussedPhotoArr = arr.slice().sort(getCommentsNumber);
    debounce(()=>renderPhoto(disscussedPhotoArr))();

  });
}
export {setFilters};
