import { ESLint } from "eslint";

export default new ESLint({
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        // Add or customize ESLint rules here
    },
});
