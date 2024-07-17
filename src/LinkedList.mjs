import Node from './Node.mjs';

export class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
  }

  // adds a new node containing value to the end of the list
  append(value) {
    const node = new Node(value);

    if (this.size()) {
      this.tail().nextNode = node;
    } else {
      this._head = node;
    }

    this._tail = node;
  }

  // adds a new node containing value to the start of the list
  prepend(value) {
    const node = new Node(value);
    node.nextNode = this.head();
    this._head = node;

    if (this.size() === 1) {
      this._tail = node;
    }
  }

  //  returns the total number of nodes in the list
  size() {
    let node = this.head() || null;
    let i = 0;
    while (node) {
      i++;
      node = node.nextNode;
    }
    return i;
  }

  // returns the first node in the list
  head() {
    return this._head;
  }

  // returns the last node in the list
  tail() {
    return this._tail;
  }

  // returns the node at the given index
  at(index) {
    if (index === null) return null;
    let node = this.head();
    let i = 0;
    while (i < index && i < this.size()) {
      node = node.nextNode;
      i++;
    }
    return node || null;
  }

  // removes the last element from the list
  pop() {
    const lastNodeIdx = this.size() - 1;
    const poppedNode = this.at(lastNodeIdx);
    const newTailNode = this.at(lastNodeIdx - 1);

    newTailNode.nextNode = null;
    this._tail = newTailNode;

    return poppedNode;
  }

  // returns true if the passed in value is in the list and otherwise returns false.
  contains(value) {
    let node = this.head();
    while (node) {
      if (node.value === value) return true;
      node = node.nextNode;
    }
    return false;
  }

  containsKey(key) {
    let node = this.head();
    while (node) {
      if (node.value[key]) return true;
      node = node.nextNode;
    }
    return false;
  }

  // returns the index of the node containing value, or null if not found.
  find(value) {
    let node = this.head();
    let i = 0;
    while (node) {
      if (node.value === value) return i;
      i++;
      node = node.nextNode;
    }
    return null;
  }

  findKey(key) {
    let node = this.head();
    let i = 0;
    while (node) {
      if (node.value[key]) return i;
      i++;
      node = node.nextNode;
    }
  }

  toString() {
    let printString = '';
    let node = this.head();
    while (node) {
      printString += `( ${node.value} ) -> `;
      node = node.nextNode;
    }
    printString += 'null';
    console.log(printString);
  }

  // inserts a new node with the provided value at the given index
  insertAt(value, index) {
    const lastElementIdx = this.size() - 1;
    const maxPossibleIndex = this.size();

    if (index > this.size()) {
      console.error(
        `Index out of range! Nothing inserted. Max index allowed: ${maxPossibleIndex}`,
      );
      return;
    }
    let newNode;
    if (index === this.size()) {
      newNode = this.append(value);
    } else if (index === 0) {
      newNode = this.prepend(value);
    } else {
      newNode = new Node(value);
      const precedingNode = this.at(index - 1);
      const nextNode = index === lastElementIdx ? null : this.at(index);

      precedingNode.nextNode = newNode;
      newNode.nextNode = nextNode;
    }
    return newNode;
  }

  // removes the node at the given index.
  removeAt(index) {
    if (index >= this.size() || index < 0) {
      throw new Error(
        `Index out of range! Nothing removed. Max index: ${this.size() - 1}`,
      );
    }
    const targetNode = index === this.size() - 1 ? this.pop() : this.at(index);
    const previousNode = this.at(index - 1);
    const nextNode = this.at(index + 1);

    if (index === 0) {
      this._head = nextNode;
    } else {
      previousNode.nextNode = nextNode;
    }

    return targetNode;
  }
}
