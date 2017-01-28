module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "no-allow-react-context"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "radix": 2,
        "arrow-parens": [
            2,
            "as-needed"
        ],
        "arrow-spacing": 2,
        "block-spacing": [
            2,
            "never"
        ],
        "camelcase": 1,
        "constructor-super": 2,
        "comma-dangle": [
            2,
            "never"
        ],
        "comma-style": [
            2,
            "last"
        ],
        "comma-spacing": [
            2,
            {
                "before": false,
                "after": true
            }
        ],
        "callback-return": [
            2,
            [
                "callback",
                "cb",
                "next"
            ]
        ],
        "computed-property-spacing": [
            2,
            "never"
        ],
        "default-case": 2,
        "dot-notation": 0,
        "dot-location": [
            2,
            "property"
        ],
        "eol-last": 2,
        "eqeqeq": 2,
        "generator-star-spacing": 2,
        "indent": [
            2,
            4,
            {
                "SwitchCase": 1
            }
        ],
        "require-jsdoc": 1,
        "key-spacing": [
            2,
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "lines-around-comment": [
            2,
            {
                "beforeBlockComment": false,
                "beforeLineComment": false,
                "afterLineComment": false
            }
        ],
        "no-alert": 0,
        "no-class-assign": 2,
        "no-cond-assign": 2,
        "no-console": 1,
        "no-const-assign": 2,
        "no-constant-condition": 2,
        "no-duplicate-case": 2,
        "no-dupe-class-members": 2,
        "no-dupe-keys": 2,
        "no-empty": 2,
        "no-empty-pattern": 2,
        "no-invalid-this": 1,
        "no-mixed-spaces-and-tabs": 2,
        "no-multiple-empty-lines": [
            2,
            {
                "max": 2
            }
        ],
        "no-multi-spaces": 0,
        "no-this-before-super": 2,
        "no-trailing-spaces": 2,
        "no-lonely-if": 2,
        "no-unneeded-ternary": 2,
        "no-unused-vars": 0,
        // 未実装関数でエラー出るので 0 にして無効化・・・
        "no-var": 2,
        "no-regex-spaces": 0,
        "object-curly-spacing": [
            0,
            "never",
            {
                "objectsInObjects": false,
                "arraysInObjects": false
            }
        ],
        "operator-assignment": [
            2,
            "always"
        ],
        "prefer-arrow-callback": 2,
        "prefer-const": 2,
        "prefer-reflect": 0,
        "prefer-spread": 2,
        "prefer-template": 2,
        "require-yield": 2,
        "quotes": [
            2,
            "double"
        ],
        "semi": [
            2,
            "always"
        ],
        "strict": 0,
        "space-before-blocks": 2,
        "space-before-function-paren": [
            2,
            "never"
        ],
        "space-infix-ops": 2,
        "space-unary-ops": 2,
        "spaced-comment": [
            2,
            "always"
        ],
        "valid-jsdoc": [
            1,
            {
                "requireReturn": false,
                "requireParamDescription": false,
                "requireReturnDescription": false
            }
        ],
        // React
        "react/no-danger": 0,
        "react/prop-types": 1,
        "react/forbid-prop-types": 2,
        "no-allow-react-context/no-allow-react-context": [
            2, {
                "except": [
                    "**/components/container/**/*.js",
                    "**/components/pages/**/*.js"
                ]
            }
        ]
    }
};
