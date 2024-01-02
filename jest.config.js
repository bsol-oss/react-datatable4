module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    },
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    testEnvironmentOptions: { url: 'http://localhost' },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
}
