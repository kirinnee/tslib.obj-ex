import {Core} from "@kirinnee/core";

interface Objex {
	/**
	 * Check if the primitives are already extended
	 */
	IsExtended: boolean;
	
	/**
	 * Extends the primitives
	 * @constructor
	 */
	ExtendPrimitives(): void;
	
	/**
	 * Assert that the primitives are already extended
	 * @constructor
	 */
	AssertExtend(): void;
}

class ObjectX implements Objex {
	
	private readonly c: Core;
	
	constructor(core: Core) {
		core.AssertExtend();
		this.c = core;
	}
	
	get IsExtended(): boolean {
		return Object.prototype.Equal != null;
	}
	
	AssertExtend(): void {
		if (!this.IsExtended) throw new Error("Objex needs to be extended");
	}
	
	public ExtendPrimitives(): void {
		let c = this;
		let C = this.c;

		Object.prototype.AsMap = function <X>(): Map<string, X> {
			return C.FlattenObject(this);
		};
		
		Object.prototype.Clone = function (): object {
			let ret: any = {};
			this.Each((k, v) => {
				if (c.NO(v)) {
					ret[k] = v;
				} else {
					ret[k] = v.Clone();
				}
			});
			return ret;
		};
		
		Object.prototype.Overwrite = function (...target: any[]): object {
			target = target.Where(e => e != null); //filter nil
			let l = target.length;
			if (l === 0) return this.Clone();
			let collect = c.OR(this, target[0]);
			
			return l === 1 ? collect : collect.Overwrite(...target.Skip(1));
		};
		
		Object.prototype.Each = function (app: (key: string, value: any) => void): object {
			for (let k in this) {
				if (this.hasOwnProperty(k)) {
					app(k, this[k])
				}
			}
			return this;
		};
		
		Object.prototype.Map = function (app: (key: string, val: any) => { key: string, value: any }): object {
			let ret: any = {};
			this.Each((k, v) => {
				let kp: { key: string, value: any } = app(k, v);
				ret[kp.key] = kp.value;
			});
			return ret;
			
		};
		
		Object.prototype.MapKey = function (app: (key: string, value: any) => any): object {
			let ret: any = {};
			this.Each((k, v) => ret[app(k, v)] = v);
			return ret;
		};
		
		Object.prototype.MapValue = function (app: (value: any, key: string) => any): object {
			let ret: any = {};
			this.Each((k, v) => ret[k] = app(v, k));
			return ret;
		};
		
		Object.prototype.Where = function (app: (key: string, value: any) => boolean): object {
			let ret: any = {};
			this.Each((k, v) => {
				if (app(k, v)) {
					ret[k] = v;
				}
			});
			return ret;
		};
		
		Object.prototype.Equal = function (target: any): boolean {
			return C.DeepEqual(this, target);
		}
		
	}
	
	/**
	 * Type Of, shortforms typeof
	 * @param obj
	 * @param type
	 * @constructor
	 */
	private TO(obj: any, type: string): boolean {
		return typeof obj === type;
	}
	
	/**
	 * Not Object Literal, check if its not an object literal
	 */
	private NO(data: any): boolean {
		return this.c.IsArray(data) || data instanceof RegExp || data instanceof Date || !this.TO(data, "object") || this.TO(data, "function");
	}
	
	private OR(from: any, to: any): object {
		to = to.Clone();
		for (let k in from) {
			if (from.hasOwnProperty(k)) {
				if (typeof to[k] === "object") {
					to[k] = this.OR(from[k], to[k]);
				} else {
					to[k] = from[k];
				}
			}
		}
		return to;
	}
	
	
}

export {Objex, ObjectX};