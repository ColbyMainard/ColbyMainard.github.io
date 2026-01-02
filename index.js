// AnimeJS animations
const debug = true;
let [ $workHistoryContainer ] = utils.$('#workHistoryDiv');
let workHistoryAnimation = animate(
    "#workHistoryDiv",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(workHistoryContainer, debug),
    }
);

let [ $educationContainer ] = utils.$('#educationDiv');
let educationAnimation = animate(
    "#educationDiv",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(educationContainer, debug),
    }
);

let [ $projectsContainer ] = utils.$('#projectsDiv');
let projectsAnimation = animate(
    "#projectsDiv",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll($projectsContainer, debug),
    }
);

let [ $technicalSkillsContainer ] = utils.$('#technicalSkillsDiv');
let technicalSkillsAnimation = animate(
    "#technicalSkillsDiv",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(technicalSkillsContainer, debug),
    }
);

let [ $certificationsContainer ] = utils.$('#certificationsDiv');
let certificationsAnimation = animate(
    "#certificationsDiv",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(certificationsContainer, debug),
    }
);

let [ $contactMeContainer ] = utils.$('#contactMeDiv');
let contactMeAnimation = animate(
    "#contactMeDiv",
    {
        duration: 600,
        loop: true,
        alternate: true,
        autoplay:onScroll(contactMeContainer, debug),
    }
);
