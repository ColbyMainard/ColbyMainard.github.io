# Backlink Strategy

## Interactive Free Tools for Users

Write interactive JS tools that would be able to run in the user's browser to do the following:

## Interactive tools

To make each guide, it should stay on topic and include interactive elements, like:

- Interactive quizzes
- Embedded videos
- Slideshows
- Interactive Infographics

### Interactive quizzes

Each quiz should have 5-10 questions and

### Embedded videos

Videos should be related to the topic and should be embedded in an `iframe` underneath the most relevant paragraph.
Selected videos should be relevant and provide additional details.

### Slideshows

Create a slideshow that is related to the topic being discussed, using the below HTML/CSS/JS as a potential template.

```html
<!-- Slideshow container -->
<div class="slideshow-container">

  <!-- Full-width images with number and caption text -->
  <div class="mySlides fade">
    <div class="numbertext">1 / 3</div>
    <img src="img1.jpg" style="width:100%">
    <div class="text">Caption Text</div>
  </div>

  <div class="mySlides fade">
    <div class="numbertext">2 / 3</div>
    <img src="img2.jpg" style="width:100%">
    <div class="text">Caption Two</div>
  </div>

  <div class="mySlides fade">
    <div class="numbertext">3 / 3</div>
    <img src="img3.jpg" style="width:100%">
    <div class="text">Caption Three</div>
  </div>

  <!-- Next and previous buttons -->
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<!-- The dots/circles -->
<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
</div>
```

```css
* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
```

```js
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
```

### Interactive Infographics

The infographic should be related to the topic and make it easy to interact with the information presented.

## Guides for Topics

Publish guides on things like the following:

- Data Engineering
- Data Science
- Computer Vision
- Generative Artificial Intelligence
- Natural Language Processing
- Machine Learning
- Deep Learning
- Reinforcement Learning
- Software Engineering
- Cybersecurity

### Data Engineering Guide

Should go over things like:

- The importance of clean data
- Handling user data responsibly
- Data velocity
- Batch vs Real-time

### Data Science Guide

Should go over things like:

- What data science is
- When data science makes sense
- Pipeline architectures

### Computer Vision Guide

Should go over things like:

- Define computer vision
- Problem classes
- Choosing models
- Data normalization considerations

### Generative Artificial Intelligence Guide

Should go over things like:

- Define Generative AI
- Explain the underlying tech
- Language-only (e.g. LLM) vs Multimodal (e.g. VLM)
- Generative Adversarial Networks (GANs)

### Natural Language Processing Guide

Should go over things like:

- Explain basics
- Sentiment analysis
- Topic detection
- Classification
- Data normalization concerns

### Machine Learning Guide

Should go over things like:

- Best practices
- Mathematical underpinnings
- Pipeline design
- Practical concerns
- When not to use AI/ML

### Deep Learning Guide

Should go over things like:

- Mathematical underpinning
- Fundamental limitations of the approach
- Practical applications

### Reinforcement Learning Guide

Should go over things like:

- Definitions
- Techniques
- Applications
- Examples

### Software Engineering Guide

Should go over things like:

- Definitions
- Practical concerns
- Why GenAI can't kill software engineering

### Cybersecurity Guide

Should go over things like:

- Definitions
- Best practices
- Fields in cybersecurity
- Practical concerns
- Building a pro-cybersecurity culture
