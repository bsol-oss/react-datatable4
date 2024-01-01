module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/preset-create-react-app',
        '@storybook/addon-onboarding',
        '@storybook/addon-actions',
    ],
    framework: "@storybook/react-webpack5",
    core: {
      builder: "@storybook/builder-webpack5",
    },
    features: {
      interactionsDebugger: true,
    },
}
