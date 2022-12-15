# Project Management App

### Deploy:

https://moonlit-semifreddo-0189f1.netlify.app

---

### Specification:

https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/project-management-system-EN.md

---

### Contributors:

[Evelin](https://github.com/evelin-mart)

[Denis](https://github.com/denisselet)

[Tanya](https://github.com/lapkot)

---

### Description:

![image](https://user-images.githubusercontent.com/96264844/205638521-e9a0a046-7bb0-4763-8776-bea436054bff.png)

#### Welcome route
   - The welcome page contain general information about the developer, project, and course.
   - In the upper right corner there are 2 buttons: Sign In and Sign Up.
   - If login token is valid and unexpired, buttons Sign In and Sign Up change on "Go to Main Page" button.
   - When the token expires - the user is redirected to the "Welcome page" automatically.
   - Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form.
 
#### Sign In / Sign Up
  - Form fields are implemented according to the backend API. Validation is implemented.
  - Upon successful login, the user is redirected to "Main route".
  - If user already logged in and he try to reach this routes - he will be redirected to Main route.

#### Main route
  - Board creation functionality
  - Displays all created boards as a list/grid
  - Each board in the list is displayed with a small preview of available information (title, description). By clicking an element the user navigates to the board item (Board route). There's also a button for board deletion.
  - When trying to delete the board, we receive a confirmation modal. The confirmation modal is a generic component (one for the entire application).
  - The user profile editing functionality is implemented.

#### Board route
  - Button for column creation is displayed
  - If a board contains at least one column - a button for task creation is displayed
  - A modal windows with forms is displayed for column and task creations
  - A vertical scrollbar is displayed in the column when overflowing with the number of column tasks
  - The page itself on the current route doesn't have a vertical scrollbar
  - With the help of drag-n-drop, we can swap columns.
  - With the help of drag-n-drop, we can change the order of tasks within a column.
  - With the help of drag-n-drop, we can change the task belonging to the column.
  - The functionality of viewing and editing of the task is implemented.
  - The task have a delete task button. On click: confirmation modal -> delete.
  - At the top of the column there is Title. When you click on it, it become an input, with Submit and Cancel buttons near it. After entering text in the input and clicking Submit - the Title of the column changes.
  - The column have a delete button. By clicking -> confirmation modal -> when approving -> deleting.

#### General requirements
  - Backend error handling - (Not found, unhandled rejection, etc) is performed in a user-friendly way.
  - Localization: You are able to change the language by clicking on the toggler in header.
  - Backend is deployed and publicly available
  - Sticky header
