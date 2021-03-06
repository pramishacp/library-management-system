require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

const config = {
    'dev': {
        app: {
            port: parseInt(process.env.DEV_APP_PORT),
            env: 'dev'
        }
    },
    'test': {
        app: {
            port: parseInt(process.env.TEST_APP_PORT),
            env: 'test'
        }
    },
    'prod': {
        app: {
            port: parseInt(process.env.PROD_APP_PORT),
            env: 'prod'
        }
    }
}

module.exports = config[env];
