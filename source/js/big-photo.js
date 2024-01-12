import {isEscEvent} from './util.js';
const COMMENTS_LOAD_AMOUNT = 5;
const photoPopup = document.querySelector('.big-picture');
const commentsList = photoPopup.querySelector('.social__comments');
const commentCountBlock = photoPopup.querySelector('.social__comment-count');
const commentsLoader = photoPopup.querySelector('.comments-loader');
const body = document.querySelector('body');
const PhotoPopupButtonClose = photoPopup.querySelector('.big-picture__cancel');
let totalComments = [];
let loadedComents = COMMENTS_LOAD_AMOUNT;

const PhotoPopupCloseHandler = () => {
  photoPopup.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown',EscKeydownHandler);
};

const EscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    PhotoPopupCloseHandler();
    PhotoPopupButtonClose.removeEventListener('click', PhotoPopupCloseHandler);
  }
};

const renderComments = (commentsArr) => {

  const onLoadCommentsClick = ()=>{
    loadedComents += COMMENTS_LOAD_AMOUNT;
    renderComments(commentsArr);
  };

  loadedComents = (commentsArr.length < COMMENTS_LOAD_AMOUNT)? commentsArr.length : loadedComents  ;
  console.log(loadedComents);
  totalComments = commentsArr.slice(0,loadedComents);

  commentCountBlock.textContent = ` ${totalComments.length} из ${commentsArr.length} комментариев`;
  if(commentsArr.length > COMMENTS_LOAD_AMOUNT && totalComments.length < commentsArr.length){
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click',onLoadCommentsClick, {once:true});
  }else{
    commentsLoader.classList.add('hidden');
    loadedComents = COMMENTS_LOAD_AMOUNT;
  }

  const newCommentsList = document.createDocumentFragment();
  totalComments.forEach((comment) => {
    const newComment = commentsList.querySelector('.social__comment').cloneNode(true);
    newComment.querySelector('img').src = comment.avatar;
    newComment.querySelector('img').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    newCommentsList.appendChild(newComment);
  })
  commentsList.textContent = '';
  commentsList.appendChild(newCommentsList);

};

const openBigPicture = (picture) => {
  photoPopup.classList.remove('hidden');
  photoPopup.querySelector('img:first-of-type').src = picture.url;
  photoPopup.querySelector('.likes-count').textContent = picture.likes;

  photoPopup.querySelector('.social__caption').textContent = picture.description;
  //create comments
  renderComments(picture.comments);
  //commentCountBlock.classList.add('hidden');

  body.classList.add('modal-open');
  PhotoPopupButtonClose.addEventListener('click', PhotoPopupCloseHandler);
  document.addEventListener('keydown', EscKeydownHandler);
}

export { openBigPicture };
