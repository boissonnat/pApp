angular.module('pApp')
    .controller('GameCtrl', ['$scope', 'Players', function ($scope, Players) {
        // Grab players through factory
        $scope.players = Players.players;

        // Create default players
        $scope.players['playerOne'] = {name: 'PlayerOne', color: 'blue'};
        $scope.players['playerTwo'] = {name: 'PlayerTwo', color: 'red'};

        //Set playerOne as the default current player
        $scope.currentPlayer = $scope.players['playerOne'];
    }]);