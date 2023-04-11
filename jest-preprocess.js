const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
}

/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = require("babel-jest").default.createTransformer(babelOptions)
