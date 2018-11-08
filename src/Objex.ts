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
	
	private c: Core;
	
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
		Map.prototype.AsObject = function (): object {
			let ret: object = {};
			this.Each((k: string, v: any) => {
				let dot: string[] = k.split('.');
				c.SV(ret, dot, v);
			});
			return ret;
		};
		
		Object.prototype.AsMap = function <X>(): Map<string, X> {
			return c.FO(this);
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
	
	private SV(obj: any, dot: string[], value: any) {
		if (dot.length === 1) {
			obj[dot[0]] = value;
		} else {
			if (typeof obj[dot[0]] === "undefined") {
				obj[dot[0]] = {};
			}
			this.SV(obj[dot[0]], dot.Skip(1), value);
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
	
	/**
	 * Flatten object
	 * @param obj
	 * @param prepend
	 * @constructor
	 */
	private FO(obj: any, prepend: string = ''): Map<string, any> {
		let ret: Map<string, string> = new Map<string, string>();
		for (let k in obj) {
			if (obj.hasOwnProperty(k)) {
				let data: any = obj[k];
				if (this.NO(data)) {
					ret.set(prepend + k, data);
				} else {
					ret = new Map(ret.Arr().Union(this.FO(data, prepend + k + ".").Arr(), true));
				}
			}
		}
		return ret;
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