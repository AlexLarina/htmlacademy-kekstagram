
const DEBOUNCE_INTERVAL = 300; // ms

// @TO-DO, разобраться в конфликте таймеров

const decounce = (cb) => {
    console.log(`замедление запущено`);
    let lastTimeout = null;

    return function() {
        let args = arguments;
        if (lastTimeout) {
            clearTimeout(lastTimeout);
        }
        lastTimeout = setTimeout((cb) => {
            cb.apply(null, args);
        }, DEBOUNCE_INTERVAL);
    };
};

export default decounce;