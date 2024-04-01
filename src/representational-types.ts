/**
 * JSONObject
 * @desc Represents a JSON object, allowing for a dictionary structure with string type keys and JSONValue type values.
 *   It's a recursive type definition that can represent complex nested structures typically found in JSON data
 *   structures.
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
 * @desc Represents all possible value types in a JSON object, including string, number, boolean, null, nested
 *   JSONObject, and arrays of JSONValue. This recursive type can accommodate the complexity of typical JSON data,
 *   including deeply nested structures.
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
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONValue[];

/**
 * NullableJSONValue
 * @desc Extends the JSONValue type by including 'undefined' as a possible value, accommodating cases where JSON data
 *   structures explicitly mark fields as undefined to denote absence or non-initialization. This is useful in
 *   TypeScript to model optional properties more accurately.
 * @example
 *   // Using NullableJSONValue to allow for explicit undefined values
 *   const userData: { name: string, age?: NullableJSONValue } = {
 *     name: "Jane Doe"
 *     // age is intentionally left undefined here to signify it hasn't been initialized or is absent
 *   };
 */
export type NullableJSONValue = JSONValue | undefined;

/**
 * JSONPatchOperation
 * @desc Defines an operation to be performed on a JSON object as part of a JSON Patch sequence. JSONPatchOperation is
 *   a discriminated union type, representing different operations like adding, removing, or replacing values within a
 *   JSON object based on specified paths.
 * @variants
 *   - 'add': Inserts a value at the specified path. If the path does not exist, it is created.
 *   - 'remove': Removes the value at the specified path. If there is no value, no action is taken.
 *   - 'replace': Replaces the value at the specified path with a new value. If the path does not exist, an error is
 *   thrown.
 *   - 'move': Moves a value from one path to another. This is effectively a 'remove' followed by an 'add'.
 *   - 'copy': Copies a value from one path to another. The original value remains unchanged.
 *   - 'test': Tests if the value at the specified path matches the provided value. Typically used to ensure data
 *   integrity before applying changes.
 * @example
 *   // An array of JSONPatchOperations that adds a new address and replaces an email
 *   const patchOperations: JSONPatchOperation[] = [
 *     { op: 'add', path: '/contacts/1/address', value: '123 Main St' },
 *     { op: 'replace', path: '/contacts/1/email', value: 'newemail@example.com' }
 *   ];
 */
export type JSONPatchOperation =
  | { op: 'add'; path: string; value: JSONValue }
  | { op: 'remove'; path: string }
  | { op: 'replace'; path: string; value: JSONValue }
  | { op: 'move'; from: string; path: string }
  | { op: 'copy'; from: string; path: string }
  | { op: 'test'; path: string; value: JSONValue };

/**
 * JSONPatch
 * @desc An array of JSONPatchOperation objects that collectively define a sequence of operations to be applied to a
 *   JSON object. This sequence allows for complex modifications to the object's structure and values in a standard,
 *   atomic, and reversible manner. Applying a JSON Patch helps in efficiently updating the state without the need to
 *   transmit or replace the entire object.
 * @example
 *   // Applying a JSONPatch to update a user's information
 *   const userPatch: JSONPatch = [
 *     { op: 'replace', path: '/name/first', value: 'Jane' },
 *     { op: 'add', path: '/age', value: 25 },
 *     { op: 'remove', path: '/oldField' }
 *   ];
 *   // The applyPatch function would then process this userPatch to update the user JSON object
 */
export type JSONPatch = JSONPatchOperation[];

export type GeoJSONGeometry =
  | GeoJSONPoint
  | GeoJSONLineString
  | GeoJSONPolygon
  | GeoJSONMultiPoint
  | GeoJSONMultiLineString
  | GeoJSONMultiPolygon;

/**
 * GeoJSONPoint
 * @desc Represents a geographical point using the GeoJSON format. It specifies a single position.
 * @property {string} type - The type of GeoJSON object, which is always 'Point' for this type.
 * @property {[number, number]} coordinates - An array of two numbers. The first number represents the longitude, and
 *   the second number represents the latitude.
 * @example
 *   // A GeoJSON representation of a point located at latitude 40.7128, longitude -74.0060 (New York City)
 *   const point: GeoJSONPoint = {
 *     type: 'Point',
 *     coordinates: [-74.0060, 40.7128]
 *   };
 */
export type GeoJSONPoint = {
  type: 'Point';
  coordinates: [number, number];
};

/**
 * GeoJSONLineString
 * @desc Represents a line string in the GeoJSON format, defining a series of connected points.
 * @property {string} type - The type of GeoJSON object, which is 'LineString' for this type.
 * @property {Array<[number, number]>} coordinates - An array of point coordinates, each represented by an array of two
 *   numbers: longitude and latitude. These points are connected in order, forming a continuous line.
 * @example
 *   // A GeoJSON representation of a line string connecting two points
 *   const lineString: GeoJSONLineString = {
 *     type: 'LineString',
 *     coordinates: [[-74.0060, 40.7128], [-0.1276, 51.5074]] // From New York City to London
 *   };
 */
export type GeoJSONLineString = {
  type: 'LineString';
  coordinates: Array<[number, number]>;
};

/**
 * GeoJSONPolygon
 * @desc Represents a polygon using the GeoJSON format. A polygon consists of one outer boundary and zero or more inner
 *   boundaries (holes).
 * @property {string} type - The type of GeoJSON object, which is 'Polygon' for this type.
 * @property {Array<Array<[number, number]>>} coordinates - An array of linear ring coordinate arrays. The first linear
 *   ring represents the outer boundary of the polygon, and any subsequent linear rings represent inner boundaries
 *   (holes). Each linear ring is a closed line string defined by four or more points where the first and last points
 *   are equivalent.
 * @example
 *   // A GeoJSON representation of a polygon (a simple square without holes)
 *   const polygon: GeoJSONPolygon = {
 *     type: 'Polygon',
 *     coordinates: [
 *       [[-74.0060, 40.7128], [-74.0060, 41.7128], [-73.0060, 41.7128], [-73.0060, 40.7128], [-74.0060, 40.7128]] //
 *   Outer boundary
 *     ]
 *   };
 */
export type GeoJSONPolygon = {
  type: 'Polygon';
  coordinates: Array<Array<[number, number]>>;
};

/**
 * GeoJSONMultiPoint
 * @desc Represents a collection of points in the GeoJSON format, allowing the representation of multiple geographical
 *   positions within a single object.
 * @property {string} type - The type of GeoJSON object, which for this type is 'MultiPoint'. This explicitly indicates
 *   that the object contains multiple points.
 * @property {Array<[number, number]>} coordinates - An array containing multiple point coordinates, each represented
 *   by an array of two numbers: longitude and latitude. Each array element represents a distinct geographical point.
 * @example
 *   // A GeoJSON representation of multiple points; for instance, different cities
 *   const multiPoint: GeoJSONMultiPoint = {
 *     type: 'MultiPoint',
 *     coordinates: [
 *       [-74.0060, 40.7128], // New York City
 *       [-0.1276, 51.5074]   // London
 *     ]
 *   };
 */
export type GeoJSONMultiPoint = {
  type: 'MultiPoint';
  coordinates: Array<[number, number]>;
};

/**
 * GeoJSONMultiLineString
 * @desc Represents a collection of line strings in the GeoJSON format, allowing for the modeling of multiple connected
 *   paths or routes within a single geographical object.
 * @property {string} type - The type of GeoJSON object, designated as 'MultiLineString'. This distinguishes the object
 *   as containing multiple line strings.
 * @property {Array<Array<[number, number]>>} coordinates - An array where each element is an array of point
 *   coordinates (as arrays of two numbers: longitude and latitude), representing individual line strings. Each line
 *   string is a connected series of geographical points.
 * @example
 *   // A GeoJSON representation of multiple line strings; for example, distinct paths or routes
 *   const multiLineString: GeoJSONMultiLineString = {
 *     type: 'MultiLineString',
 *     coordinates: [
 *       [[-74.0060, 40.7128], [-74.0066, 40.7129]], // Path 1
 *       [[-0.1276, 51.5074], [-0.1277, 51.5075]]   // Path 2
 *     ]
 *   };
 */
export type GeoJSONMultiLineString = {
  type: 'MultiLineString';
  coordinates: Array<Array<[number, number]>>;
};

/**
 * GeoJSONMultiPolygon
 * @desc Represents a collection of polygons in the GeoJSON format. This type is used to encapsulate multiple complex
 *   geographical shapes, each with potentially multiple boundaries (including holes), within a singular geographical
 *   entity.
 * @property {string} type - The type of GeoJSON object, which is 'MultiPolygon'. This indicates an object comprising
 *   multiple polygons.
 * @property {Array<Array<Array<[number, number]>>>} coordinates - An array where each element is an array of linear
 *   ring coordinate arrays, representing individual polygons. The first linear ring in each array describes the
 *   external boundary of the polygon, while any subsequent linear rings represent internal boundaries or holes.
 * @example
 *   // A GeoJSON representation of multiple polygons; for instance, areas with exclusions
 *   const multiPolygon: GeoJSONMultiPolygon = {
 *     type: 'MultiPolygon',
 *     coordinates: [
 *       [[[[-74.0060, 40.7128], [-74.0066, 40.7129], [-74.0070, 40.7130], [-74.0060, 40.7128]]]], // Polygon 1
 *       [[[[-0.1276, 51.5074], [-0.1277, 51.5075], [-0.1280, 51.5076], [-0.1276, 51.5074]]]]   // Polygon 2
 *     ]
 *   };
 */
export type GeoJSONMultiPolygon = {
  type: 'MultiPolygon';
  coordinates: Array<Array<Array<[number, number]>>>;
};

/**
 * GeoJSONFeature
 * @desc Defines a GeoJSON Feature object which represents a spatially bounded entity. Each Feature contains a geometry
 *   object and a set of user-defined properties.
 * @typeParam T - The type of the `properties` object, which can contain any key-value pairs, allowing for flexible
 *   data annotation of the feature.
 * @property {string} type - Specifies the object type as 'Feature'.
 * @property {GeoJSONGeometry} geometry - A GeoJSON geometry object (e.g., Point, LineString, Polygon, etc.)
 *   representing the spatial characteristics of the feature.
 * @property {T} properties - User-defined properties associated with the feature. This allows for embedding relevant
 *   metadata or attributes specific to the feature.
 * @example
 *   // A GeoJSON Feature representing a location with custom properties
 *   const feature: GeoJSONFeature<{ name: string; importance: number }> = {
 *     type: 'Feature',
 *     geometry: {
 *       type: 'Point',
 *       coordinates: [-74.0060, 40.7128]
 *     },
 *     properties: {
 *       name: 'Sample Location',
 *       importance: 5
 *     }
 *   };
 */
export interface GeoJSONFeature<T> {
  type: 'Feature';
  geometry: GeoJSONGeometry;
  properties: T;
}

/**
 * GeoJSONFeatureCollection
 * @desc Represents a collection of GeoJSON Feature objects, encapsulating multiple features within a single, unified
 *   geographical entity.
 * @typeParam T - Defines the type for the properties object of each contained feature, ensuring consistency across the
 *   collection.
 * @property {string} type - Specifies the object type as 'FeatureCollection'.
 * @property {Array<GeoJSONFeature<T>>} features - An array of GeoJSON Feature objects, each representing a distinct
 *   geographical feature.
 * @example
 *   // A GeoJSON FeatureCollection containing multiple features
 *   const featureCollection: GeoJSONFeatureCollection<{ name: string; importance: number }> = {
 *     type: 'FeatureCollection',
 *     features: [
 *       { type: 'Feature', geometry: { type: 'Point', coordinates: [-74.0060, 40.7128] }, properties: { name:
 *   'Location 1', importance: 7 } },
 *       { type: 'Feature', geometry: { type: 'Point', coordinates: [-0.1276, 51.5074] }, properties: { name: 'Location
 *   2', importance: 5 } }
 *     ]
 *   };
 */
export interface GeoJSONFeatureCollection<T> {
  type: 'FeatureCollection';
  features: Array<GeoJSONFeature<T>>;
}

/**
 * HTTPRequestBody
 * @desc Defines the structure for an HTTP request body, allowing for typed interaction with API endpoints.
 * @property {JSONObject} data - A JSONObject representing the payload of the request body, accommodating various data
 *   structures in a key-value format.
 * @example
 *   // An HTTP request body containing JSON data
 *   const requestBody: HTTPRequestBody = {
 *     data: {
 *       user: 'exampleUser',
 *       action: 'subscribe'
 *     }
 *   };
 */
export interface HTTPRequestBody {
  data: JSONObject;
}

/**
 * HTTPResponse
 * @desc Defines the structure for an HTTP response, encapsulating the response status, status text, headers, and a
 *   typed body.
 * @typeParam T - Extends JSONObject to ensure the response body conforms to a JSON structure, allowing for typed
 *   access to its contents.
 * @property {number} status - The HTTP status code of the response (e.g., 200, 404).
 * @property {string} statusText - The status message associated with the HTTP status code (e.g., 'OK', 'Not Found').
 * @property {JSONObject} headers - A JSONObject representing the headers of the response, where each key-value pair
 *   corresponds to a header name and its value.
 * @property {T} body - The body of the response, typed as T which extends JSONObject, providing structured access to
 *   the returned data.
 * @example
 *   // An example HTTP response with typed body
 *   const response: HTTPResponse<{ message: string }> = {
 *     status: 200,
 *     statusText: 'OK',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: { message: 'Request successful' }
 *   };
 */
export interface HTTPResponse<T extends JSONObject> {
  status: number;
  statusText: string;
  headers: JSONObject;
  body: T;
}
