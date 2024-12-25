import {
  Identity,
  Mapper,
  Component,
  Chain,
  Demuxer,
  Checker,
  Counter,
  Delayer,
  Guard,
  Serializer,
  UniqueFilter, Iterator, Hub, Memorizer, Muxer, Filter, ArraySerializer
} from "../src";
import {isObject} from "../src/util/funcs";
import { describe, it, expect, vi, beforeEach } from 'vitest';

const INITIAL_DELAY = 100;
const DEFAULT_DELAY=20;

const SINGLE_PORT = 1;
const MULTI_PORT = 2;
const DEFAULT_PORT = 3;

const PlusOne = () => Mapper(v => v + 1);
const TimesTwo = () => Mapper( v=> v*2);

const sendValues = ({comp,strategy=null,port=null,values=null}) => {
  if (strategy == null) {
    strategy = port == null ? DEFAULT_PORT : SINGLE_PORT;
  }

  if (strategy == DEFAULT_PORT) {
    values.forEach(v => {
      comp.send(v);
    });
  } else if( strategy == SINGLE_PORT) {
    values.forEach(v => {
      comp.send(port,v);
    });
  } else if (strategy == MULTI_PORT) {
    values.forEach(v => {
      for(let _port in v) {
        comp.send(_port,v[_port]);
      }
    });
  }
};

const checkHandler = (handler,outputs,done,delay = DEFAULT_DELAY) => {
  const expected = outputs.map((v) => [v]);
  setTimeout(() => {
    expect(handler.mock.calls).toEqual(expected);
    done();
  },delay);
};

export const testComponent = ({factory,inputs,outputs,delay=DEFAULT_DELAY,inputStrategy=null}) => {
  return (done) => {
    if (!isObject(outputs)) {
      const comp = factory();
      const handler = vi.fn();
      handler.mockClear();
      comp.on(handler);
      sendValues({comp, values:inputs,strategy:inputStrategy});
      checkHandler(handler, outputs, done, delay);
    } else {
      for(let outputPort in outputs) {
        if (outputPort == "default") testComponent({factory,inputs,outputs:outputs['default'],delay});
        else {
          const comp = factory();
          const handler = vi.fn();
          handler.mockClear();
          comp.on(outputPort, handler);
          sendValues({comp, values:inputs,strategy:inputStrategy});
          checkHandler(handler, outputs[outputPort], done);
        }
      }
    }
  };
};

export const testSimpleComponent = (factory,inputs,outputs,delay=DEFAULT_DELAY) => {
  return testComponent({factory,inputs,outputs,delay,inputStrategy:null});
};

describe('Identity', () => {
  it('should return each value sent in', () => {
    return testSimpleComponent(Identity,[1,2],[1,2],INITIAL_DELAY);
  });
});

describe('A Graph Component', () => {
  const AGraphComponent = () => Component({
    components: {
      'plusOne': Mapper(v => v + 1),
      'timesTwo': Mapper(v => v * 2)
    },
    connections: [
      ['in','plusOne'],
      ['plusOne','timesTwo'],
      ['timesTwo','out']
    ]
  });

  it('should take a graph and execute that produce the outputs described by the Graph', () => {
    return testSimpleComponent(AGraphComponent,[1,2,3,4],[4,6,8,10]);
  });
});

describe('Mapper', () => {
  it('should emit the application of the function to the an input', () => {
    return testSimpleComponent(()=>Mapper(v => v + 1),[1,2,3,4],[2,3,4,5]);
  });
});

describe('Chain', () => {
  it('should pass the results through a pipeline', () => {
    return testSimpleComponent(() => Chain(PlusOne(),TimesTwo()),[1,2,3,4],[4,6,8,10]);
  });
});

// Demuxer Tests

const demuxerInput = [{a:1},{b:2},{a:3,b:4}];
describe('Demuxer', () => {
  it('should emit keyed values on named output ports, and the input on the default output port', () => {
    return testSimpleComponent(
      () => Demuxer('a','b'),
      demuxerInput,
      {
        a: [1,3],
        b: [2,4],
        default: demuxerInput
      }
    );
  });
});

// Checker Tests
const isEven = (v) => v % 2 === 0;
const EvenChecker = () => Checker(isEven);
describe('Checker', () => {
  it('should emit failing values on port "false" and passing values on port "true"', () => {
    return testSimpleComponent(
      EvenChecker,
      [1,2,3,4],
      {'true':[2,4],'false':[1,3]}
    );
  });
});

// Counter Tests
describe('Counter', () => {
  it('should emit an incrementing value', () => {
    return testSimpleComponent(
      Counter,
      [1,1,1,1],
      [1,2,3,4]
    );
  });
});

// Delayer Tests
describe('Delayer', () => {
  it('should not emit a value before it\'s delay', () => {
    return testSimpleComponent(
      () => Delayer(20),
      [1],
      [],
      10
    );
  });

  it('should have emitted a value after the delay period has elapsed', () => {
    return testSimpleComponent(
      () => Delayer(20),
      [1],
      [1],
      30
    );
  });
});

// Guard Tests
const TestGuard = () => Guard({
  lessThan5: (v) => v < 5,
  greaterThan20: (v) => v > 20,
  else: 'otherwise',
  another: 'otherwise'
});
const guardInput = [1,21,6,12,25,3];
const lessThan5Output = [1,3];
const greaterThan20Output = [21,25];
const elseOutput = [6,12];
const anotherOutput = [6,12];
describe('Guard', () => {
  it('should emit values to ports for named conditions, or else...', () => {
    return testComponent({
      factory: TestGuard,
      inputs: guardInput,
      outputs: {
        lessThan5:lessThan5Output,
        greaterThan20: greaterThan20Output,
        else: elseOutput,
        another: anotherOutput
      }
    });
  });
});

// Serializaer Tests
describe('Serializer', () => {
  it('should serialize an iterable', () => {
    return testSimpleComponent(
      Serializer,
      [[1,2,3],'abc',['abc','def']],
      [1,2,3,'a','b','c','abc','def']
    );
  });
});

// UniqueFilter Tests
describe('UniqueFilter', () => {
  it('should eliminate sequential duplicates from the input', () => {
    return testSimpleComponent(
      UniqueFilter,
      [1,1,2,3,3,4,1,4,4],
      [1,2,3,4,1,4]
    );
  });
});

// Iterator tests
describe('Iterator', () => {
  it('should emit elements of an iterable and then cycles back to the start', () => {
    return testSimpleComponent(
      () => Iterator('test',{cyclic:true}),
      [1,1,1,1,1,1],
      ['t','e','s','t','t','e'],
      200
    );
  });

  it('should stop emitting when it reaches the end', () => {
    return testSimpleComponent(
      () => Iterator('test'),
      [1,1,1,1,1,1],
      ['t','e','s','t']
    );
  });
});

// Hub Tests
describe('Hub', () => {
  it('should emit an object with the value keyed by the input port', () => {
    return testComponent({
      factory: () => Hub('a','b','c'),
      inputs: [{a:1},{b:2},{c:3}],
      outputs: [{a:1},{b:2},{c:3}],
      inputStrategy:MULTI_PORT
    });
  });
});

// Memorizer Tests
describe('Memorizer', () => {
  it('should have a memory and a value', () => {
    return testComponent({
      factory: Memorizer,
      inputs: [{memory:2},{value:1},{memory:4},{value:3}],
      outputs: [{memory:2,value:1},{memory:4, value:3}],
      inputStrategy:MULTI_PORT
    });
  });

  it('should only update memory once a value is received', () => {
    return testComponent({
      factory:Memorizer,
      inputs:[{memory:1},{memory:2},{memory:3},{value:4},{value:5}],
      outputs:[{memory:1,value:4},{memory:2,value:5}],
      inputStrategy: MULTI_PORT
    });
  });

  it('should only emit when it has a pair, it emits the pair, and waits for a new pair.', () => {
    return testComponent({
      factory:() => Memorizer(0),
      inputs: [{value:1},{value:2},{memory:3},{memory:4},{memory:5},{value:6}],
      outputs:[{value:1,memory:0},{value:2,memory:3},{memory:4,value:6}],
      inputStrategy: MULTI_PORT
    });
  });
});

// Muxer Tests
describe('Muxer', () => {
  it('should emit a value when it has received all of it\'s inputs and not before.', () => {
    return testComponent({
      factory: () => Muxer('a','b','c'),
      inputs: [{a:1},{b:2},{c:3}],
      outputs: [{a:1,b:2,c:3}],
      inputStrategy: MULTI_PORT
    });
  });

  it('should replace an existing value with a newly supplied value.', () => {
    return testComponent({
      factory: () => Muxer('a','b','c'),
      inputs: [{a:1},{b:2},{c:3},{b:10}],
      outputs: [{a:1,b:2,c:3},{a:1,b:10,c:3}],
      inputStrategy: MULTI_PORT
    });
  });
});

// Filter Tests
describe('Filter', () => {
  it('should emit values that produce true when passed through the supplied function', () => {
    return testComponent({
      factory:() => Filter(isEven),
      inputs: [1,2,3,4],
      outputs: [2,4]
    });
  });
});

// ArraySerializer Tests
describe('ArraySerializer', () => {
  it('should emit a value if it isn\'t an Array, and the values of an Array if it is an Array', () => {
    return testComponent({
      factory: ArraySerializer,
      inputs: [1,[1,2]],
      outputs: [1,1,2]
    });
  });
});

describe('Identity', () => {
  it('should pass through null unphased.', () => {
    return testSimpleComponent(() => Identity("NullTest", false),[null,null],[null,null]);
  });
});
