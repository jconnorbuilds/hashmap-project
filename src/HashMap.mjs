import LinkedList from './LinkedList.mjs';

export default class HashMap {
  constructor() {
    this.initCapacity = 16;
    this.capacity = this.initCapacity;
    this.loadFactor = 0.75;
    this.buckets = Array(this.capacity)
      .fill()
      .map(() => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    hashCode = hashCode % 16;
    return hashCode;
  }

  set(key, value) {
    const bucket = this._getBucket(key);

    if (bucket.containsKey(key)) {
      bucket.at(bucket.findKey(key)).value = { [key]: value };
    } else {
      if (this.length() + 1 > this.capacity * this.loadFactor) {
        this._growBuckets();
      }
      bucket.append({ [key]: value });
    }
  }

  get(key) {
    const bucket = this._getBucket(key);
    return bucket.at(bucket.findKey(key));
  }

  has(key) {
    const bucket = this._getBucket(key);
    return bucket.containsKey(key);
  }

  remove(key) {
    const bucket = this._getBucket(key);
    if (bucket.containsKey(key)) {
      bucket.removeAt(bucket.findKey(key));
      return true;
    }
    return false;
  }

  length() {
    return this.buckets.map((bucket) => bucket.size()).reduce((acc, curr) => acc + curr);
  }

  clear() {
    this.buckets = Array(this.initCapacity)
      .fill()
      .map(() => new LinkedList());

    this.capacity = this.initCapacity;
  }

  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      let node = bucket.head();
      while (node) {
        keys = keys.concat(Object.keys(node.value));
        node = node.nextNode;
      }
    });
    return keys;
  }

  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      let node = bucket.head();
      while (node) {
        values = values.concat(Object.values(node.value));
        node = node.nextNode;
      }
    });
    return values;
  }

  entries() {
    let entries = [];
    this.buckets.forEach((bucket) => {
      let node = bucket.head();
      while (node) {
        entries = entries.concat(Object.entries(node.value));
        node = node.nextNode;
      }
    });
    return entries;
  }

  _getBucket(key) {
    const keyHash = this.hash(key);
    return this.buckets[keyHash];
  }

  _growBuckets() {
    this.buckets = this.buckets.concat(
      Array(this.capacity)
        .fill()
        .map(() => new LinkedList()),
    );
    this.capacity *= 2;
  }
}
