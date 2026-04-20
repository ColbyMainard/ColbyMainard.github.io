# Known Errors

## index.html

### Error 1:

**Description:** Access to manifest at 'file:///C:/Users/cmyth/Documents/Repos/ColbyMainard.github.io/manifest.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
**Solution:** Make updates relevant to the CORS policy to allow the manifest to be retrieved by the service worker

### Error 2:

**Description:** index.html:34  GET file:///C:/Users/cmyth/Documents/Repos/ColbyMainard.github.io/manifest.json net::ERR_FAILED
**Solution:** This is likely related to error 1 in this file. It is likely that fixing one will impact the solution for the other.

## hobbies.html

### Error 1

**Description:** animation.js:566 No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animateQuantum	@	hobbies_animations.js:61
(anonymous)	@	hobbies_animations.js:184
onIntersect	@	hobbies_animations.js:173
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

### Error 2

**Description:** animation.js:566 No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animatePhotography	@	hobbies_animations.js:86
(anonymous)	@	hobbies_animations.js:184
onIntersect	@	hobbies_animations.js:173
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

### Error 3

**Description:** animation.js:566 No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animateDnD	@	hobbies_animations.js:110
(anonymous)	@	hobbies_animations.js:184
onIntersect	@	hobbies_animations.js:173
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

## tech_resources.html

### Error 1

**Description:** No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animateCybersecurity	@	tech_resources_animations.js:64
(anonymous)	@	tech_resources_animations.js:263
onIntersect	@	tech_resources_animations.js:252
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

### Error 2

**Description:** animation.js:566 No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animateAI	@	tech_resources_animations.js:92
(anonymous)	@	tech_resources_animations.js:263
onIntersect	@	tech_resources_animations.js:252
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

### Error 3

**Description:** animation.js:566 No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animateCpp	@	tech_resources_animations.js:123
(anonymous)	@	tech_resources_animations.js:263
onIntersect	@	tech_resources_animations.js:252
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

### Error 4

**Description:** animation.js:566 No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animatePython	@	tech_resources_animations.js:151
(anonymous)	@	tech_resources_animations.js:263
onIntersect	@	tech_resources_animations.js:252
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

### Error 5

**Description:** animation.js:566 No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animateScripting	@	tech_resources_animations.js:179
(anonymous)	@	tech_resources_animations.js:263
onIntersect	@	tech_resources_animations.js:252
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

### Error 6

**Description:** animation.js:566 No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animateScripting	@	tech_resources_animations.js:183
(anonymous)	@	tech_resources_animations.js:263
onIntersect	@	tech_resources_animations.js:252
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

### Error 7

**Description:** No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animateOS	@	tech_resources_animations.js:207
(anonymous)	@	tech_resources_animations.js:263
onIntersect	@	tech_resources_animations.js:252
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

### Error 8

**Description:** animation.js:566 No target found. Make sure the element you're trying to animate is accessible before creating your animation.
constructor	@	animation.js:566
Ze	@	timeline.js:80
add	@	timeline.js:178
animateOS	@	tech_resources_animations.js:212
(anonymous)	@	tech_resources_animations.js:263
onIntersect	@	tech_resources_animations.js:252
**Solution:** Look for the relevant animations and check the name against existing contents of the animation file referenced in the error message.

## service-worker.js / service_worker_register.js / manifest.json
These files may be related to the issues regarding the manifest errors in index.html.