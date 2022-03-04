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

  it('should return test when NODE_ENV=test', () => {
    process.env.NODE_ENV = 'test';

    const res = exec();
    
    expect(res).toHaveProperty('app');
    expect(res.app.port).toBeTruthy();
    expect(res.app.env).toBe('test');
  })

  it('should return dev when NODE_ENV=dev', () => {
    process.env.NODE_ENV = 'dev';

    const res = exec();
    
    expect(res).toHaveProperty('app');
    expect(res.app.port).toBeTruthy();
    expect(res.app.env).toBe('dev');
  })

  it('should return dev by default', () => {
    const res = exec();
    
    expect(res).toHaveProperty('app');
    expect(res.app.port).toBeTruthy();
    expect(res.app.env).toBe('dev');
  })
})

