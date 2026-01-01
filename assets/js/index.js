import {
    animate,
    onScroll,
    utils,
} from 'animejs';
import React from 'react';
import * as d3 from 'd3';

// AnimeJS animations
const debug = true;
let [ $workHistoryContainer ] = utils.$('#workHistory');
let workHistoryAnimation = animate(
    "#workHistory",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(workHistoryContainer, debug),
    }
);

let [ $educationContainer ] = utils.$('#education');
let educationAnimation = animate(
    "#education",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(educationContainer, debug),
    }
);

let [ $projectsContainer ] = utils.$('#projects');
let projectsAnimation = animate(
    "#projects",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll($projectsContainer, debug),
    }
);

let [ $technicalSkillsContainer ] = utils.$('#technicalSkills');
let technicalSkillsAnimation = animate(
    "#technicalSkills",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(technicalSkillsContainer, debug),
    }
);

let [ $certificationsContainer ] = utils.$('#certifications');
let certificationsAnimation = animate(
    "#certifications",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(certificationsContainer, debug),
    }
);

let [ $contactMeContainer ] = utils.$('#contactMe');
let contactMeAnimation = animate(
    "#contactMe",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(contactMeContainer, debug),
    }
);
