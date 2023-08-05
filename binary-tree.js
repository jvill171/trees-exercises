/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    // Empty tree
    if(!this.root) return 0;
    
    function minDepthHelper(node){
      // Leaf reached,  final +1 depth
      if(node.left === null && node.right === null) return 1;
      
      // Not a leaf, right branch continues; +1 depth
      if(node.left === null) return minDepthHelper(node.right) + 1

      // Not a leaf, left branch continues; +1 depth
      if(node.right === null) return minDepthHelper(node.left) + 1

      // Not a leaf, branch continues left & right; 
      // Take the shorter branch (left or right), then +1 depth
      return (
        Math.min(minDepthHelper(node.left),minDepthHelper(node.right)) + 1
      );
    }

    return minDepthHelper(this.root)
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    // Empty tree
    if(!this.root) return 0;
    
    function maxDepthHelper(node){
      // Leaf reached,  final +1 depth
      if(node.left === null && node.right === null) return 1;
      
      // Not a leaf, right branch continues; +1 depth
      if(node.left === null) return maxDepthHelper(node.right) + 1

      // Not a leaf, left branch continues; +1 depth
      if(node.right === null) return maxDepthHelper(node.left) + 1

      // Not a leaf, branch continues left & right; 
      // Take the longer branch (left or right), then +1 depth
      return (
        Math.max(maxDepthHelper(node.left),maxDepthHelper(node.right)) + 1
      );
    }

    return maxDepthHelper(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node){
      if(node === null) return 0;

      //  The largest value sum path from the left branch
      const sumLeft = maxSumHelper(node.left)
      //  The largest value sum path from the right branch
      const sumRight = maxSumHelper(node.right)

      // archPath is the current node + largest value sum path of left branch + largest value sum path of right branch
      // leaf1 -> up... -> current node -> down... -> leaf2
      let archPath = node.val + sumLeft + sumRight;
      // Determine if a new maxSum has been found
      result = Math.max(result, archPath)

      // Determine which path provides the largset value when including the current node
      // if current + branch would provide less value than a null branch, treat this as a null branch (value of 0)
      return Math.max(0, (sumLeft + node.val), (sumRight + node.val));
    }

    maxSumHelper(this.root)
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    // Empty tree
    if(!this.root) return null;

    // Breadth first search
    let queue = [this.root];

    // closest = smallest value greater than lowerBound
    let closest = null;

    while(queue.length){
      let currNode = queue.shift();
      let currVal = currNode.val;

      let gtLowBound = currVal > lowerBound;
      let shouldReassign = currVal < closest || closest === null;
      
      if(gtLowBound && shouldReassign) closest = currVal;

      if(currNode.left ) queue.push(currNode.left)
      if(currNode.right) queue.push(currNode.right)
    }

    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    // root has no siblings or cousins
    if(node1 === this.root || node2 === this.root) return false;
    
    let myRoot = this.root

    function getLevelAndParent(toFind){

      // Breadth first search - queue of objects with nodes, levels, parents
      let queue = [{
        node: myRoot,
        level: 0,
        parent: null
      }];

      while(queue.length){
        let currNode = queue.shift();
  
        // Node found
        if(currNode.node === toFind) return currNode;
        
        // Push the left node to queue
        if(currNode["node"].left){
          queue.push({
            node: currNode["node"].left,
            level: currNode["level"] + 1,
            parent: currNode["node"]
          })
        }
  
        // Push the right node to queue
        if(currNode["node"].right){
          queue.push({
            node: currNode["node"].right,
            level: currNode["level"] + 1,
            parent: currNode["node"]
          })
        }
      }
    }

    let n1Data = getLevelAndParent(node1)
    let n2Data = getLevelAndParent(node2)

    if(n1Data.level === n2Data.level && n1Data.parent !== n2Data.parent) return true;

    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
