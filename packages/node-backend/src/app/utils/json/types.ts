/** Represents a JSON object */
export interface JsonObject {
  [key: string]: Json;
}

/** Represents a value in a JSON object */
export type Json = null | string | number | boolean | Json[] | JsonObject;
