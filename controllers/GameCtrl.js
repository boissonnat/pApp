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

