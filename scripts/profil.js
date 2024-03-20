const options = {};
const slider = new VJSlider(document.querySelector('.vjslider'), options);

// You can manually change slides by using next() and prev() functions:
slider.next();
slider.prev();

// You can destroy slider with
slider.destroy();

// You can reload slider (with alternative options if needed passed as argument to reload method)
slider.reload({numberOfVisibleSlides: 3});