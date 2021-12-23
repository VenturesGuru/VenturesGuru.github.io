const toggleCollapse = (evt) => {
    const event = evt;
    if( event.style.width === "100%" ){
        event.style.width = 0;
    }
    else{
        event.style.width = 100+"%";
    }
}

const topNav = document.querySelector("#top-nav-menu");
// const blogNav = document.querySelector("#blog-nav");

document.querySelector(".mobile-menu-container").addEventListener("click", () => {
    toggleCollapse(topNav);
    // toggleCollapse(blogNav);
});