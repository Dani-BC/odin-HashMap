class HashMap {
  constructor(initialCapacity = 16, initialLoadFactor = 0.8) {
    this.length = 0;
    this.loadFactor = initialLoadFactor;
    this.capacity = initialCapacity;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    console.log(bucket);
    this.length++;

    if (this.length > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.length = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  removeKey(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice([i][0]);
        this.length--;
        return true;
      }
    }
    return false;
  }

  clear() {
    this.buckets = new Array(this.initialCapacity).fill(null).map(() => []);
    this.length = 0;
    this.capacity = 16;
  }

  keys() {
    const keysArray = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (const [key, value] of bucket) {
          keysArray.push(key);
        }
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (const [key, value] of bucket) {
          valuesArray.push(value);
        }
      }
    }
    return valuesArray;
  }

  entries() {
    const entries = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (const [key, value] of bucket) {
          entries.push([key, value]);
        }
      }
    }
    return entries;
  }

  alength() {
    return this.length;
  }
}

const map = new HashMap();
console.log(map.set("aaa", "test"));
console.log(map.set("sita", "tesssssst"));
console.log(map.set("cara", "tessssssssssst"));
console.log(map.removeKey("aaa"));
console.log(map.alength());
console.log(map.has("aaa"));
console.log(map.get("sita"));
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
console.log(map.clear());
console.log(map.alength());
console.log(map.has("sita"));
console.log(map.get("sita"));
