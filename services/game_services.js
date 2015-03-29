angular.module('pApp')
    .factory('Games', [function () {

        var Game = function(playerOne, playerTwo, numberSets) {
            this.playerOne = playerOne;
            this.playerTwo = playerTwo;
            this.numberSets = numberSets;
            this.isStarted = true;
            this.isFinnished = false;
            this.currentSet = 1;
        };

        Game.prototype.endSet = function(player){
            player.addSetWin();
            if (this.currentSet === this.numberSets) {
                this.isFinnished = true
                this.getWinner().numberGamesWin++;
            }else {
                this.currentSet++;
            }

        };

        Game.prototype.restart = function(){
            this.playerOne.numberSetsWin = 0;
            this.playerTwo.numberSetsWin = 0;
            this.isFinnished = false;
            this.currentSet  = 1;
        };

        Game.prototype.getWinner = function(){
            if (this.playerOne.numberSetsWin > this.playerTwo.numberSetsWin) {
                return this.playerOne;
            } else if (this.playerOne.numberSetsWin === this.playerTwo.numberSetsWin){
                return null;
            } else {
                return this.playerTwo;
            }
        }

        return Game;
    }]);

