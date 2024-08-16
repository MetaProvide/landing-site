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
        width: 100%;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 30%;
        grid-column-gap: 1rem;
        scroll-snap-type: inline mandatory;
        overflow-x: scroll;
        flex-shrink: 0;
        max-width: calc(var(--content-max-width) * 2); 
        margin: 0 auto;
    }
    .carousel::-webkit-scrollbar {
        display: none;
    }
    .slide {
        width: 100%;
        transition: transform 0.5s ease;
        margin: 0 32px;
    }
    .slide.active {
        opacity: 1;
        position: relative;
    }
    .slide:not(.active) {
        transform: scale(1);
    }
    .indicators {
        display: none;
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

    media (max-width: 768px) {
        .carousel {
            grid-auto-columns: 100%;
        }

        .indicators {
            display: flex;
        }
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
            // const direction = index > this.currentIndex ? 'right-to-left' : 'left-to-right';
            indicator.addEventListener('click', () => this.showSlide(index));
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
            this.showNextSlide();
        } else if (this.startX < this.currentX) {
            this.showPrevSlide();
        }
    }

    showPrevSlide() {
        this.showSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length);
    }

    showNextSlide() {
        this.showSlide((this.currentIndex + 1) % this.slides.length);
    }

    showSlide(index) {
        const previousSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];

        // Remove active class from the current slide
        previousSlide.classList.remove('active');

        // Force a reflow to apply the transformation immediately
        void nextSlide.offsetWidth;

        // Add active class to the next slide
        nextSlide.classList.add('active');

        // Update the indicators
        this.indicators[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.indicators[this.currentIndex].classList.add('active');
    }
}

customElements.define('carousel-component', CarouselComponent);