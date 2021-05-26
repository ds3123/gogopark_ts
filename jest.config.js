
module.exports = {

  preset: 'ts-jest',

  testEnvironment: "jsdom",

  "setupFilesAfterEnv": [ "<rootDir>/jest-setup.ts" ] ,

  transform: {
    "^.+\\.svg$": "<rootDir>/svgTransform.js" // 新增 svgTransform.js : 處理 SVG 圖片
  } ,

  "moduleNameMapper": {
    "\\.(css|less|scss)$": "identity-obj-proxy"  // 利用套件 identity-obj-proxy : 處理 _ css 或 less 或 scss 樣式
  } ,

  moduleDirectories: ['node_modules', 'src']     // 配合 : 絕對路徑的設定


};

