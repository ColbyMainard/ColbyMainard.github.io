# Project: Colby Mainard's Personal Website

## Description of the project

This site is designed as a semi-professional landing page to perform a variety of tasks. It is anticipated that the following groups would be the primary audience:

- Potential future coworkers/colleagues.
- Potential future employers.
- Fellow technology enthusiasts.

With this understanding, it is likely that future colleagues and employers would care mostly about things like competencies, skills, and held beliefs. Fellow technology enthusiasts would likely care about things like hobbies and technical resources.


## Code Style

### HTML

- When possible, JavaScript and CSS/SCSS implementations should be contained in separate files that can be imported in the head section.
- Each document should contain a header allowing to navigate to both other sections and other pages on this site.

### Sassy CSS

- Specific pages have their own Sassy CSS file `assets/css/*.scss`
- All files are then converted to an overall CSS file called `default.css` via the `sass` command.

### JavaScript

- All JavaScript should be capable of functioning in a client-side only environment.
- External libraries should be used sparingly to minimize overall load time.
- Animations can be written in AnimeJS(<https://animejs.com/documentation/getting-started>).

## Commands

- `sass --trace ./assets/css/default.scss ./assets/css/default.css`: Convert default scss file to CSS
- `npm install <package-name>`: Installing a library that might be useful.

## Architecture

- `/assets/css`: CSS and Sassy CSS files allowing for layout specification to webpages.
- `/assets/html`: Contains all non-index HTML files.
- `/assets/images`: Images that will be displayed in some of the
- `/assets/js`: Custom JavaScript files.
- `/assets/other`: Files that are useful for the website but do not fit into any other category
- `/index.html`": The landing page for the website.
- `/manifest.json`: A manifest in JSON format to describe the site bots and search engine crawlers.
- `/robots.txt`: Specifying a web scraping policy to bots.
- `/sitemap.xml`: A mapping of pages and last update time.

## Important Notes

- Changes to CSS files (.css) should be made to corresponding Sassy CSS and then compiled. NOTE: This is the command for Ubuntu environments. Should it fail, you may be in a Windows/non-Debian environment. Attempt retry before reporting failure.
- Be mindful of best practices regarding Cross-Origin Request Security policies when creating and organizing new files.
- The website will be deployed to GitHub Pages. All CSS and JavaScript setup should be respectful of the static serving provided by GitHub.

## Other Information

- See @README.md for project overview
- See @AGENTS.md for general agent information
