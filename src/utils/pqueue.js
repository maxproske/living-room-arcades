// Priority queue implementation by Jack Mott
// translated from Go to JavaScript
// https://www.youtube.com/watch?v=hfa1vqtZ7b0

// Return the new array everytime we push
export const pqPush = (pq, pos, priority) => {
  let newNode = { pos, priority }
  pq.push(newNode)

  // Swap 5 and 8 if [5R,2L,8R]
  let newNodeIndex = pq.length - 1 // Put at end of array to add to the heap (by shape property, add as right child)
  let [parentIndex, parent] = pqParent(pq, newNodeIndex)

  // Because we are tracking cost, priority is lowest value
  while (newNodeIndex !== 0 && newNode.priority < parent.priority) {
    pq = pqSwap(pq, newNodeIndex, parentIndex)
    newNodeIndex = parentIndex
    ;[parentIndex, parent] = pqParent(pq, newNodeIndex)
  }

  return pq
}

// Remove something from the queue
export const pqPop = (pq) => {
  let pos = pq[0].pos // Always return the root
  // Replace root with rightmost leaf node
  // up to but not rightmode leaf node. shrink slice by 1
  pq[0] = pq.pop()

  // Edge case if length of pq is 0
  if (pq.length === 0) {
    return [pq, pos] // Go style returns are sexy
  }

  // New root at 0
  let index = 0
  let node = pq[index]
  // New root may not be in the right place
  let [leftExists, leftIndex, left] = pqLeft(pq, index)
  let [rightExists, rightIndex, right] = pqRight(pq, index)

  while (
    (leftExists && node.priority > left.priority) ||
    (rightExists && node.priority > right.priority)
  ) {
    // Our node is not in the right spot yet, loop down the tree
    if (!rightExists || left.priority <= right.priority) {
      pq = pqSwap(pq, index, leftIndex)
      index = leftIndex
    } else {
      pq = pqSwap(pq, index, rightIndex)
      index = rightIndex
    }
    // Get information about new children
    ;[leftExists, leftIndex, left] = pqLeft(pq, index)
    ;[rightExists, rightIndex, right] = pqRight(pq, index)
  }

  // Once the loop exists, we know we have a valid heap again
  return [pq, pos]
}

const pqSwap = (pq, i, j) => {
  const tmp = pq[i]
  pq[i] = pq[j]
  pq[j] = tmp

  return pq
}

// Helper function to get parent node
const pqParent = (pq, i) => {
  const index = Math.floor((i - 1) / 2)
  const priorityPos = pq[index]

  return [index, priorityPos]
}

// Helper function to get left children
const pqLeft = (pq, i) => {
  const index = i * 2 + 1
  if (index < pq.length) {
    // We have a child
    return [true, index, pq[index]]
  }

  return [false, 0, {}]
}

// Helper function to get right children
const pqRight = (pq, i) => {
  const index = i * 2 + 2
  if (index < pq.length) {
    // We have a child
    return [true, index, pq[index]]
  }

  return [false, 0, {}]
}
