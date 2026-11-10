# AlgoSolved-AI

AI-assisted algorithm practice web app. Pick a problem, write a Python solution, and ask Gemini for a hint or a code review instead of a direct answer.

**Live demo:** https://algo-solved-ai.vercel.app

## Features

- Problem list with category and difficulty (e.g. Binary Search, Easy), each with description, input/output format and examples
- **Hint mode:** analyzes your code and returns hints and direction without revealing the solution
- **Review mode:** reviews your Python code for clean code and efficiency and suggests a revised version
- Responses rendered as Markdown
- Bring your own Gemini API key on the Settings page; it is stored only in your browser's `localStorage`

## Tech Stack

React, TypeScript, Vite, React Router, Google Gemini API, deployed on Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open the app, go to **Settings**, and enter a [Gemini API key](https://aistudio.google.com/apikey).

```bash
npm run build    # type-check and production build
npm run preview  # serve the production build locally
```

## Project Structure

```
src/
  pages/        Home, ProblemList, ProblemDetail, Settings
  components/   Navbar
  data/         problem definitions
  services/     Gemini API client
```
