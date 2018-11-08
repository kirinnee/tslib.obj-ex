import {ObjectX, Objex} from "./Objex";

declare global {
	
	interface Object {
		
		/**
		 * Clones the object literals.
		 * Nested object literals will be cloned, but
		 * Array, Dates and Regex will remain as pointers
		 * @constructor
		 */
		Clone(): object;
		
		/**
		 * Converts the object into a key value map, with the key as dot notation
		 * Example - a:{b:"B"} => a.b: "B"
		 * @constructor
		 */
		AsMap<X>(): Map<string, X>;
		
		/**
		 * Merges values of the 2 object nested-ly.
		 * This object will overwrite the target object if both has same key
		 * Immutable operation, returns a new instance.
		 * @param target - target object to merge with
		 * @constructor
		 */
		Overwrite(...target: any[]): object;
		
		/**
		 * Iterate the object, allowing side-effect mutation.
		 * Returns the original object
		 * @param application
		 * @constructor
		 */
		Each(application: (key: string, value: any) => void): object;
		
		/**
		 * Maps each keypair value of the object to a new object
		 * Immutable operation, returns a new instance.
		 * @param application transformation function
		 * @constructor
		 */
		Map(application: (key: string, value: any) => { key: string, value: any }): object;
		
		/**
		 * Maps each value of object to a new object
		 * Immutable operation, returns a new instance.
		 * @param application
		 * @constructor
		 */
		MapValue(application: (value: any, key: string) => any): object;
		
		/**
		 * Maps each key of object to a new object
		 * Immutable operation, returns a new instance.
		 * @param application
		 * @constructor
		 */
		MapKey(application: (key: string, value: any) => any): object;
		
		/**
		 * Filters the object key-pair values base on predicate
		 * Immutable operation, returns a new instance.
		 * @param predicate condition function
		 * @constructor
		 */
		Where(predicate: (key: string, value: any) => boolean): object;
		
		/**
		 * Check if two objects are structurally equal
		 * @param target
		 * @constructor
		 */
		Equal(target: any): boolean;
		
	}
}

export {Objex, ObjectX};

