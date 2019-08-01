import {Serializer} from "./Serializer";
import {Mapper} from "./Mapper";
import {Chain} from "./Chain";


const toArray = (v) => [].concat(v);
export const ArraySerializer = () => Chain(Mapper(toArray),Serializer());
