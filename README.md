# Description
This app was developed as a part of BANKSapi Coding Challenge

## Install
1. Clone this repo
`git clone https://github.com/dalyonushkin/BANKSApi-coding-challenge-client.git`
or
`git clone git@github.com:dalyonushkin/BANKSApi-coding-challenge-client.git`
2. Change current folder to app
`cd BANKSApi-coding-challenge-client`
3. Install dependencies
`npm install`
4. Run app
`ionic serve`
5. You can reach app at `http://localhost:8100`

## Testing
Run unit test
`npm test`
You can found code coverage report at  `coverage/transer-app/index.html`
Run Cypress testing
`npm run cypress:run`

## Know issues
- Page Design is not my master skill :(
- I'm unable to use property [isDateEnabled](https://ionicframework.com/docs/api/datetime#disabling-dates) of `ion-datetime` component. Looks like there are same [issue at GitHub](https://github.com/ionic-team/ionic-framework/issues/25189)
- FormBuilder auto-validation changes the class of the parent component, I couldn't find a way to reproduce the same behavior in the controller's code. I decided to develop the component to make it look the same.
- I've spent some time to resolve some differenet `ionic` versions issues (v3 vs v5) installed on the same computer. I'm using `npx`, but not `nvm`. Anyway, now ionic v6 is installed globally at my computer :)
- In my opinion, I don't show full usage of NgRX as you expected. There are only simple reducers, store and selector, but no effects at the moment. Probably you want to I implement http requests to server, but I didn't. Also, I have some issues with selector's typings. I wish to make this part better, but  I have no time tomorrow (01.05.2022). 
- There are some example of antipattern in template `src/app/home/home.page.html`. I've placed it there just for example how to avoid code coverage quality gate.