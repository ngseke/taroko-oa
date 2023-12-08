# Taroko Contact List

## Slide

https://github.com/ngseke/taroko-oa/blob/main/slides-export.pdf

## Demo

https://ngseke.github.io/taroko-oa/

(You will need to start the [API server](https://github.com/resumecompanion/taroko_server) locally on port 3000 first.)

## Installation

Recommended environment:

1. node `18.17.0`
2. pnpm `8.6.10`

Install dependencies

```sh
pnpm i
```

Create environment variable

```sh
cp .env.example .env
code .env # edit `.env` file and set your `VITE_API_URL`
```

## Development

```sh
pnpm run dev
```

## Build

```sh
pnpm run test
pnpm run lint
pnpm run build
```

## Quiz Answer

https://github.com/ngseke/taroko-oa/blob/main/quiz-answer.txt
