angular.module('pApp')
    .controller('GameCtrl', ['$scope', 'Players', function ($scope, Players) {
        // Grab players through factory
        $scope.players = Players.players;

        // Create default players
        $scope.players['playerOne'] = {name: 'PlayerOne', color: 'blue'};
        $scope.players['playerTwo'] = {name: 'PlayerTwo', color: 'red'};

        //Set playerOne as the default current player
        $scope.currentPlayer = $scope.players['playerOne'];

        // What happens when a player click on cell
        $scope.clickCell = function (event) {
            var pawnPosition = grabFirstInColumn(angular.element(event.currentTarget), $scope);
            var hasWin = checkForWin(pawnPosition, $scope);
            if (hasWin) {
                alert($scope.currentPlayer.name + ' win the game !');
            }
        };

        // Check if the current player has win the game
        var checkForWin = function (elm) {
            var parentColumnElm = elm.parent();

            if (checkVerticalWin(elm, parentColumnElm)) {
                return true;
            }

            if (checkHorizontalWin(elm, parentColumnElm)) {
                return true;
            }

            return false;
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


        // Set the background-color to the last bottom div in the clicked column
        var grabFirstInColumn = function (elm, scope) {
            var parentColElm = elm.parent();
            if (checkColumnAvailable(parentColElm)) {
                var currentElm = parentColElm.children().last();

                while (currentElm.hasClass('taken')) {
                    currentElm = currentElm.prev();
                }
                currentElm.addClass('taken ' + scope.currentPlayer.color);

                // Current player has played, switch player
                nextPlayer($scope);

                return currentElm;
            } else {
                // Full column !
                alert('Hum... Please try another column !');
            }
        };

        var checkColumnAvailable = function(column){
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
            if (scope.currentPlayer === scope.players['playerOne']) {
                scope.currentPlayer = scope.players['playerTwo'];
            } else {
                scope.currentPlayer = scope.players['playerOne'];
            }
        }

    }]);

