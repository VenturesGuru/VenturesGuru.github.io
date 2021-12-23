class BlogCard {
    #htmlContent;
    constructor(imagePath, date, title){
        this.#htmlContent = document.createElement("div");
        this.#htmlContent.classList.add("task-card");
        this.#htmlContent.innerHTML = `
        <div class="card-content">
            <img src="${imagePath}" alt="image path">
            <p class="card-date">${date}</p>
            <h4>${title}<h4>
        </div>
        `;
    }

    get htmlContent(){return this.#htmlContent}
    set htmlContent(content){this.#htmlContent = content}
}