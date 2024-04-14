# skills-challenge Project

This repository stores the tasks from a step of the selection proccess for a QA position in the MB.io company.

> Important: Inside the manual-testing folder (root level) there is a PDF file with the bugs found from the exploratory execution.

## Dependencies

- Playwright v1.4.3
- Faker-js v8.4.1
- Node v20.12.5
- npm v9.6.2

> Pre requirements:

- [Node setup](https://nodejs.dev/en/learn/how-to-install-nodejs/)
- [VS Code setup](https://code.visualstudio.com/learn/get-started/basics)

## Fork and clone the project

1. Copy the project URL `https://github.com/olavovitor/skills-challenge.git`;
2. Access the forked project `cd skills-challenge`

## Instal the project

On your terminal, type:

1. `npm i`

# Scripts to execute

It's possible to execute the main test through some alternatives:

1. Headless execution for all browsers

```
npm run test
```

2. Execution via UI for all browsers

```
npm run test:ui
```

3. Headless execution only for Microsoft Edge

```
npm run test:edge
```

4. Headless execution only for Google Chrome

```
npm run test:chrome
```
