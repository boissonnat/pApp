angular.module('pApp')
    .controller('GameCtrl', ['$scope', 'Players', 'Games', function ($scope, Players, Games) {

        // Create default players
        $scope.playerOne = new Players('PlayerOne', 'blue');
        $scope.playerTwo = new Players('PlayerTwo', 'red');

        //Set playerOne as the default current player
        $scope.currentPlayer = $scope.playerOne;

        // Create the game
        $scope.game = new Games($scope.playerOne, $scope.playerTwo, 1);

        // What happens when a player click on cell
        $scope.clickCell = function (event) {
            var clickedElm = angular.element(event.currentTarget);
            if (checkColumnAvailable(clickedElm.parent())) {
                var pawnPosition = grabFirstInColumn(clickedElm, $scope);
                var hasWin = checkForWin(pawnPosition, $scope);
                if (hasWin) {
                    alert($scope.currentPlayer.name + ' wins the set !');
                    $scope.game.endSet($scope.currentPlayer);
                    if (!$scope.game.isFinnished){
                        // Set ended but not yet the game, clean the grid
                        angular.forEach($(".grid-row"), function (rowElm) {
                            // Iterate over each line and count div with the currentClass
                            angular.forEach(angular.element(rowElm).children(), function (cellElm) {
                                angular.element(cellElm).removeClass('taken red blue');
                            })
                        })
                    }
                } else {
                    // Current player has played but not won, switch player
                    nextPlayer($scope);
                }
            } else {
                // Full column !
                alert('Hum... Please try another column !');
            }
        };

        $scope.getWinner = function() {
            return $scope.game.getWinner();
        }

        // Check if the current player has win the game
        var checkForWin = function (elm) {
            var parentColumnElm = elm.parent();

            if (checkVerticalWin(elm, parentColumnElm)) {
                return true;
            }

            if (checkHorizontalWin(elm, parentColumnElm)) {
                return true;
            }

            if (checkTopLeftToBottomRightWin(elm, parentColumnElm)) {
                return true;
            }

            return !!checkTopRightToBottomLeftWin(elm, parentColumnElm);

        };

        // Check if 4 pawn are aligned vertically
        var checkVerticalWin = function (elm, parentColumnElm) {
            var childCount = parentColumnElm.children().length;
            var lastElm = parentColumnElm.children().last();
            var currentClass = lastElm.hasClass('blue') ? 'blue' : 'red';
            var count = 0;
            var index = 0;
            while ((count < 4 ) && (index < childCount)) {
                if (lastElm.hasClass(currentClass)) {
                    count++;
                } else {
                    count = 1;
                    currentClass = currentClass === 'blue' ? 'red' : 'blue';
                }
                lastElm = lastElm.prev();
                index++;
            }
            return count === 4
        };

        // Check if 4 pawn are aligned horizontally
        var checkHorizontalWin = function (elm, parentColumnElm) {
            // We need the index of the elm in the column
            var childIndex = parentColumnElm.children().index(elm);
            var currentClass = elm.hasClass('blue') ? 'blue' : 'red';
            var count = 0;
            angular.forEach($(".grid-row"), function (rowElm) {
                // Iterate over each line and count div with the currentClass
                rowElm = angular.element(rowElm).children().eq(childIndex);
                if (rowElm.hasClass(currentClass)) {
                    count++;
                } else if (count < 4) {
                    count = 0;
                }

            });
            return count === 4
        };

        //Check if 4 pawns are aligned in the top-left to bottom-right diagonal
        var checkTopLeftToBottomRightWin = function (elm, parentColumnElm) {
            var gridElm = parentColumnElm.parent();
            // We need the row index in order to iterate over rows (from top to bottom)
            var rowIndex = gridElm.children().index(parentColumnElm);
            //We need the clickedElm index in order to iterate over position (from left to right)
            var childIndex = parentColumnElm.children().index(elm);
            var currentClass = elm.hasClass('blue') ? 'blue' : 'red';
            var currentElm = elm;
            var count = 0;

            var currentRowIndex = rowIndex;
            var currentChildIndex = childIndex;
            var next = true;

            //Navigate top-left to bottom-right
            while ((next) && (currentRowIndex > 0) && (currentChildIndex > 0)) {

                if (currentElm.hasClass(currentClass)) {
                    // One found ! Keep going
                    count++;
                    currentRowIndex++;
                    currentChildIndex++;
                    currentElm = gridElm.children().eq(currentRowIndex).children().eq(currentChildIndex);
                } else {
                    next = false;
                    if (count < 4) {
                        // Start over
                        count = 0;
                    }

                }
            }
            return count === 4;
        };

        //Check if 4 pawns are aligned in the top-left to bottom-right diagonal
        //Absolutely not DRY... Passing a callback would be better. Next time.
        var checkTopRightToBottomLeftWin = function (elm, parentColumnElm) {
            var gridElm = parentColumnElm.parent();
            // We need the row index in order to iterate over rows (from top to bottom)
            var rowIndex = gridElm.children().index(parentColumnElm);
            //We need the clickedElm index in order to iterate over position (from right to left)
            var childIndex = parentColumnElm.children().index(elm);
            var currentClass = elm.hasClass('blue') ? 'blue' : 'red';
            var currentElm = elm;
            var count = 0;

            var currentRowIndex = rowIndex;
            var currentChildIndex = childIndex;

            var next = true;
            //Navigate top-right to bottom-left
            while ((next) && (currentRowIndex > 0) && (currentChildIndex > 0)) {

                if (currentElm.hasClass(currentClass)) {
                    count++;
                    currentRowIndex--;
                    currentChildIndex++;
                    currentElm = gridElm.children().eq(currentRowIndex).children().eq(currentChildIndex);
                } else {
                    next = false;
                    if (count < 4) {
                        count = 0;
                    }
                }
            }
            return count === 4;
        };

        // Set the background-color to the last bottom div in the clicked column
        var grabFirstInColumn = function (elm, scope) {
            var parentColElm = elm.parent();
            var currentElm = parentColElm.children().last();

            while (currentElm.hasClass('taken')) {
                currentElm = currentElm.prev();
            }
            currentElm.addClass('taken ' + scope.currentPlayer.color);
            return currentElm;
        };

        var checkColumnAvailable = function (column) {
            var isFull = true;
            angular.forEach(column.children(), function (childElm) {
                if (!angular.element(childElm).hasClass('taken')) {
                    isFull = false
                }
            });

            return !isFull;
        }

        // Set the currentPlayer with the next player.
        var nextPlayer = function (scope) {
            if (scope.currentPlayer === scope.playerOne) {
                scope.currentPlayer = scope.playerTwo;
            } else {
                scope.currentPlayer = scope.playerOne;
            }
        }

    }]);

