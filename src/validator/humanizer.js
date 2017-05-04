/* @flow */

/**
 * Converts Ajv errors into human friendly errors hash
 */
export default (errors: Array<Object>): Object =>
  errors.reduce((errors, error) => {
    const { dataPath, params = {}, message } = error;
    const key = dataPath || params.missingProperty;

    return { ...errors, [key.replace('.', '')]: message };
  }, {});
