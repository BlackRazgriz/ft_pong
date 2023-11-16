// Global variables
var DIRECTION = {
    IDLE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
};

var rounds = [5,5,3,3,2];
var colors = ['#363062','#435585','#818FB4','F5E8C7', '#0766AD'];

// ball object
var Ball = {
    new: function (incrementSpeed) {
        return {
            width: 18, 
            height: 18,
            x: (this.canvas.width/2) - 9, 
            y: (this.canvas.height/2) - 9,
            moveX: DIRECTION.IDLE,
            moveY: DIRECTION.IDLE,
            speed: incrementSpeed || 7
        };
    }
}

//this.ai object 
varthis.ai = {
    new: function (side) {
        return {
            width: 18, 
            height: 180,
            x: side === 'left' ? 150 : this.canvas.width -150,
            y: (this.canvas.height/2) - 35,
            score: 0,
            move: DIRECTION.IDLE,
            speed: 8
        };
    }
};
//game
var Game = {
    initialize: function (){
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        
        this.canvas.width = 1400;
        this.canvas.height = 1000;

        this.canvas.style.width = (this.canvas.width / 2) + 'px';
        this.canvas.style.height = (this.canvas.height /2 ) + 'px';

        this.player =this.ai.new.call(this, 'left');
        this.ai =this.ai.new.call(this, 'right');
        this.Ball = Ball.new.call(this);

        this.ai.speed = 5;
        this.running = this.over = false;
        this.turn = this.ai;
        this.timer = this.rounds = 0;
        this.color = '#8c52ff';

        Pong.menu();
        Pong.listen();
    }
};

endGameMenu = function (text) {
    // change the canvas font size and color
    Pong.context.font = '45px Courier New';
    Pong.context.fillStyle = this.color;

    //draw the rectangle behind the 'Press any key to begin ' text 
    Pong.context.fillRect(
        Pong.canvas.width / 2 - 350,
        Pong.canvas.height / 2 - 48, 
        700, 
        100
    );

    // change the canvas color
    Pong.context.fillStyle = '#ffffff';

    // Draw the endgame menu test ('Game Over' and 'Winner');
    Pong.context.fillText(text,
        Pong.canvas.width /2,
        Pong.canvas.height /2 +15
    );

    setTimeout(function() {
        Pong = Object.assign({}, Game);
        Pong.initialize();
    }, 3000 );
},

menu: function () {
    // Draw all the pong obj in the current state
    Pong.draw();
    // change the canvs font size and color
    this.context.font = '50px Courier New';
    this.context.fillStyle = this.color;

}