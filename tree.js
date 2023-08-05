/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    // If empty tree
    if(!this.root) return 0;

    // Set total to root's value
    let total = this.root.val;

    function sumHelper(node){
      // Look through children of the node
      for(let child of node.children){
        // Add child's value to total
        total += child.val;
        // If child has children, recurse
        if(child.children.length > 0){
          sumHelper(child);
        }
      }
    }

    sumHelper(this.root);
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    // If empty tree
    if(!this.root) return 0;

    function isEven(inVal){
      return (inVal % 2) === 0;
    }
    // If root's val is even, evens = 1; else 0;'
    let evens = isEven(this.root.val) ? 1 : 0;

    function evensHelper(node){
      for(let child of node.children){
        // If child's value even
        if(isEven(child.val)) evens++;
        // If child has children, recurse
        if(child.children.length > 0){
          evensHelper(child);
        }
      }
    }

    evensHelper(this.root);
    return evens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    // If empty tree
    if(!this.root) return 0;

    function isGreater(inVal){
      return inVal > lowerBound;
    }

    // If root's val is > lowerBound, gtCounter 1; else 0;'
    let gtCounter = isGreater(this.root.val) ? 1 : 0;

    function gtHelper(node){
      for(let child of node.children){
        // If child's value > lowerBound
        if(isGreater(child.val)) gtCounter++;
        // If child has children, recurse
        if(child.children.length > 0){
          gtHelper(child);
        }
      }
    }

    gtHelper(this.root);
    return gtCounter;
  }
}

module.exports = { Tree, TreeNode };
