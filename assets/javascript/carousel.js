class CarouselComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create a wrapper div
        const wrapper = document.createElement('div');
        wrapper.classList.add('carousel');

        // Get the elements from the slot and append to the wrapper
        const elements = Array.from(this.children);
        elements.forEach((element, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slide.style.zIndex = elements.length - index; // Set z-index based on the position
            if (index === 0) slide.classList.add('active');
            slide.appendChild(element.cloneNode(true));
            wrapper.appendChild(slide);
        });

        // Create indicator container
        const indicators = document.createElement('div');
        indicators.classList.add('indicators');
        elements.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicators.appendChild(indicator);
        });
        

        // Append elements to the shadow DOM
        this.shadowRoot.append(wrapper, indicators);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
    .carousel {
        position: relative;
        width: 100%;
        display: flex;
        overflow: hidden;
    }
    .slide {
        max-width: 75%;
        transition: transform 0.5s ease;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0 32px;
    }
    .slide.active {
        opacity: 1;
        position: relative;
        transform: translateX(0);
        z-index: 10;
    }
    .slide:not(.active) {
        transform: translateX(100%);
    }
    .indicators {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
    }
    .indicator {
        width: 10px;
        height: 10px;
        background-color: #ffd700;
        opacity: 0.5;
        border-radius: 50%;
        margin: 0 5px;
        cursor: pointer;
        transition: 0.3s ease;
    }
    .indicator.active {
        opacity: 1;
        width: 13px;
        height: 13px;
        background-color: #ffd700; /* Gold color to match the small circles in your reference */
    }
 `;
        this.shadowRoot.append(style);

        this.currentIndex = 0;
        this.slides = this.shadowRoot.querySelectorAll('.slide');
        this.indicators = this.shadowRoot.querySelectorAll('.indicator');
        // Swipe variables
        this.startX = 0;
        this.endX = 0;
        this.isDragging = false;

        // Touch event listeners for swipe
        wrapper.addEventListener('touchstart', (e) => this.touchStart(e));
        wrapper.addEventListener('touchmove', (e) => this.touchMove(e));
        wrapper.addEventListener('touchend', () => this.touchEnd());


        // Mouse event listeners for drag
        wrapper.addEventListener('mousedown', (e) => this.mouseDown(e));
        wrapper.addEventListener('mousemove', (e) => this.mouseMove(e));
        wrapper.addEventListener('mouseup', () => this.mouseUp());
        wrapper.addEventListener('mouseleave', () => this.mouseLeave());

        this.indicators.forEach((indicator, index) => {
            const direction = index > this.currentIndex ? 'right-to-left' : 'left-to-right';
            indicator.addEventListener('click', () => this.showSlide(index, direction));
        });
    }

    touchStart(e) {
        this.startX = e.touches[0].clientX;
    }

    touchMove(e) {
        this.endX = e.touches[0].clientX;
    }

    touchEnd() {
        this.handleSwipeOrDrag();
    }

    mouseDown(e) {
        this.startX = e.clientX;
        this.isDragging = true;
    }

    mouseMove(e) {
        if (this.isDragging) {
            this.currentX = e.clientX;
        }
    }

    mouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            this.handleSwipeOrDrag();
        }
    }

    mouseLeave() {
        if (this.isDragging) {
            this.isDragging = false;
            this.handleSwipeOrDrag();
        }
    }

    handleSwipeOrDrag() {
        if (this.startX > this.currentX) {
            this.showNextSlide('right-to-left');
        } else if (this.startX < this.currentX) {
            this.showPrevSlide('left-to-right');
        }
    }

    showPrevSlide(direction = 'left-to-right') {
        this.showSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length, direction);
    }

    showNextSlide(direction = 'right-to-left') {
        this.showSlide((this.currentIndex + 1) % this.slides.length, direction);
    }

    showSlide(index, direction) {
        const previousSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];

        // Remove active class from the current slide
        previousSlide.classList.remove('active');

         // Adjust the z-index of the slides to make the next slide the topmost
         previousSlide.style.zIndex = 9;
         nextSlide.style.zIndex = 10;

        // Prepare the next slide for entry
        if (direction === 'right-to-left') {
            nextSlide.style.transform = 'translateX(100%)';
        } else if (direction === 'left-to-right') {
            nextSlide.style.transform = 'translateX(-100%)';
        }

        // Force a reflow to apply the transformation immediately
        void nextSlide.offsetWidth;

        // Add active class to the next slide
        nextSlide.classList.add('active');

        // Apply the final transformation for the sliding effect
        if (direction === 'right-to-left') {
            previousSlide.style.transform = 'translateX(-100%)';
            nextSlide.style.transform = 'translateX(0)';
        } else if (direction === 'left-to-right') {
            previousSlide.style.transform = 'translateX(100%)';
            nextSlide.style.transform = 'translateX(0)';
        }

        // Update the indicators
        this.indicators[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.indicators[this.currentIndex].classList.add('active');
    }
}

customElements.define('carousel-component', CarouselComponent);