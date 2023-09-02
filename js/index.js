
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

let shownSkill=false

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
        let options={offset :10}
        if("about-education".includes(targetId)){
            options.offset=100
        }
        // Use Locomotive Scroll to scroll to the target section
        scroll.scrollTo(`[data-scroll-section="${targetId}"]`,options);
    });
});


