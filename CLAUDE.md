# Project: Colby Mainard's Personal Website

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
- Animations can be written in AnimeJS(https://animejs.com/documentation/getting-started). 

## Commands

- `sass --trace ./assets/css/default.scss ./assets/css/default.css`: Convert default css file
- `npm install <package-name>`: Installing a library that might be useful.

## Architecture

- `/assets/css`: CSS and Sassy CSS files allowing 
- `/assets/html`: HTML files should be 
- `/assets/images`: Images that will be displayed in some of the
- `/assets/js`: Custom JavaScript files.
- `/assets/other`: Files that are useful for the website but 
- `/index.html`": The landing page for the website.
- `/manifest.json`: A manifest in JSON format to describe the site bots and search engine crawlers.
- `/robots.txt`: Specifying a web scraping policy to bots.
- `/sitemap.xml`: A mapping of pages and last update time.

## Important Notes

- Changes to CSS files (.css) should be made to corresponding Sassy CSS and then compiled by `sass --trace`
- Be mindful of best practices regarding Cross-Origin Request Security policies when creating and organizing new files.
- The website will be deployed to GitHub Pages. All CSS and JavaScript setup should be respectful of the static serving provided by GitHub.

## Other Information
- See @README.md for project overview
- See @AGENTS.md for general agent information