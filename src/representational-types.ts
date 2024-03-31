/**
 * JSONObject
 * @desc Represents a JSON object, allowing for a dictionary structure with string type keys and JSONValue type values. It's a recursive type definition that can represent complex nested structures typically found in JSON data structures.
 * @example
 *   const person: JSONObject = {
 *     name: "John Doe",
 *     age: 30,
 *     address: {
 *       street: "123 Main St",
 *       city: "Anytown"
 *     }
 *   };
 */
export type JSONObject = { [key: string]: JSONValue };

/**
 * JSONValue
 * @desc Represents all possible value types in a JSON object, including string, number, boolean, null, nested JSONObject, and arrays of JSONValue. This recursive type can accommodate the complexity of typical JSON data, including deeply nested structures.
 * @example
 *   // A complex JSONValue including various types and nesting
 *   const complexValue: JSONValue = {
 *     name: "John Doe",
 *     age: 30,
 *     hobbies: ["reading", "gaming"],
 *     address: {
 *       city: "Anytown",
 *       zip: null
 *     }
 *   };
 */
export type JSONValue = string | number | boolean | null | JSONObject | JSONValue[];

/**
 * NullableJSONValue
 * @desc Extends the JSONValue type by including 'undefined' as a possible value, accommodating cases where JSON data structures explicitly mark fields as undefined to denote absence or non-initialization. This is useful in TypeScript to model optional properties more accurately.
 * @example
 *   // Using NullableJSONValue to allow for explicit undefined values
 *   const userData: { name: string, age?: NullableJSONValue } = {
 *     name: "Jane Doe"
 *     // age is intentionally left undefined here to signify it hasn't been initialized or is absent
 *   };
 */
export type NullableJSONValue = JSONValue | undefined;

export type JSONPatchOperation =
  | { op: 'add'; path: string; value: JSONValue }
  | { op: 'remove'; path: string }
  | { op: 'replace'; path: string; value: JSONValue }
  | { op: 'move'; from: string; path: string }
  | { op: 'copy'; from: string; path: string }
  | { op: 'test'; path: string; value: JSONValue };

export type JSONPatch = JSONPatchOperation[];

// GeoJSON Extensions
export type GeoJSONGeometry =
  | GeoJSONPoint
  | GeoJSONLineString
  | GeoJSONPolygon
  | GeoJSONMultiPoint
  | GeoJSONMultiLineString
  | GeoJSONMultiPolygon;

export type GeoJSONPoint = {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
};

export type GeoJSONLineString = {
  type: 'LineString';
  coordinates: Array<[number, number]>;
};

export type GeoJSONPolygon = {
  type: 'Polygon';
  coordinates: Array<Array<[number, number]>>;
};

export type GeoJSONMultiPoint = {
  type: 'MultiPoint';
  coordinates: Array<[number, number]>;
};

export type GeoJSONMultiLineString = {
  type: 'MultiLineString';
  coordinates: Array<Array<[number, number]>>;
};

export type GeoJSONMultiPolygon = {
  type: 'MultiPolygon';
  coordinates: Array<Array<Array<[number, number]>>>;
};

export interface GeoJSONFeature<T> {
  type: 'Feature';
  geometry: GeoJSONGeometry;
  properties: T;
}

export interface GeoJSONFeatureCollection<T> {
  type: 'FeatureCollection';
  features: Array<GeoJSONFeature<T>>;
}

export interface HTTPRequestBody {
  data: JSONObject;
}

export interface HTTPResponse<T extends JSONObject> {
  status: number;
  statusText: string;
  headers: JSONObject;
  body: T;
}
