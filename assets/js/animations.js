import {
    animate, 
    onScroll,
    utils,
    eases, 
    createSpring,
    waapi
} from './node_modules/animejs'

const [ container ] = utils.$('.scroll-container');
const debug = true;

const $work_history = document.querySelectorAll(".workHistory");
const $education = document.querySelectorAll(".education");
const $projects = document.querySelectorAll(".project");
const $technical_skills = document.querySelectorAll(".technicalSkills");
const $other_skills = document.querySelectorAll(".otherSkills");
const $certifications = document.querySelectorAll(".certifications");
const $hobbies = document.querySelectorAll(".hobbies");
const $contact_me = document.querySelectorAll(".contactMe");

// Timers: https://animejs.com/documentation/timer
// Animation: https://animejs.com/documentation/animation
// Timeline: https://animejs.com/documentation/timeline
// Animatable: https://animejs.com/documentation/animatable
// Draggable: https://animejs.com/documentation/draggable
// ScrollObserver: https://animejs.com/documentation/scroll
// Scope: https://animejs.com/documentation/scope
// Stagger: https://animejs.com/documentation/stagger
// Utilities: https://animejs.com/documentation/utilities
// Engine: https://animejs.com/documentation/engine
const $work_history_anim = animate(
    $work_history, 
    {
        rotate: {
            to: 360,
            ease: 'out(6)',
        },
        ease: createSpring(
            {
                stiffness: 70
            }
        ),
        alternate: true,
        loop: true,
        autoplay: onScroll(
            {
                container: '.scroll-container',
                enter: 'bottom-=50 top',
                leave: 'top+=60 bottom',
                sync: true,
                debug: true,
            }
        )
    }
);
const $education_anim = animate(
    $education, 
    {
        alternate: true,
        loop: true,
        autoplay: onScroll(
            {
                container: '.scroll-container',
                enter: 'bottom-=50 top',
                leave: 'top+=60 bottom',
                sync: true,
                debug: true,
            }
        )
    }
);
const $projects_anim = animate(
    $projects, 
    {
        alternate: true,
        loop: true,
        autoplay: onScroll(
            {
                container: '.scroll-container',
                enter: 'bottom-=50 top',
                leave: 'top+=60 bottom',
                sync: true,
                debug: true,
            }
        )
    }
);
const $technical_skills_anim = animate(
    $technical_skills, 
    {
        alternate: true,
        loop: true,
        autoplay: onScroll(
            {
                container: '.scroll-container',
                enter: 'bottom-=50 top',
                leave: 'top+=60 bottom',
                sync: true,
                debug: true,
            }
        )
    }
);
const $other_skills_anim = animate(
    $other_skills, 
    {
        alternate: true,
        loop: true,
        autoplay: onScroll(
            {
                container: '.scroll-container',
                enter: 'bottom-=50 top',
                leave: 'top+=60 bottom',
                sync: true,
                debug: true,
            }
        )
    }
);
const $certifications_anim = animate(
    $certifications, 
    {
        alternate: true,
        loop: true,
        autoplay: onScroll(
            {
                container: '.scroll-container',
                enter: 'bottom-=50 top',
                leave: 'top+=60 bottom',
                sync: true,
                debug: true,
            }
        )
    }
);
const $hobbies_anim = animate(
    $hobbies, 
    {
        alternate: true,
        loop: true,
        autoplay: onScroll(
            {
                container: '.scroll-container',
                enter: 'bottom-=50 top',
                leave: 'top+=60 bottom',
                sync: true,
                debug: true,
            }
        )
    }
);
const $contact_me_anim = animate(
    $contact_me, 
    {
        alternate: true,
        loop: true,
        autoplay: onScroll(
            {
                container: '.scroll-container',
                enter: 'bottom-=50 top',
                leave: 'top+=60 bottom',
                sync: true,
                debug: true,
            }
        )
    }
);