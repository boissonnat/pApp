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
            var pawnPosition = angular.element(event.currentTarget);
            alert($scope.currentPlayer.name + ' click on ' + pawnPosition.attr('class'));
            nextPlayer($scope);
        };

        // Set the currentPlayer with the next player.
        var nextPlayer = function (scope) {
            if (scope.currentPlayer === scope.players['playerOne']) {
                scope.currentPlayer = scope.players['playerTwo'];
            } else {
                scope.currentPlayer = scope.players['playerOne'];
            }
        }

    }]);

