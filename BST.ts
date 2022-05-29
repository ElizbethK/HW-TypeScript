class TreeNode<T>{
    public data: number;
    public left: TreeNode<T> | null;
    public right: TreeNode<T> | null;

    constructor(data: number){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree<T>{
    public head: TreeNode<T> | null;

    constructor(head?: TreeNode<T>){
        this.head = head || null;
    }

    //to search
    public search(node: TreeNode<T> | null = this.head, value:number):TreeNode<T> | null{
        let temp = node;
        if(temp === null){
            return null;
        }
        else if (temp.data === value){
            return temp;
        } else{
            if(value < temp.data){
                return this.search(temp.left, value);
            } else {
                return this.search(temp.right, value);
            }
        }
    }

    // to insert
     public insert(node: TreeNode<T> | null = this.head, value: number):TreeNode<T>{
        if(node === null){
            const root = new TreeNode(value);
            return root;
        }
        else{
            if(value < node.data){
                node.left = this.insert(node.left, value);
            } else {
                node.right = this.insert(node.right, value);
            }
            return node;
        }
    }

     //traversals
     public inOrderTraversal(root: TreeNode<T> | null = this.head):void{
        let temp = root;
        if(temp !== null) {
            this.inOrderTraversal(temp.left);
            console.log(temp.data);
            this.inOrderTraversal(temp.right);
        }
    }

    public preOrderTraversal(root: TreeNode<T> | null = this.head):void{
        let temp = root;
        if(temp !== null) {
            console.log(temp.data);
            this.inOrderTraversal(temp.left);
            this.inOrderTraversal(temp.right);
        }
    }

    public postOrderTraversal(root: TreeNode<T> | null = this.head):void{
        let temp = root;
        if(temp !== null) {
            this.inOrderTraversal(temp.left);
            this.inOrderTraversal(temp.right);
            console.log(temp.data);
        }
    }

    //to delete
    public deleteVal(node: TreeNode<T> | null = this.head, value: number):void{
        node = this.deleteRec(node, value);
    }

        /* A recursive function to
      delete an existing key in BST
     */
    public deleteRec(node: TreeNode<T> | null = this.head, value: number):TreeNode<T>{
        if(node === null){
            return node;
        }

        /* Otherwise, recur down the tree */
        if(value < node.data){
            node.left = this.deleteRec(node.left, value);
        } else if(value > node.data) {
            node.right = this.deleteRec(node.right, value);
        } 

        // if key is same as root's
        // key, then This is the
        // node to be deleted
        else {
            // node with only one child or no child
            if(node.left === null){
                return node.right;
            } else if (node.right === null){
                return node.left;
            }

             // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            node.data = this.minValue(node.right);
             // Delete the inorder successor
            node.right = this.deleteRec(node.right, node.data);
        }

        return node;

    } 
    public minValue(node: TreeNode<T> | null = this.head):number{
        let minV = node.data;
        while (node.left !== null){
            minV = node.left.data;
            node = node.left;
        } return minV;
    }

}

 /* Creating this BST:
              50
           /     \
          30      70
         /  \    /  \
        20   40  60   80 */

const rootNode = new TreeNode(50);
rootNode.left = new TreeNode(30);
rootNode.right = new TreeNode(70);

const BSTree = new BinarySearchTree(rootNode);

BSTree.insert(BSTree.head, 20);
BSTree.insert(BSTree.head, 40);
BSTree.insert(BSTree.head, 60);
BSTree.insert(BSTree.head, 80);

console.log("Pre-order traversal: ");
BSTree.preOrderTraversal();

console.log("In-order traversal: ");
BSTree.inOrderTraversal();

console.log("Post-order traversal: ");
BSTree.postOrderTraversal();

console.log("The desired element: ");
console.log(BSTree.search(BSTree.head, 60));

BSTree.deleteVal(BSTree.head, 60);
console.log("This element was deleted. New in-order traversal: ");
BSTree.inOrderTraversal();




