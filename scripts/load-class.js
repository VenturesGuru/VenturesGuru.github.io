class Load {


    /**
     * @type {number}
     * this will mark the 'start' position of the current load
     */
    #start;


    /**
     * @type {string}
     * this will mark the 'end' position of the current load
     */
    #end;


    /**
     * @type {number}
     * how much cards to load.
     * this is based of the screen width
     */
    #loadAmount;


    /**
     * the length of the current catagory
     * @type {object}
     */
    #currentCategory


    screenWidth;



    /**
     * @type {HTMLElement}
     * this will contail the actual card HTML.
     * it is a private field to protect valdalism through the innerHTML property
     */
    #htmlContent;


    /**
     * @type {string}
     * this will trigger the load method to load only cards with specified filter
     */
    #filter;
    

    #resize(){
        this.screenWidth = window.innerWidth;
    }


    

    /**
     * @param {HTMLElement} HTMLsection 
     * where the blog cards will be loaded to
     * @param {Object} blogCardContent 
     * the json date to fill the blog
     */
    constructor(HTMLsection, blogCardContent){

        this.#filter = "all";
        this.screenWidth = window.innerWidth;

        this.HTMLsection = HTMLsection;
        this.blogCardContent = blogCardContent;

        this.#currentCategory = [];
        this.#resetLoadCounters();

        window.addEventListener('resize', this.#resize);

        //load amount
        if(this.screenWidth < 768){
            this.#loadAmount = 3;
        }
        else if(this.screenWidth < 1024){
            this.#loadAmount = 4;
        }
        else{
            this.#loadAmount = 6;
        }
        
        this.#start = 0;
        this.#end = this.#loadAmount;
        this.#load(this.HTMLsection);
    }

    #load(HTMLsection = undefined){

        //empty out all the displayed cards
        HTMLsection.innerHTML = '';


        /**
         * load variable will carry the a load of cards
         * @type {object}
         */
        let load = [];
        if(this.#filter === 'all'){
            load = this.blogCardContent.slice(this.#start, this.#end);
        }
        else{
            for (const i of this.blogCardContent) {
                if(this.#filter === i.tags[0]){
                    load[load.length] = i;
                }
            }
        }


        
        
        //build the cards
        for (const i of load) {
            const {image, date, title} = i;

            this.#htmlContent = document.createElement("div");
            this.#htmlContent.classList.add("task-card");
            this.#htmlContent.innerHTML = `
            <div class="card-content">
                <img src="${image}" alt="image path">
                <p class="card-date">${date}</p>
                <h4>${title}<h4>
            </div>
            `;
            HTMLsection.appendChild(this.#htmlContent);
        }
    }



    #removeSiblingsUnderlines(el){
        if(!el){
            console.error(`parameter must be a HTML element but is typeof ${typeof el} and has a value of ${el}`);
            return undefined;
        }
        const elements = el.parentElement.children;
        for (const i of elements) {
            if(i != el){
                i.style.setProperty('--line-color', 'transparent');
                i.style.setProperty('--line-color-hover', '#0c58b880');
            }
            else{
                i.style.setProperty('--line-color-hover', '#0c58b8');
            }
        }
        el.style.setProperty('--line-color', '#0c58b8');
        el.style.setProperty('--line-color-hover', '#0c58b8');
    }


    /**
     * - checks if there's more cards than the load amount
     * @returns {boolean}
     */
    #lotsOfCards(){
        if(this.#currentCategory.length > this.#loadAmount){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * resets the start and end properties to initial value.
     * @returns {void}
     */
    async #resetLoadCounters(){
        
        //forEach is asynchronos?? really???
        this.#currentCategory = [];
        await this.blogCardContent.forEach(value => {
            if(value.tags.includes(this.#filter)){
                this.#currentCategory.push(value);
            }
        });

        this.#start = 0;
        this.#end = this.#loadAmount;
        if(this.#lotsOfCards()){
            $('.left-arrow').style.setProperty('--left-arrow', '#808080');
            $('.right-arrow').style.setProperty('--right-arrow', '#0c58b8');
        }
        else{
            $('.left-arrow').style.setProperty('--left-arrow', '#808080');
            $('.right-arrow').style.setProperty('--right-arrow', '#808080');
        }

    }


    get loadAmount(){return this.#loadAmount}
    get start(){return this.#start}
    get end(){return this.#end}


    /**
     * loads the next page of blog cards
     * @param {Event} evt 
     * 
     */
    next(evt){
        //loads the next page of blog cards
        const event = evt.target;
        if(this.#end < this.blogCardContent.length){
            this.#start += this.#loadAmount;
            this.#end += this.#loadAmount;
            //gray out the arrows
            if(this.#end >= this.blogCardContent.length){
                event.style.setProperty('--right-arrow', '#808080');
            }
            if(this.#lotsOfCards()){
                event.previousElementSibling.style.setProperty('--left-arrow', '#0c58b8');
                this.#load(this.HTMLsection);
            }
        }
    }

    previous(evt){
        //loads the previous page of blog cards
        const event = evt.target;
        if(this.#start > 0){
            this.#start -= this.#loadAmount;
            this.#end -= this.#loadAmount;
            if(this.#start <= 0) {
                event.style.setProperty('--left-arrow', '#808080');
            }
            if(this.start < 0){
                this.#start = 0;
                this.#end = this.#loadAmount;
                return undefined;
            }
            //make other arrow blue
            event.nextElementSibling.style.setProperty('--right-arrow', '#0c58b8');
            //load the previous badge
            this.#load(this.HTMLsection);
        }
    }

    //sort-by methods
    all(evt){
        const event = evt.target;
        this.#removeSiblingsUnderlines(event);
        this.#filter = "all";
        this.#resetLoadCounters();
        this.#load(this.HTMLsection);
    }

    personalFinance(evt){
        const event = evt.currentTarget;
        this.#removeSiblingsUnderlines(event);
        this.#filter = "personalFinance";
        this.#resetLoadCounters();
        this.#load(this.HTMLsection);

    }

    businessVentures(evt){
        const event = evt.target;
        this.#removeSiblingsUnderlines(event);
        this.#filter = "businessVentures";
        this.#resetLoadCounters();
        this.#load(this.HTMLsection);
    }

    investments(evt){
        const event = evt.target;
        this.#removeSiblingsUnderlines(event);
        this.#filter = "investments";
        this.#resetLoadCounters();
        this.#load(this.HTMLsection);
    }
    
}