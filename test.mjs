#!/usr/bin/env node

import HashMap from './HashMap.mjs';

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');

console.log('length: ', test.length());
console.log('capacity: ', test.capacity);
test.clear();

test.set('grape', 'purple');
test.set('kite', 'pink');
test.set('grape', 'budou');

console.log('length: ', test.length());
console.log('capacity: ', test.capacity);

console.log('keys: ', test.keys());
console.log('values', test.values());
console.log('entries: ', test.entries());
console.log('capacity: ', test.capacity);
