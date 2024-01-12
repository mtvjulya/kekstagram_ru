import {getRandom} from './util.js';

const ARRAY_ELEMENTS = 25;
const AVATAR_NUM = {
  MIN: 1,
  MAX: 6,
};
const LIKES = {
  MIN: 15,
  MAX: 200,
};
const COMMENTS = {
  MIN: 3,
  MAX: 6,
};
const COMMENT_ID = {
  MIN: 1,
  MAX: 1000,
};
const DESCRIPTIONS = [
  'Sea view',
  'Mount view',
  'Forest',
  'Black sea',
  'My home',
  'My family',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Alan',
  'Brien',
  'Sasha',
  'Alex',
  'Yulia',
  'Maksim',
  'Lena',
  'Svetlana',
];

const getCommentsArray = () => {
  let commentsArray = [];
  for (let i = 0; i <= getRandom(COMMENTS.MIN, COMMENTS.MAX); i++) {
    commentsArray[i] = {
      id: getRandom(COMMENT_ID.MIN, COMMENT_ID.MAX),
      avatar: 'img/avatar-' + getRandom(AVATAR_NUM.MIN, AVATAR_NUM.MAX) + '.svg',
      message: MESSAGES[getRandom(0, MESSAGES.length - 1)],
      name: NAMES[getRandom(0, NAMES.length - 1)],
    }
  }
  return commentsArray;
};

const getPhotoDescriptionArray = () => {
  let photoArray = [];

  for (let i = 0; i < ARRAY_ELEMENTS; i++) {
    photoArray[i] = {
      id: (i + 1),
      url: 'photos/' + (i + 1) + '.jpg',
      description: DESCRIPTIONS[getRandom(0, DESCRIPTIONS.length - 1)],
      likes: getRandom(LIKES.MIN, LIKES.MAX),
      comments: getCommentsArray(),
    }
  }
  return photoArray;
};

export {getPhotoDescriptionArray};
