import { testType } from '../utils/test-utils';
import {
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  GeoJSONGeometry,
  GeoJSONLineString,
  GeoJSONMultiLineString,
  GeoJSONMultiPoint,
  GeoJSONMultiPolygon,
  GeoJSONPoint,
  GeoJSONPolygon,
  HTTPRequestBody,
  HTTPResponse,
  JSONObject,
  JSONPatch,
  JSONPatchOperation,
  JSONValue,
  NullableJSONValue,
} from './representational-types';

/**
 * Helpers
 */

interface PointProperties {
  name: string;
  elevation?: number;
}

interface AreaProperties {
  name: string;
  area: number;
  protected: boolean;
}

const simpleJSONData: JSONObject = { key: 'value' };
const complexJSONData: JSONObject = {
  user: 'john_doe',
  details: { age: 30, active: true },
  tags: ['admin', 'user'],
};

// More detailed response body example
interface UserResponse extends JSONObject {
  id: number;
  username: string;
  profile: { age: number; active: boolean };
}

/**
 * Tests
 */

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

// @dts-jest:group NullableJSONValue
{
  // @dts-jest:pass:snap -> string | number | boolean | JSONObject | JSONValue[] | null | undefined
  testType<NullableJSONValue>(undefined);

  // @dts-jest:pass:snap -> string | number | boolean | JSONObject | JSONValue[] | null | undefined
  testType<NullableJSONValue>('stringValue');

  // @dts-jest:pass:snap -> string | number | boolean | JSONObject | JSONValue[] | null | undefined
  testType<NullableJSONValue>(null);

  // @dts-jest:pass:snap -> string | number | boolean | JSONObject | JSONValue[] | null | undefined
  testType<NullableJSONValue>(123);
}

// @dts-jest:group JSONPatchOperation
{
  // @dts-jest:pass:snap -> JSONPatchOperation
  testType<JSONPatchOperation>({
    op: 'add',
    path: '/a/b/c',
    value: 'stringValue',
  });

  // @dts-jest:pass:snap -> JSONPatchOperation
  testType<JSONPatchOperation>({ op: 'remove', path: '/a/b/c' });

  // @dts-jest:pass:snap -> JSONPatchOperation
  testType<JSONPatchOperation>({ op: 'replace', path: '/a/b/c', value: 123 });

  // @dts-jest:pass:snap -> JSONPatchOperation
  testType<JSONPatchOperation>({ op: 'move', from: '/a/b/c', path: '/d/e/f' });

  // @dts-jest:pass:snap -> JSONPatchOperation
  testType<JSONPatchOperation>({ op: 'copy', from: '/a/b/c', path: '/d/e/f' });

  // @dts-jest:pass:snap -> JSONPatchOperation
  testType<JSONPatchOperation>({ op: 'test', path: '/a/b/c', value: true });
}

// @dts-jest:group JSONPatch
{
  // @dts-jest:pass:snap -> JSONPatch
  testType<JSONPatch>([
    { op: 'add', path: '/a/b/c', value: { someKey: 'someValue' } },
    { op: 'remove', path: '/x/y/z' },
    { op: 'replace', path: '/g/h/i', value: null },
    { op: 'move', from: '/j/k/l', path: '/m/n/o' },
    { op: 'copy', from: '/p/q/r', path: '/s/t/u' },
    { op: 'test', path: '/v/w/x', value: [1, 2, 3] },
  ]);
}

// @dts-jest:group GeoJSONPoint
{
  // @dts-jest:pass:snap -> GeoJSONPoint
  testType<GeoJSONPoint>({
    type: 'Point',
    coordinates: [100.0, 0.0],
  });
}

// @dts-jest:group GeoJSONLineString
{
  // @dts-jest:pass:snap -> GeoJSONLineString
  testType<GeoJSONLineString>({
    type: 'LineString',
    coordinates: [
      [100.0, 0.0],
      [101.0, 1.0],
    ],
  });
}

// @dts-jest:group GeoJSONPolygon
{
  // @dts-jest:pass:snap -> GeoJSONPolygon
  testType<GeoJSONPolygon>({
    type: 'Polygon',
    coordinates: [
      [
        [100.0, 0.0],
        [101.0, 0.0],
        [101.0, 1.0],
        [100.0, 1.0],
        [100.0, 0.0],
      ],
    ],
  });
}

// @dts-jest:group GeoJSONMultiPoint
{
  // @dts-jest:pass:snap -> GeoJSONMultiPoint
  testType<GeoJSONMultiPoint>({
    type: 'MultiPoint',
    coordinates: [
      [100.0, 0.0],
      [101.0, 1.0],
    ],
  });
}

// @dts-jest:group GeoJSONMultiLineString
{
  // @dts-jest:pass:snap -> GeoJSONMultiLineString
  testType<GeoJSONMultiLineString>({
    type: 'MultiLineString',
    coordinates: [
      [
        [100.0, 0.0],
        [101.0, 1.0],
      ],
      [
        [102.0, 2.0],
        [103.0, 3.0],
      ],
    ],
  });
}

// @dts-jest:group GeoJSONMultiPolygon
{
  // @dts-jest:pass:snap -> GeoJSONMultiPolygon
  testType<GeoJSONMultiPolygon>({
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [102.0, 2.0],
          [103.0, 2.0],
          [103.0, 3.0],
          [102.0, 3.0],
          [102.0, 2.0],
        ],
      ],
      [
        [
          [100.0, 0.0],
          [101.0, 0.0],
          [101.0, 1.0],
          [100.0, 1.0],
          [100.0, 0.0],
        ],
        [
          [100.2, 0.2],
          [100.8, 0.2],
          [100.8, 0.8],
          [100.2, 0.8],
          [100.2, 0.2],
        ],
      ],
    ],
  });
}

// @dts-jest:group GeoJSONGeometry - Point
{
  // @dts-jest:pass:snap -> GeoJSONGeometry
  testType<GeoJSONGeometry>({
    type: 'Point',
    coordinates: [100.0, 0.0],
  });
}

// @dts-jest:group GeoJSONGeometry - LineString
{
  // @dts-jest:pass:snap -> GeoJSONGeometry
  testType<GeoJSONGeometry>({
    type: 'LineString',
    coordinates: [
      [100.0, 0.0],
      [101.0, 1.0],
    ],
  });
}

// @dts-jest:group GeoJSONGeometry - Polygon
{
  // @dts-jest:pass:snap -> GeoJSONGeometry
  testType<GeoJSONGeometry>({
    type: 'Polygon',
    coordinates: [
      [
        [100.0, 0.0],
        [101.0, 0.0],
        [101.0, 1.0],
        [100.0, 1.0],
        [100.0, 0.0],
      ],
    ],
  });
}

// @dts-jest:group GeoJSONGeometry - MultiPoint
{
  // @dts-jest:pass:snap -> GeoJSONGeometry
  testType<GeoJSONGeometry>({
    type: 'MultiPoint',
    coordinates: [
      [100.0, 0.0],
      [101.0, 1.0],
    ],
  });
}

// @dts-jest:group GeoJSONGeometry - MultiLineString
{
  // @dts-jest:pass:snap -> GeoJSONGeometry
  testType<GeoJSONGeometry>({
    type: 'MultiLineString',
    coordinates: [
      [
        [100.0, 0.0],
        [101.0, 1.0],
      ],
      [
        [102.0, 2.0],
        [103.0, 3.0],
      ],
    ],
  });
}

// @dts-jest:group GeoJSONGeometry - MultiPolygon
{
  // @dts-jest:pass:snap -> GeoJSONGeometry
  testType<GeoJSONGeometry>({
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [102.0, 2.0],
          [103.0, 2.0],
          [103.0, 3.0],
          [102.0, 3.0],
          [102.0, 2.0],
        ],
      ],
      [
        [
          [100.0, 0.0],
          [101.0, 0.0],
          [101.0, 1.0],
          [100.0, 1.0],
          [100.0, 0.0],
        ],
        [
          [100.2, 0.2],
          [100.8, 0.2],
          [100.8, 0.8],
          [100.2, 0.8],
          [100.2, 0.2],
        ],
      ],
    ],
  });
}

// @dts-jest:group GeoJSONFeature with PointProperties
{
  // @dts-jest:pass:snap -> GeoJSONFeature<PointProperties>
  testType<GeoJSONFeature<PointProperties>>({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [125.6, 10.1],
    },
    properties: {
      name: 'Dinagat Islands',
      elevation: 357,
    },
  });
}

// @dts-jest:group GeoJSONFeature with AreaProperties
{
  // @dts-jest:pass:snap -> GeoJSONFeature<AreaProperties>
  testType<GeoJSONFeature<AreaProperties>>({
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [125.0, 10.0],
          [125.0, 11.0],
          [126.0, 11.0],
          [126.0, 10.0],
          [125.0, 10.0],
        ],
      ],
    },
    properties: {
      name: 'Central Park',
      area: 3416,
      protected: true,
    },
  });
}

// @dts-jest:group GeoJSONFeatureCollection with PointProperties
{
  // @dts-jest:pass:snap -> GeoJSONFeatureCollection<PointProperties>
  testType<GeoJSONFeatureCollection<PointProperties>>({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [102.0, 0.5],
        },
        properties: {
          name: 'Null Island',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [103.0, 1.5],
        },
        properties: {
          name: 'One-and-a-half Island',
          elevation: 15,
        },
      },
    ],
  });
}

// @dts-jest:group HTTPRequestBody - simple data
{
  // @dts-jest:pass:snap -> HTTPRequestBody
  testType<HTTPRequestBody>({
    data: simpleJSONData,
  });

  // @dts-jest:pass:snap -> HTTPRequestBody
  testType<HTTPRequestBody>({
    data: complexJSONData,
  });
}

// @dts-jest:group HTTPResponse - simple JSON response
{
  // @dts-jest:pass:snap -> HTTPResponse<JSONObject>
  testType<HTTPResponse<JSONObject>>({
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' },
    body: simpleJSONData,
  });
}

// @dts-jest:group HTTPResponse - complex JSON response
{
  // @dts-jest:pass:snap -> HTTPResponse<JSONObject>
  testType<HTTPResponse<JSONObject>>({
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' },
    body: complexJSONData,
  });
}

// @dts-jest:group HTTPResponse - typed response
{
  // Simulating a more structured response body
  const userResponseBody: UserResponse = {
    id: 1,
    username: 'john_doe',
    profile: { age: 30, active: true },
  };

  // @dts-jest:pass:snap -> HTTPResponse<UserResponse>
  testType<HTTPResponse<UserResponse>>({
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' },
    body: userResponseBody,
  });
}
