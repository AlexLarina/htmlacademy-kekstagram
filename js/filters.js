import {chooseRandomArrayItems} from './random';

const showFilters = (filtersContainer) => (
    filtersContainer.classList.remove(`img-filters--inactive`)
);

const deactivateFilter = () => {
    const activeFilter = document.querySelector(`.img-filters__button--active`);
    activeFilter.classList.remove(`img-filters__button--active`);
};

const activateFilter = (filter) => {
    deactivateFilter();
    filter.classList.add(`img-filters__button--active`);
}

const popularPicturesFiltrate = (data) => data.slice();

const newPicturesFiltrate = (data, size) => { 
    return chooseRandomArrayItems(data.slice(), size);
};

const discussedPicturesFiltrate = (data) => {
    return data.slice().sort((a, b) => {
        return b.comments.length - a.comments.length;
    });
};

export {showFilters, popularPicturesFiltrate, newPicturesFiltrate, discussedPicturesFiltrate, activateFilter};