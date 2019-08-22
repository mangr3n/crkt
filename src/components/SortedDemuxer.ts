import {Chain} from "./Chain";
import {Mapper} from "./Mapper";
import {Serializer} from "./Serializer";
import {Demuxer} from "./Demuxer";


export const SortedDemuxer = (...outputs) => Chain(
  Mapper(obj => outputs.map(k => [k, obj[k]])),
  Serializer(),
  Mapper(([key,value]) => ({[key]:value})),
  Demuxer(...outputs)
);
