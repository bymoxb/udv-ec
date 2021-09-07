module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest/globals": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "jest",
        "@typescript-eslint",
    ],
    "rules": {
        "quotes": "single, error"
    }
};
