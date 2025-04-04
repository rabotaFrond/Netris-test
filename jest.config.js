/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom", // Среда выполнения для тестов с DOM
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Настройки после загрузки тестов
  transform: {
    "^.+.tsx?$": ["ts-jest", {}], // Трансформация для файлов .ts и .tsx
    "^.+\\.css$": "jest-transform-stub", // Мокинг CSS файлов
  },
  moduleNameMapper: {
    "^hooks/(.*)$": "<rootDir>/src/hooks/$1", // Маппинг для абсолютных путей, например: import 'hooks/useCanvas'
    "^components/(.*)$": "<rootDir>/src/components/$1", // Аналогичный маппинг для компонентов
    "\\.css$": "identity-obj-proxy", // Мокинг импорта CSS файлов
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Поддерживаемые расширения файлов
};
