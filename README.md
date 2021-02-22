# Welcome to @ifake/page-visibility 👋

> Wrapper for the Page Visibility API.

The scaffolding for this project is from [pkg](https://github.com/ifakejs/pkg)

### 🏠 [Homepage](https://github.com/ifakejs/page-visibility)

## Document
WIP

## Usage
```sh
# Make sure you have yarn installed on your machine.
yarn add @ifake/page-visibility
# or
npm install @ifake/page-visibility
```
- Browser

```js
// We expose a global variable that can be used directly in the browser.
const { pageVisibility, VISIBILITY_EVENT_NAME } = window.IFPageVisible
```

- ES6 Module

```js
import { pageVisibility, VISIBILITY_EVENT_NAME } from '@ifake/page-visibility'
```

```js
pageVisibility.on(VISIBILITY_EVENT_NAME, (isVisible) => {
  if (isVisible) {
    // show event
    console.log("Browser's status is showing")
  } else {
    // hidden event
    console.log("Browser's status is hide")
  }
})
```

## API
WIP

## Author

👤 **ifake**

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/ifakejs/page-visibility/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/ifakejs/page-visibility/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
