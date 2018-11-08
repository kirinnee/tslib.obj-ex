import {should} from 'chai';
import {ObjectX, Objex} from "../../src";
import {Core, Kore} from "@kirinnee/core";

should();
let core: Core = new Kore();
core.ExtendPrimitives();
let objex: Objex = new ObjectX(core);

describe("index", () => {
	
	describe("Assert Extend and Check Extended", () => {
		
		it("should throw errror and return false", () => {
			
			objex.IsExtended.should.be.false;
			(() => objex.AssertExtend()).should.throw("Objex needs to be extended");
			
		});
		
		it("should not throw error and return true", () => {
			
			objex.ExtendPrimitives();
			objex.AssertExtend();
			objex.IsExtended.should.be.true;
		});
	});
	
	describe("AsObject", () => {
		it("should convert dot-notation to object", () => {
			let testSubj: Map<string, number[]> = new Map([
				["a.b", [2, 3]],
				["a.c", [3, 4]],
				["a.d.one", [1, 2, 3]],
				["a.d.two", [3, 4, 5]],
				["b", [-1, -2]]
			]);
			let expected: object = {
				a: {
					b: [2, 3],
					c: [3, 4],
					d: {
						one: [1, 2, 3],
						two: [3, 4, 5]
					}
				},
				b: [-1, -2]
			};
			testSubj.AsObject().should.deep.equal(expected);
		});
	});
	
	describe("AsMap", () => {
		it("should convert to map using dot notation", () => {
			let expected: Map<string, number[]> = new Map([
				["a.b", [2, 3]],
				["a.c", [3, 4]],
				["a.d.one", [1, 2, 3]],
				["a.d.two", [3, 4, 5]],
				["b", [-1, -2]]
			]);
			let testSubj: object = {
				a: {
					b: [2, 3],
					c: [3, 4],
					d: {
						one: [1, 2, 3],
						two: [3, 4, 5]
					}
				},
				b: [-1, -2]
			};
			testSubj.AsMap().Arr().should.deep.equal(expected.Arr());
		});
	});
	
	describe("Overwrite", () => {
		
		it("should return clone when no variables are given", () => {
			let x: object = {
				a: "A",
				b: {
					c: "C",
					d: "D"
				}
			};
			let y: object = {
				a: "A",
				b: {
					c: "C",
					d: "D"
				}
			};
			let o = x.Overwrite();
			o.should.deep.equal(y);
			o.should.not.equal(x);
			
		});
		it("should join objects together", () => {
			let first: object = {
				a: "A",
				b: {
					c: "C",
					d: "D"
				}
			};
			
			let second: object = {
				b: {
					e: "E"
				},
				e: "E"
			};
			
			let third: object = {
				f: "F",
				a: "C"
			};
			
			let expected: object = {
				a: "A",
				b: {
					c: "C",
					d: "D",
					e: "E"
				},
				e: "E",
				f: "F"
			};
			
			first.Overwrite(second, third).should.deep.equal(expected);
			
		});
	});
	
	describe("Clone", () => {
		it("should clone objects", () => {
			let testSubj: any = {
				a: "A",
				b: {
					c: "C",
					d: ["d", "e", "f"]
				}
			};
			let expected: any = {
				a: "A",
				b: {
					c: "C",
					d: ["d", "e", "f"]
				}
			};
			
			testSubj.Clone().should.deep.equal(expected);
			testSubj.Clone().should.not.equal(testSubj);
			(testSubj.Clone() as any).b.should.not.equal(testSubj.b);
			(testSubj.Clone() as any).b.should.deep.equal(expected.b);
			
			
		});
	});
	
	describe("Each", () => {
		it("should iterate the object like a dictionary", () => {
			let testSubj: object = {
				a: {val: 0},
				b: {val: 1},
				c: {val: 2},
				d: {val: 3}
			};
			let expected: object = {
				a: {val: 1},
				b: {val: 2},
				c: {val: 3},
				d: {val: 4}
			};
			testSubj.Each((k, v) => v.val = v.val + 1).should.deep.equal(expected);
		});
	});
	
	describe("Map", () => {
		it("should map the object to new key pair", () => {
			let testSubj: object = {
				a: 0,
				b: 1,
				c: 2,
				d: 3
			};
			let expected: object = {
				aa: 1,
				bb: 2,
				cc: 3,
				dd: 4
			};
			testSubj.Map((k, v) => {return {key: k.repeat(2), value: v + 1}}).should.deep.equal(expected);
		});
	});
	
	describe("MapKey", () => {
		it("should map key to new key", () => {
			let testSubj: object = {
				a: {val: 0},
				b: {val: 1},
				c: {val: 2},
				d: {val: 3}
			};
			let expected: object = {
				aa: {val: 0},
				bb: {val: 1},
				cc: {val: 2},
				dd: {val: 3}
			};
			testSubj.MapKey(k => k.repeat(2)).should.deep.equal(expected);
		});
	});
	
	describe("MapValue", () => {
		it("should map values to new value", () => {
			let testSubj: object = {
				a: 0,
				b: 1,
				c: 2,
				d: 3
			};
			let expected: object = {
				a: 1,
				b: 2,
				c: 3,
				d: 4
			};
			testSubj.MapValue(v => v + 1).should.deep.equal(expected);
		});
	});
	
	describe("Where", () => {
		it("should filter base on predicate", () => {
			let testSubj: object = {
				a: {val: 0},
				b: {val: 1},
				c: {val: 2},
				d: {val: 3}
			};
			let expected: object = {
				a: {val: 0},
				c: {val: 2},
			};
			testSubj.Where((k, v) => v.val % 2 === 0).should.deep.equal(expected);
		});
	});
	
	describe("Equal", () => {
		it("checks structural equality", () => {
			let x: object = {a: "a", b: [1, 2, 3], c: {d: "d", e: "e"}};
			let y: object = {a: "a", b: [1, 2, 3], c: {d: "d", e: "e"}};
			x.Equal(y).should.be.true;
		})
		
	});
	
});