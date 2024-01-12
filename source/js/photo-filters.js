const imagePreview = document.querySelector('.img-upload__preview > img');
const form = document.querySelector('.img-upload__form');
const slider = form.querySelector('.effect-level__slider');
const effectLevelValue = form.querySelector('.effect-level__value');
const effectLevel = form.querySelector('.img-upload__effect-level');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const effects = {
  'phobos': () => {
    effectLevel.classList.remove('visually-hidden');
    return `blur(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01}px)`;
  },
  'heat': () => {
    effectLevel.classList.remove('visually-hidden');
    return `brightness(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01})`;
  },
  'marvin': () => {
    effectLevel.classList.remove('visually-hidden');
    return `invert(${(Math.floor(effectLevelValue.value))}%)`;
  },
  'sepia': () => {
    effectLevel.classList.remove('visually-hidden');
    return `sepia(${(parseInt(effectLevelValue.value, 10) * 0.01)})`;
  },
  'chrome': () => {
    effectLevel.classList.remove('visually-hidden');
    return `grayscale(${(parseInt(effectLevelValue.value, 10) * 0.01)})`;
  },
  'none': () => {
    effectLevel.classList.add('visually-hidden');
    return 'none';
  },
}

const editingPhoto = () => {
  effectLevel.classList.add('visually-hidden');
  imagePreview.style.filter = 'none';
  form.addEventListener('change', (evt) => {
    imagePreview.classList.remove(...imagePreview.classList);
    slider.noUiSlider.set(100);
    if (evt.target.matches('.effects__radio')) {

      imagePreview.classList.add('effects__preview--' + evt.target.value);
      effectLevelValue.value = '100';
      imagePreview.style.filter = effects[evt.target.value]();

      slider.noUiSlider.on('change', () => {
        effectLevelValue.value = slider.noUiSlider.get();
        imagePreview.style.filter = effects[evt.target.value]();
      });

    }
  });
};

export { editingPhoto };

//evt.target.matches('input[type="radio"]'
