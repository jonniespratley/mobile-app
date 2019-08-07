const DataLoader = require('dataloader');
const rp = require('request-promise');

const APPHUB_CONFIG_URL =
  process.env.APPHUB_CONFIG_URL || 'https://predix-apphub-arcs-prod.run.aws-usw02-pr.ice.predix.io';
let APPHUB_CONFIG_TOKEN = null;
let APPHUB_CONFIG_ID = process.env.APPHUB_CONFIG_TOKEN;

class ArcsApps {
  constructor(baseUrl, authToken, zoneId) {
    this.baseUrl = baseUrl || APPHUB_CONFIG_URL;
    this.request = rp.defaults({
      json: true,
      baseUrl: baseUrl,
      headers: {
        Authorization: authToken,
        'predix-zone-id': zoneId,
      },
    });
  }
  getApp(id) {
    return this.request(`${this.baseUrl}/apps/${id}`);
  }
  getApps(id) {
    return this.request(`${this.baseUrl}/apps`);
  }
  async load(key) {
    console.log('Loading either', 'apps', 'themes', 'globalConfig');
    return this.request(`${this.baseUrl}/${key}`);
  }
}

/**
 * Create a set of data loaders for Apps,
 * These apps are stored in remote arcs server.
 *
 * @param {String} authToken The authorization token
 * @param {String} zoneId The zone id for the tenant
 * @returns
 */
function createAppLoaders(authToken, zoneId) {
  const arcsApps = new ArcsApps(null, authToken, zoneId);

  async function loadData(keys) {
    return [...keys].map(async (key) => {
      return await arcsApps.load(key);
    });
  }
  async function loadApp(ids) {
    return [...ids].map(async (id) => {
      return await arcsApps.getApp(id);
    });
  }

  async function loadApps(ids) {
    return [...ids].map(async (id) => {
      return await arcsApps.getApps(id);
    });
  }
  const appLoaders = {
    data: new DataLoader((key) => loadData(key)),
    apps: new DataLoader((zone) => loadApps(zone)),
    app: new DataLoader((ids) => loadApp(ids)),
    appsByTenant: new DataLoader((ids) =>
      arcsApps.getApps(ids).then((apps) => {
        //loaders.apps.prime(zoneId, apps);
        for (let app of apps) {
          appLoaders.app.prime(app.id, app);
        }
        return [apps];
      })
    ),
  };
  return appLoaders;
}

/**
 * Create Data Loaders for a specific token.
 *
 * @param {*} authToken
 * @param {*} zoneId
 * @returns
 */
function createLoaders(authToken, zoneId) {
  APPHUB_CONFIG_ID = zoneId;
  APPHUB_CONFIG_TOKEN = authToken;
  const loaders = {
    //users: new DataLoader((ids) => genUsers({ authToken, zoneId }, ids)),
    ...createAppLoaders(authToken, zoneId),
  };
  return loaders;
}

module.exports = createLoaders;
