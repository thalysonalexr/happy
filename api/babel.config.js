module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      'module-resolver', {
        alias: {
          '@': './src',
          '@app': './src/app',
          '@controllers': './src/app/controllers',
          '@config': './src/config',
          '@entities': './src/app/entities',
          '@presenters': './src/app/presenters',
          '@repositories': './src/app/repositories',
          '@services': './src/services',
          '@utils': './src/utils',
        }
      },
    ]
  ],
}
