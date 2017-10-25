// CODING TEST INSTRUCTIONS
//=========================================================//
// * n children stand around a circle.
// * Starting with a given child and working clockwise, each child gets a
//     sequential number, which we will refer to as it’s id.
// * Then starting with the first child, they count out from 1 until k. The
//     k’th child is now out and leaves the circle. The count starts again
//     with the child immediately next to the eliminated one.
// * Children are so removed from the circle one by one. The winner is the
//     child left standing last.
//=========================================================//


/*
 * circleGameHandler class.
 *
 * Wrapping all the functions related to the game in a javascript class,
 * acting like a namespace and organising the code.
 */
function circleGameHandler(n, k)
{
    // When using JS classes the 'this' referer may change according to the context.
    // Storing it in a var makes sure the current instance of the class always has access to the proper 'this'.
    // Particularly useful with settimeout, setInterval and jQuery for instance.
    var self = this;

    self.players           = [];// Keep track of which child is still in the game at each moment.
    self.winner            = null;// The last child standing in game. Init the var which may be useful in a scoreboard or whatever.
    self.counter           = 1;// Keep track of the counter at each moment.
    self.currentChildIndex = 0;// The index start of array of players.
                               // (Needed when a child gets out of the game to start from the next one)
    self.removalHistory    = [];// Keep track of the order in which children are out of the game (for a scoreboard for instance).


    /**
     * This is the game loop to crawl the array of children and remove 1 child every "k".
     *
     * @access private. (using 'var' instead of 'this.' or 'self.' makes this method uncallable from outside the class)
     */
    var loop = function()
    {
        // A flag to determine when to reset the loop start.
        // For readability a flag is better than using "self.counter = 1" bellow as a flag.
        var removedChild = false;

        for (var i = self.currentChildIndex, l = self.players.length; i < l; i++)
        {
            self.currentChildIndex = i;

            // Remove a child from game when counter reaches k.
            if (self.counter === k)
            {
                console.log("Child " + self.players[i] + " is out.");
                self.removalHistory.push(self.players[i]);// Keep in history.

                self.players.splice(i, 1);// Reduce the array of players.
                self.counter = 1;// Reset the counter.
                removedChild = true;

                break;// escape the loop.
            }

            self.counter++;// Increment counter until it reaches 'k'.
        }

        // If reaching end of array before removing a child start again the loop from array position 0.
        if (!removedChild) self.currentChildIndex = 0;
    };


    /**
     * Start the game and call the loop method until there is only one player left.
     * Then call the endGame() method.
     *
     * @access public.
     */
    self.startGame = function()
    {
        // We want to stop the loop when exactly 1 child is left in game.
        while (self.players.length > 1)
        {
            loop();
        }

        endGame();
    };


    /**
     * End the game and log the winner in console.
     *
     * @access private.
     */
    var endGame = function()
    {
        self.winner = self.players[0];
        console.log("Child " + self.winner + " is the winner!");
        console.log("The children got out of the game in the following order: " + self.removalHistory.join(", ")
                    + ".\nThat was a good game wasn't it?");
    };


    /**
     * Init of the class, to prepare the needed vars.
     * This function is a Self Invoked Function.
     *
     * @access private.
     */
    var init = function()
    {
        for (var i = 1; i <= n; i++)
        {
            self.players.push(i);
            // Keep track of all the children who are still in the game.
        }

        // console.log(self.players);
    }();
}



// TESTING THE GAME!
//=========================================================//
var n   = 12,// The number of children.
    k   = 8, // When to break the loop and get a child out.
    cgh = new circleGameHandler(n, k);

cgh.startGame();
//=========================================================//
