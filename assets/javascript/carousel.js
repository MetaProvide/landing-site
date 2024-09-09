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
                grid-column-gap: 48px;
                scroll-snap-type: inline mandatory;
                overflow-x: scroll;
                overflow-y: hidden;
                flex-shrink: 0;
                max-width: calc(var(--content-max-width) * 2.125); 
                margin: 0 auto;
                scrollbar-width: none;
            }
            .carousel::-webkit-scrollbar {
                display: none;
            }
            .slide {
                display: flex; /* Apply flexbox */
                flex-direction: column; /* Stack children vertically */
                justify-content: stretch; /* Stretch to fill the available height */
                width: 100%;
                scroll-snap-align: center;
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

            @media (max-width: 768px) {
                .carousel {
                    grid-auto-columns: 70%;
                    max-width: calc(var(--content-max-width) * 5); 
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
        this.wrapper = wrapper;

        // Swipe variables
        this.startX = 0;
        this.currentX = 0;
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

        // Scroll event listener to update active indicator
        wrapper.addEventListener('scroll', () => this.updateActiveIndicator());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.scrollToSlide(index));
        });
    }

    touchStart(e) {
        this.startX = e.touches[0].clientX;
        this.isDragging = true;
    }

    touchMove(e) {
        this.currentX = e.touches[0].clientX;
    }

    touchEnd() {
        this.isDragging = false;
        this.handleSwipeOrDrag();
    }

    mouseDown(e) {
        this.startX = e.clientX;
        this.isDragging = true;
        this.currentX = e.clientX; // Reset currentX at the start of drag 
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
        const distanceMoved = this.startX - this.currentX;
        const slideWidth = this.slides[0].offsetWidth + parseFloat(getComputedStyle(this.slides[0]).marginRight);
        const threshold = slideWidth / 8; // Threshold to determine if the slide should change

        if (distanceMoved > threshold) {
            this.showNextSlide();
        } else if (distanceMoved < -threshold) {
            this.showPrevSlide();
        } else {
            this.scrollToSlide(this.currentIndex); // Return to the current slide if not moved enough
        }
    }

    scrollToSlide(index) {
        const slideWidth = this.slides[index].offsetWidth + parseFloat(getComputedStyle(this.slides[index]).marginRight);
        this.wrapper.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });

        if (!this.isDragging) {
            this.showSlide(index);
        }
    }

    showPrevSlide() {
        const newIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.scrollToSlide(newIndex);
    }

    showNextSlide() {
        const newIndex = (this.currentIndex + 1) % this.slides.length;
        this.scrollToSlide(newIndex);
    }
    showSlide(index) {
        this.slides[this.currentIndex].classList.remove('active');
        this.slides[index].classList.add('active');
        this.indicators[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.indicators[this.currentIndex].classList.add('active');
    }

    updateActiveIndicator() {
        const slideWidth = this.slides[0].offsetWidth + parseFloat(getComputedStyle(this.slides[0]).marginRight);
        const scrollPosition = this.wrapper.scrollLeft;
        const index = Math.round(scrollPosition / slideWidth);
        if (index !== this.currentIndex) {
            this.showSlide(index);
        }
    }
}

customElements.define('carousel-component', CarouselComponent);
