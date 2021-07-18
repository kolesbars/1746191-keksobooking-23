const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'webp'];

const adAvatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const adImagesChooser = document.querySelector('#images');
const imagesPreviewContainer = document.querySelector('.ad-form__photo');


const showPreviewImage = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const showAdAvatar = () => {
  adAvatarChooser.addEventListener('change', () =>
    showPreviewImage(adAvatarChooser , avatarPreview));
};

const showAdImage = () => {
  adImagesChooser.addEventListener('change', () => {
    const imagesPreview = document.createElement('img');
    imagesPreview.src = '';
    imagesPreview.width = '70';
    imagesPreview.height = '70';
    imagesPreview.id = 'images-preview';
    imagesPreviewContainer.appendChild(imagesPreview);
    showPreviewImage(adImagesChooser, imagesPreview);
  });
};

showAdAvatar();
showAdImage();

export {avatarPreview};
