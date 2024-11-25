# Node.js Project Setup with TypeScript

This guide walks you through setting up a Node.js project with TypeScript, Express, and other essential tools and dependencies.

## 🚀 Getting Started

Follow the steps below to set up your project.

### 1. Initialize a New Node.js Project

Run the following command to initialize a new project and generate a `package.json` file with default settings:

```bash
npm init -y
```

### 2. Install Required Dependencies

Install the core dependencies for your project:

```bash
npm install express
```

Add the development dependencies for TypeScript and type definitions:

```bash
npm install --save-dev typescript @types/express @types/node ts-node-dev
```

### 3. Initialize TypeScript

Generate a tsconfig.json file by running:

```bash
npx tsc --init
```

### 4. Additional Dependencies

Install additional packages for MongoDB, authentication, and validation:

Core Dependencies:

```bash
npm install mongoose bcrypt jsonwebtoken zod
```

Development Dependencies:

```bash
npm install --save-dev @types/bcrypt @types/jsonwebtoken
```

Install dotenv for environment variable management:

```bash
npm install dotenv
```
