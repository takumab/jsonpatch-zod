import {applyPatch, Operation} from 'json-joy/es6/json-patch';

const doc = { foo: { bar: 123 } };

const patch: Operation[] = [
    {op: 'add', path: '/foo/baz', value: 415},
];

const result = applyPatch(doc, patch, {mutate: false});

console.log(result.doc);