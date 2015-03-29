angular.module('pApp')
    .factory('Players', [function () {
        var Player = function(name, color) {
            this.name = name;
            this.color = color;
            this.numberSetsWin = 0;
            this.numberGamesWin = 0;
        };

        Player.prototype.addSetWin = function(){
            this.numberSetsWin++;
        };

        return Player;
    }]);

