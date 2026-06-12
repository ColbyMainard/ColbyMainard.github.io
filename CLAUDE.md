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

- `sass --sourcemap=none --trace ./assets/css/default.scss ./assets/css/default.css`: Convert default scss file to CSS for production. Omit `--no-source-map` for local dev if you want source maps; the `assets/css/*.css.map` glob is gitignored so dev maps won't be committed.

## Important Notes

- Changes to CSS files (.css) should be made to corresponding Sassy CSS and then compiled. NOTE: This is the command for Ubuntu environments. Should it fail, you may be in a Windows/non-Debian environment. Attempt retry before reporting failure.
- Be mindful of best practices regarding Cross-Origin Request Security policies when creating and organizing new files.
- The website will be deployed to GitHub Pages. All CSS and JavaScript setup should be respectful of the static serving provided by GitHub.

## Other Information

- See @README.md for project overview
- See @AGENTS.md for general agent information
