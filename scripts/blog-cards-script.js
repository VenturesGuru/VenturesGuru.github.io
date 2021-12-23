const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {

    (async() => {
        try{
            const fetchCards = await fetch("json/blog.json");
            const jsonCards = await fetchCards.json();
            const HTMLsection = $("#cards");
            const load = new Load(HTMLsection, jsonCards);
            
            $(".left-arrow").addEventListener("click", load.previous.bind(load));
            
            $(".right-arrow").addEventListener("click", load.next.bind(load));

            $("#all").style.setProperty('--line-color', '#0c58b8');
            $("#all").style.setProperty('--line-color-hover', '#0c58b8');

            $("#all").addEventListener('click', load.all.bind(load));
            $("#card-personal-finance").addEventListener("click", load.personalFinance.bind(load));
            $("#card-business-ventures").addEventListener('click', load.businessVentures.bind(load));
            $("#card-investments").addEventListener('click', load.investments.bind(load));

        }
        catch(e){
            console.log(e);
        }
    })();
    
});