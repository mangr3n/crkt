// ReScript version of our functional programming utilities
type rec curry<'a, 'b> = ('a => 'b) => 'a => 'b

let isNil = x => x === Js.Null.empty || x === Js.undefined

let isEmpty = x => {
  if isNil(x) {
    true
  } else if Js.Array2.isArray(x) {
    Js.Array2.length(x) === 0
  } else if Js.Types.test(x, Object) {
    Js.Dict.keys(x)->Js.Array2.length === 0
  } else {
    false
  }
}

let map = (fn, arr) => arr->Js.Array2.map(fn)

let values = obj => obj->Js.Dict.values

let keys = obj => obj->Js.Dict.keys

let uniq = arr => arr->Js.Array2.fromMap(Set.make)

let append = (el, arr) => arr->Js.Array2.concat([el])

let fromPairs = pairs => pairs->Js.Dict.fromArray

let reduce = (fn, initial, arr) => arr->Js.Array2.reduce(fn, initial)

let concat = (arr1, arr2) => arr1->Js.Array2.concat(arr2)

let range = (start, end) => {
  let length = end - start
  Js.Array2.makeBy(length, i => start + i)
}

let is = (type, val) => {
  if isNil(val) {
    false
  } else {
    switch type {
    | "Array" => Js.Array2.isArray(val)
    | "Object" => Js.Types.test(val, Object) && !Js.Array2.isArray(val)
    | "String" => Js.Types.test(val, String)
    | "Number" => Js.Types.test(val, Number)
    | "Boolean" => Js.Types.test(val, Boolean)
    | "Function" => Js.Types.test(val, Function)
    | _ => false
    }
  }
}

// Export to JavaScript
let fp = {
  "isNil": isNil,
  "isEmpty": isEmpty,
  "map": map,
  "values": values,
  "keys": keys,
  "uniq": uniq,
  "append": append,
  "fromPairs": fromPairs,
  "reduce": reduce,
  "concat": concat,
  "range": range,
  "is": is,
}
