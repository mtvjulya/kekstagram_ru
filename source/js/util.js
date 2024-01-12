const getRandom = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min >= max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
}

//Проверка длины строки
const stringCount = (text, textLength) => text.length <= textLength;
// {
//  return (text.length <= textLength) ? true : false;
// }

const isEscEvent = (evt)=>{
  return evt.key === 'Escape' || evt.key === 'Esc';
};



export {getRandom, stringCount, isEscEvent};

