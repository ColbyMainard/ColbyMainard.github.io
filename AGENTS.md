# Development rules for the project

## JavaScript

- It is possible that Cross-Origin Request Security (CORS) policy related errors when loading JavaScript resources into *.html files. Double check that code patterns do not have that issue.
- Libraries can be installed using `npm` after confirming with the user.
- If installing libraries, there should be minimal dependencies to make maintenance easier.
- Libraries should be either generic JavaScript or NodeJS.

## CSS

- Stylings should be relatively consistent between all HTML files.
- CSS can be updated by updating relevant Sassy CSS (*.scss) and then updating using sass to update the css files.
- Color schemes should have sufficient contrast.
- Elements should be able to scale for both mobile and laptop/desktop screens.

## HTML

- Indentations should be preserved for easier maintenance when editing in an IDE.
- Sites should be easy to both read and navigate.
- Elements should be organized in a way that works well with screen readers for the visually disabled.
