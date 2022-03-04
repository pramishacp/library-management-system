require('dotenv').config();

describe('process.env config', () => {
  const env = process.env;

  beforeEach(() => {
      process.env.NODE_ENV = '';
      jest.resetModules();
      process.env = { ...env };
  })

  afterEach(() => {
      process.env = env
  })

  const exec = () => require('../../../startup/config');

  it('should return dev by default', () => {
    const res = exec();
    
    expect(res).toHaveProperty('app');
    expect(res.app.port).toBeTruthy();
    expect(res.app.env).toBe('dev');
  })
})

