import {Core, Kore} from "@kirinnee/core"; 
import {Shape} from "./classLibrary/Shape";
import {Rectangle} from "./classLibrary/Rectangle";
import {Square} from "./classLibrary/Square";

let core:Core = new Kore();
core.ExtendPrimitives();



export {
	Shape, Rectangle, Square
}
