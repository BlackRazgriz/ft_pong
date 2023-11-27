update: function () {
    if (!this.over) {
        // If the ball collides with the bound limits - correct the x and y coords.
        if (this.ball.x <= 0) Pong._resetTurn.call(this, this.player2, this.player);
        if (this.ball.x >= this.canvas.width - this.ball.width) Pong._resetTurn.call(this, this.player, this.player2);
        if (this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN;
        if (this.ball.y >= this.canvas.height - this.ball.height) this.ball.moveY = DIRECTION.UP;

        // Move player if they player.move value was updated by a keyboard event
        if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed;
        else if (this.player.move === DIRECTION.DOWN) this.player.y += this.player.speed;
        if (this.player2.move === DIRECTION.UP) this.player2.y -= this.player2.speed;
        else if (this.player2.move === DIRECTION.DOWN) this.player2.y += this.player2.speed;

        // On new serve (start of each turn) move the ball to the correct side
        // and randomize the direction to add some challenge.
        if (Pong._turnDelayIsOver.call(this) && this.turn) {
            this.ball.moveX = this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
            this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][Math.round(Math.random())];
            this.ball.y = Math.floor(Math.random() * this.canvas.height - 200) + 200;
            this.turn = null;
        }

        // If the player collides with the bound limits, update the x and y coords.
        if (this.player.y <= 0) this.player.y = 0;
        else if (this.player.y >= (this.canvas.height - this.player.height)) this.player.y = (this.canvas.height - this.player.height);
        if (this.player2.y <= 0) this.player2.y = 0;
        else if (this.player2.y >= (this.canvas.height - this.player2.height)) this.player2.y = (this.canvas.height - this.player2.height);

        // Move ball in intended direction based on moveY and moveX values
        if (this.ball.moveY === DIRECTION.UP) this.ball.y -= (this.ball.speed / 1.5);
        else if (this.ball.moveY === DIRECTION.DOWN) this.ball.y += (this.ball.speed / 1.5);
        if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed;
        else if (this.ball.moveX === DIRECTION.RIGHT) this.ball.x += this.ball.speed;
            // // Handle P2 UP and DOWN movement
            // if (this.player2.y > this.ball.y - (this.player2.height / 2)) {
            //     if (this.ball.moveX === DIRECTION.RIGHT) this.ai.y -= this.ai.speed / 1.5;
            //     else this.ai.y -= this.ai.speed / 4;
            // }
            // if (this.ai.y < this.ball.y - (this.ai.height / 2)) {
            //     if (this.ball.moveX === DIRECTION.RIGHT) this.ai.y += this.ai.speed / 1.5;
            //     else this.ai.y += this.ai.speed / 4;
            // }

            // Handle P2 (AI) wall collision
            if (this.player2.y >= this.canvas.height - this.player2.height) this.player2.y = this.canvas.height - this.player2.height;
            else if (this.player2.y <= 0) this.player2.y = 0;

         // Handle P2-ball collision
         if (this.ball.x - this.ball.width <= this.player2.x && this.ball.x >= this.player2.x - this.player2.width) {
            if (this.ball.y <= this.player2.y + this.player2.height && this.ball.y + this.ball.height >= this.player2.y) {
                this.ball.x = (this.player2.x - this.ball.width);
                this.ball.moveX = DIRECTION.LEFT;
       

            }
        }
        // Handle Player-Ball collisions
         if (this.ball.x - this.ball.width <= this.player.x && this.ball.x >= this.player.x - this.player.width) {
            if (this.ball.y <= this.player.y + this.player.height && this.ball.y + this.ball.height >= this.player.y) {
                this.ball.x = (this.player.x + this.ball.width);
                this.ball.moveX = DIRECTION.RIGHT;
            }
        }
    }

    // Handle the end of round transition
    // Check to see if the player won the round.
    if (this.player.score === rounds[this.round]) {
        // Check to see if there are any more rounds/levels left and display the victory screen if
        // there are not.
        if (!rounds[this.round + 1]) {
            this.over = true;
            setTimeout(function () { Pong.endGameMenu('Winner!'); }, 1000);
        } else {
            // If there is another round, reset all the values and increment the round number.
            this.color = this._generateRoundColor();
            this.player.score = this.ai.score = 0;
            this.player.speed += 0.5;
            this.ai.speed += 1;
            this.ball.speed += 1;
            this.round += 1;

        }
    }
    // Check to see if the ai/AI has won the round.
    else if (this.player2.score === rounds[this.round]) {
        this.over = true;
        setTimeout(function () { Pong.endGameMenu('P2 wins'); }, 1000);
    }
},