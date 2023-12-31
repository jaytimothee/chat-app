# chat-app
https://github.com/jaytimothee/chat-app/assets/25870316/b714c18c-096f-49c6-be54-2f1343fd871f

<img width="1511" alt="Screen Shot 2023-11-13 at 9 35 57 PM" src="https://github.com/jaytimothee/chat-app/assets/25870316/b9642f74-2e5c-45a9-a5f9-7b8deb804abc">
<img width="1507" alt="Screen Shot 2023-11-13 at 9 35 22 PM" src="https://github.com/jaytimothee/chat-app/assets/25870316/8e5d5921-f692-423d-a8b5-92e471bfac42">
<img width="1506" alt="Screen Shot 2023-11-13 at 9 35 39 PM" src="https://github.com/jaytimothee/chat-app/assets/25870316/400f8836-3163-47c6-b7f7-fde7ec09d280">


# Main Process (`main.cjs`) Documentation

## Imports:

```javascript
const { app, BrowserWindow, ipcMain } = require("electron");
```

- Imports necessary modules from Electron.

## Browser Window Creation:

```javascript
let mainWindow;
```

## Chat Conversation

```javascript
const {
  addMessage,
  getLatestMessage,
} = require("./renderer/js/chatConversations.mjs");
```

## Page Loading

```javascript
function loadPage(page) { ... }

```

- Defines a function to load a page into the main browser window. It handles potential errors when loading pages.

## IPC Event Handlers:

```javascript
ipcMain.on("move-to-next-step", (event, userData) => { ... }

```

- Listens for an IPC event to move to the next step in the application. It updates the current step, updates user data, and loads the corresponding page.

# StepStrategy Class

## Constructor

## Parameters:

- `form` (HTMLElement): The HTML form element associated with the step.
- `currentStep` (string): The identifier for the current step.
- `nextStep` (string): The identifier for the next step to navigate to.
- `validationCallback` (function): The validation callback function for the step.

## Properties:

- `form` (HTMLElement): The HTML form element associated with the step.
- `currentStep` (string): The identifier for the current step.
- `nextStep` (string): The identifier for the next step to navigate to.
- `validationCallback` (function): The validation callback function for the step.
  `user` (object): An empty object to store user data.
  `execute()` Method

## Description:

- Attaches a submit event listener to the form to trigger validation and navigation.
- Calls the private method #validateAndProceed() when the form is submitted.

## #validateAndProceed() Method

- Description:
  Validates the input data using the provided validation callback.
- If valid, updates the user object with the input data and navigates to the next step.
- If invalid, displays an error alert.

## #getInputValue() Method

Description:

- Retrieves the values of input elements within the form.
- Returns an object mapping input names to their values.

## Concrete Strategy Classes

`PhoneNumberStep` Class

- Constructor:
- Inherits from `StepStrategy`.
- Sets properties for the phone number step, including form, current step, next step, and validation callback.

## ConfirmCodeStep Class

- Constructor:

* Inherits from `StepStrategy`.
  Sets properties for the confirmation code step, including form, current step, next step, and validation callback.

## NameStep Class

- Constructor:
- Inherits from `StepStrategy`.
- Sets properties for the name step, including form, current step, next step, and validation callback.

## Utility Functions

`isValidPhoneNumber(phoneNumber)` Function

- Description:
- Validates a phone number using a regular expression.
- Returns `true` if the phone number is valid, false otherwise.

`isValidConfirmCode(confirmCode)` Function

- Description:
  Validates a confirmation code using a regular expression.
  Returns `true` if the code is valid, false otherwise.

`isValidName(name)` Function

- Description:
  Validates a name using a regular expression.
  Returns `true` if the name is valid, false otherwise.
  `alertError(message) `Function
- Description:
  Displays an error toast notification with the provided message.

`alertSuccess(message) `Function

- Description:
- Displays a success toast notification with the provided message.

## Export

Exports the `StepStrategy`, `PhoneNumberStep`, `ConfirmCodeStep`, and `NameStep` classes for use in other modules.
