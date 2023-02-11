function transformAliases(record) {
  return Object.entries(record).reduce((acc, [key, value]) => {
    acc[`^\\${key}(.*)`] = `<rootDir>/src/${value}$1`;

    return acc;
  }, {});
}

const aliases = {
  $api: 'api',
  $components: 'components',
  $constants: 'constants',
  $controllers: 'controllers',
  $core: 'core',
  $iconTemplates: 'iconTemplates',
  $layouts: 'layouts',
  $pages: 'pages',
  $store: 'store',
  $utils: 'utils',
};

module.exports = {
  collectCoverage: false,
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/(?!nanoid/)'],
  moduleNameMapper: transformAliases(aliases),
};
