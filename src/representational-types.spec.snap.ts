import { testType } from '../utils/test-utils';
import { JSONObject, JSONValue } from './representational-types';

// @dts-jest:group JSONObject
{
  // @dts-jest:pass:snap -> JSONObject
  testType<JSONObject>({
    simpleKey: 'stringValue',
    numberKey: 123,
    booleanKey: true,
    nullKey: null,
    objectKey: { nestedKey: 'nestedValue' },
    arrayKey: ['stringInArray', 456, false, { arrayObjectKey: 'value' }],
  });
}

// @dts-jest:group JSONValue
{
  // @dts-jest:pass:snap -> JSONValue
  testType<JSONValue>('stringValue');

  // @dts-jest:pass:snap -> JSONValue
  testType<JSONValue>(123);

  // @dts-jest:pass:snap -> JSONValue
  testType<JSONValue>(true);

  // @dts-jest:pass:snap -> JSONValue
  testType<JSONValue>(null);

  // @dts-jest:pass:snap -> JSONValue
  testType<JSONValue>({
    key: 'value',
    nestedObject: { nestedKey: 789 },
  });

  // @dts-jest:pass:snap -> JSONValue
  testType<JSONValue>([
    'arrayElement1',
    101112,
    null,
    { keyInArray: 'objectValue' },
  ]);
}
