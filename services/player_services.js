angular.module('pApp')
    .factory('Players', [function () {
        var Player = function(name, color) {
            this.name = name;
            this.color = color;
        };

        return Player;
    }]);

