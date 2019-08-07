const request = require('request-promise');
const rp = require('request-promise');
const mockConfig = {};

const getConfig = async (tenant, loaders) => {
  let globalConfig = await loaders.data.load('globalconfig');
  let apps = await loaders.data.load('apps');
  let themes = await loaders.data.load('themes');
  console.log('getConfig', globalConfig, apps, themes);
  const theme = themes.filter((t) => {
    return t.displayName === globalConfig.theme;
  })[0];
  return {
    ...globalConfig,
    apps,
    themes,
    theme,
  };
};

module.exports = {
  Query: {
    hello: () => 'Hello world!',

    
    songs: (post, {}, { loaders }) => loaders.data.load('songs'),
    artists: (post, {}, { loaders }) => loaders.data.load('artists'),
   
    user: () => {
      return mockConfig.user;
    },
  },
};
