
gsap.registerPlugin(TextPlugin);

var scroll = new LocomotiveScroll(
    {
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1.0,
        getDirection: true,
    }
);




let prevScrollY = scroll.scroll.instance.scroll.y;
// name and designation starting as opactity 0 and scale 3 to opacity 1 and scale 1
gsap.to("#name", { scale: 1, delay: 0.1, duration: 2, opacity: 1 })
gsap.to("#designation", { scale: 1, opacity: 1, delay: 1.5, duration: 1.5 })
// timeline for text changing of designation after showing on the page
gsap.timeline({ delay: 2, repeat: -1, defaults: { ease: "none", duration: 3, delay: 3 } })
    .to("#designation", {
        text: "ReactNative Developer"
    }).to("#designation", {
        text: "NodeJS Developer"
    }).to("#designation", {
        text: "ReactJS Developer"
    }).to("#designation", {
        text: "Software Engineer"
    })
// gsap.to(".ianime",{color:"black",repeat:-1,duration:3,delay:2})
//

let shownSkill = false

//scroll check args and animate them using locomotive scroll
scroll.on('scroll', (args) => {
    if (typeof args.currentElements['name'] === 'object') {
        let progress = args.currentElements['name'].progress;
        let scaleValue = 1 + (0.5 * progress); // Map progress to scaling range [1, 1.5]
        let currentScrollY = scroll.scroll.instance.scroll.y;
        let scrollDirection = currentScrollY > prevScrollY ? 'down' : 'up';
        prevScrollY = currentScrollY;
        // scrolling down, scale up; if scrolling up, scale back to 1
        if (scrollDirection === 'down') {
            gsap.to("#name", { scale: scaleValue, duration: 0.5 });
            gsap.to("#designation", { scale: scaleValue, duration: 0.5 });
        } else if (scrollDirection === 'up') {
            gsap.to("#name", { scale: 1, duration: 0.5 });
            gsap.to("#designation", { scale: 1, duration: 0.5 });
        }
    }
});




document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link behavior
        const targetId = link.getAttribute('href').substring(1); // Get the target section's ID
        let options = { offset: 10 }
        if ("about-education".includes(targetId)) {
            options.offset = 100
        }
        // Use Locomotive Scroll to scroll to the target section
        scroll.scrollTo(`[data-scroll-section="${targetId}"]`, options);
    });
});

// color schemes
const colorSchemes = [
    {
        main_background_color: "#F8F8F8",
        text_color: "#333",
        header_background_color: "#333",
        header_text_color: "white",
        link_color: "#007bff",
        link_visited_color: "#007bff",
    },
    {
        main_background_color: "#333",
        text_color: "#white",
        header_background_color: "#111",
        header_text_color: "white",
        link_color: "#2196F3",
        link_visited_color: "#2196F3",   
    },
    {
        main_background_color: "#FFFFFF",
        text_color: "#333",
        header_background_color: "#4CAF50",
        header_text_color: "white",
        link_color: "#009688",
        link_visited_color: "#009688", 
    },
    {
        main_background_color: "#FFFF00",
        text_color: "#333",
        header_background_color: "#800080",
        header_text_color: "white",
        link_color: "#FFD700",
        link_visited_color: "#FFD700", 
    },
]

const getNumber=()=>{
    let previousNumber=Number(localStorage.getItem("colorValue")??-1)
    if(previousNumber>=0){
        if(previousNumber==3){
            localStorage.setItem("colorValue",0)
            return 0
        }else{
            let newValue=previousNumber+1
            localStorage.setItem("colorValue",newValue)
            return newValue
        }
        
    }
    localStorage.setItem("colorValue",0)
    return 0
}

// on dom load change color
window.addEventListener('load', function () {
    const randomNumber = getNumber()
    document.documentElement.style.setProperty('--main-background-color', colorSchemes[randomNumber].main_background_color);
    document.documentElement.style.setProperty('--text-color', colorSchemes[randomNumber].text_color);
    document.documentElement.style.setProperty('--header-background-color', colorSchemes[randomNumber].header_background_color);
    document.documentElement.style.setProperty('--header-text-color',  colorSchemes[randomNumber].header_text_color);
    document.documentElement.style.setProperty('--link-color',  colorSchemes[randomNumber].link_color);
    document.documentElement.style.setProperty('--link-visited-color',  colorSchemes[randomNumber].link_visited_color);
});