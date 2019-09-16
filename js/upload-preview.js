import {
    uploadFormOpenHandler
} from './upload-form';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ERROR_TIMEOUT = 3000;
let isLoaded = false;

const uploadMsgTemplate = document.querySelector(`#messages`).content.querySelector(`.img-upload__message`);

const picturePreviewElement = document.querySelector(`.img-upload__preview img`);

const renderMessage = (message) => {
    const messageElement = uploadMsgTemplate.cloneNode(true);
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
};

const removeMessage = () => {
    const messageElement = document.querySelector(`.img-upload__message`);
    document.body.removeChild(messageElement);
}

const checkFileEnding = (fileName) => {
    return FILE_TYPES.some((endingMatch) => {
        return fileName.endsWith(endingMatch);
    });
}

const uploadPreviewFromReader = (preview, file) => {
    const reader = new FileReader();
    renderMessage(`Загружаем...`);
    reader.addEventListener(`load`, () => {
        isLoaded = true;
        console.log(isLoaded);

        if (isLoaded) {
            removeMessage();
            preview.src = reader.result;
            uploadFormOpenHandler();
        }
    });

    reader.readAsDataURL(file);
};

const uploadPreview = (fileInput) => {
    const pictureFile = fileInput.files[0];
    const pictureFileName = pictureFile.name.toLowerCase();
    const endingMatches = checkFileEnding(pictureFileName);

    if (endingMatches) {
        uploadPreviewFromReader(picturePreviewElement, pictureFile);
    } else {
        renderMessage(`Неверный формат файла. Попробуйте снова.`);
        setTimeout(() => {
            removeMessage();
        }, ERROR_TIMEOUT);
    }
};

export default uploadPreview;