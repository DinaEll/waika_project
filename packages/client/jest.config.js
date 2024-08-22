import dotenv from 'dotenv'
dotenv.config()

export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
    globals: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/mocks/fileMock.js',
        "\\.(css|scss)$": "identity-obj-proxy"
    },
}
