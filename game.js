var sketchProc = function(processingInstance) {
 with (processingInstance) {
    size(850, 850);
    frameRate(60);

    // ProgramCodeGoesHere
    var levels = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

    //BRICK
    var allBricks = [];

    var Brick = function(x,  y) {
        this.x = x;
        this.y = y;
    };

    Brick.prototype.draw = function() {
        fill(235, 143, 30);
        stroke(255, 255, 255);
        rectMode(CORNER);
        rect(this.x, this.y, 40, 25);
    };

    for(var i = 0; i < levels.length; i++){
        for(var j = 0; j < levels[0].length; j++){
            switch(levels[i][j]) {
                case 0:
                break;
                case 1:
                    var brick = new Brick(j * 40.2 + 2, i * 26 + 2);
                    allBricks.push(brick);
                break;
            }
        }
    }

    //BAR
    var Bar = function(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    };

    Bar.prototype.draw = function() {
        fill(0, 34, 255);
        rectMode(CENTER);
        rect(this.x, this.y, this.size, 20);
    };

    var bar = new Bar(width / 2, height - 20, 80);

    //BALL
    var allBalls = [];

    var Ball = function(position, velocity, color, size, power) {
        this.position = position;
        this.velocity = velocity;
        this.size = size;
        this.color = color;
        this.power = power;
    };

    Ball.prototype.draw = function() {
        noStroke();
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.size, this.size);
        this.position.add(this.velocity);

        if (this.position.x < this.size/2) {
            this.velocity.x = Math.abs(this.velocity.x);
        }
        if (this.position.x > width - this.size/2) {
            this.velocity.x = -Math.abs(this.velocity.x);
        }
        if (this.position.y < this.size/2) {
            this.velocity.y = Math.abs(this.velocity.y);
        }
        if (this.position.y >= height - 30 - this.size/2 &&
            this.position.y <= height - 20 &&
            this.position.x > bar.x - (bar.size/2 + this.size/2) &&
            this.position.x < bar.x + (bar.size/2 + this.size /2)) {
            this.velocity.y = -Math.abs(this.velocity.y);

            if (this.velocity.x > 0) {
                if (bar.x >= this.position.x) {
                   this.velocity.x -= 0.05 * Math.abs(bar.x - this.position.x);
                } else {
                    this.velocity.x += 0.05 * Math.abs(bar.x - this.position.x);
                }
            } else {
                 if (bar.x >= this.position.x) {
                   this.velocity.x -= 0.04 * Math.abs(bar.x - this.position.x);
                } else {
                    this.velocity.x += 0.04 * Math.abs(bar.x  - this.position.x);
                }
            }
        }
    };

    var ball = new Ball(new PVector(bar.x, bar.y-15), new PVector(5, -5), color(0), 30, false);
    allBalls.push(ball);

    var Options = function(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color(0);
    };

    Options.prototype.draw = function() {
        noStroke();
        textAlign(CENTER);
        rectMode(CENTER);
        textSize(10);
        if (this.inline(ball) === true) {
            this.color = color(0, 191, 255);
        } else {
            this.color = color(238, 255, 0);
        }
        fill(this.color);
        rect(this.x, this.y, 40, 20);
        fill(97, 81, 97);
        text(this.name, this.x, this.y+4);
    };

    Options.prototype.inline = function(ball) {
        var result = (Math.abs(ball.position.x-this.x) <= (15+ball.size/2) &&
                      Math.abs(ball.position.y-this.y) <= (15+ball.size/2));
        return result;
    };

    var velUp = new Options ("Fast", width / 2, height-35);
    var velDown = new Options ("Slow", width / 2, height-35);
    var ballSizeUp = new Options ("Big", width / 2, height-35);
    var ballSizeDown = new Options ("Small", width / 2, height-35);
    var barSizeUp = new Options ("Wide", width / 2, height-35);
    var barSizeDown = new Options ("Narrow", width / 2, height-35);
    var powerUp = new Options ("Power", width / 2, height-35);
    var powerDown = new Options ("Po-Off", width / 2, height-35);
    var numberUp = new Options ("AddBall", width / 2, height-35);
    var re = new Options ("Re", width / 2, height-35);

    var numState = true;
    var numTime;

    draw = function() {
        background(255, 255, 255);
        noFill();
        stroke(0,0,0);
        rectMode(CORNER);
        rect(0,0,width-1,height-1);

        velUp.draw();
        velDown.draw();
        ballSizeUp.draw();
        ballSizeDown.draw();
        barSizeUp.draw();
        barSizeDown.draw();
        powerUp.draw();
        powerDown.draw();
        numberUp.draw();
        re.draw();

        bar.draw();

        for (var i = 0; i < allBalls.length; i++) {
            var ball = allBalls[i];
            ball.draw();

            if (ball.position.y > height) {
                allBalls.splice(i, 1);
            }

            for(var j=0; j<allBricks.length; j++) {
                var brick = allBricks[j];

                var inlinex1 = ball.position.x > brick.x - (ball.size/2 + 0);
                var inlinex2 = ball.position.x < brick.x + (ball.size/2 + 40);
                var inliney1 = ball.position.y > brick.y - (ball.size/2 + 0);
                var inliney2 = ball.position.y < brick.y + (ball.size/2 + 25);

                var conclusionx1 = inlinex1 && inlinex2 &&
                    (inliney1 && ball.position.y <= brick.y - 0);
                var conclusionx2 = inlinex1 && inlinex2 &&
                    (inliney2 && ball.position.y >= brick.y + 25);
                var conclusiony1 = inliney1 && inliney2 &&
                    (inlinex1 && ball.position.x <= brick.x - 0);
                var conclusiony2 = inliney1 && inliney2 &&
                    (inlinex2 && ball.position.x >= brick.x + 40);

                if (conclusiony1 || conclusiony2) {
                    if (!ball.power) {
                         ball.velocity.y = -ball.velocity.y;
                    }
                    allBricks.splice(j, 1);
                } else if (conclusionx1 || conclusionx2) {
                    if (!ball.power) {
                        ball.velocity.y = -ball.velocity.y;
                    }
                    allBricks.splice(j, 1);
                }
            }

            //re
            if (re.inline(ball) === true)
            {
                velUp.x = random(10,width-30);
                velUp.y = random(10,height-40);
                re.x = random(10,width-30);
                re.y = random(10,height-40);
                ballSizeUp.x = random(10,width-30);
                ballSizeUp.y = random(10,height-40);
                ballSizeDown.x = random(10,width-30);
                ballSizeDown.y = random(10,height-40);
                velDown.x = random(10,width-30);
                velDown.y = random(10,height-40);
                barSizeUp.x = random(10,width-30);
                barSizeUp.y = random(10,height-40);
                barSizeDown.x = random(10,width-30);
                barSizeDown.y = random(10,height-40);
                numberUp.x = random(10,width-30);
                numberUp.y = random(10,height-40);
                powerUp.x = random(10,width-30);
                powerUp.y = random(10,height-30);
                powerDown.x = random(10,width-30);
                powerDown.y = random(10,height-40);
            }

            //ballSizeUp
            if (ballSizeUp.inline(ball) === true && ball.size <= width / 3)
            {
                ball.size += 2;
            }

            //ballSizeDown
            if (ballSizeDown.inline(ball) === true && ball.size > 8)
            {
                ball.size -= 2;
            }

            //barSizeUp
            if (barSizeUp.inline(ball) === true && bar.size < width / 1.5)
            {
                bar.size += 3;
            }

            //barSizeDown
            if (barSizeDown.inline(ball) === true && bar.size > 50)
            {
                bar.size -= 3;
            }

            //velUp
            if (velUp.inline(ball) === true && ball.velocity.mag() < 15) {
                var mag = ball.velocity.mag();
                ball.velocity.normalize();
                ball.velocity.mult(mag+0.5);
            }

            //velDown
            if (velDown.inline(ball) === true && ball.velocity.mag() > 5) {
                var mag = ball.velocity.mag();
                ball.velocity.normalize();
                ball.velocity.mult(mag-0.5);
            }

            //powerUp
            if (powerUp.inline(ball) === true &&
                ball.power === false)
            {
                ball.power = true;
                ball.color = color(255, 0, 0);
            }

            //powerDown
            if (powerDown.inline(ball) === true &&
                ball.power === true)
            {
                ball.power = false;
                ball.color = color(0, 0, 0);
            }

            //numberUp
            if (numState === true) {
                if (numberUp.inline(ball) === true) {
                    var ball
                    = new Ball(new PVector(bar.x, bar.y-15), new PVector(random(-2,2), -4), color(ball.color), 30, ball.power);
                    allBalls.push(ball);
                    numState = false;
                    numTime = frameCount;
                }
            } else {
                if (numberUp.inline(ball) === true && frameCount >= numTime+15) {
                numState = true;
                }
            }
        }

        for(var i = 0; i < allBricks.length; i++){
            var brick = allBricks[i];
            brick.draw();
        }

        mouseMoved = function() {
            bar.x = mouseX;
            if (bar.x < bar.size / 2) {bar.x = bar.size / 2;}
            if (bar.x > width - bar.size/2) {bar.x = width-bar.size/2;}
            bar.y = height - 20;
        };

        //Game over message
        fill(0, 0, 0);
        if (allBalls.length === 0) {
            background(181, 218, 255);
            textSize(32);
            textAlign(CENTER, CENTER);
            text("GAME OVER", width / 2, height / 2);
            noLoop();
        }

        // Mission complete message will be appeared,
        // when there is no element in the positionBrick array.
        if (allBricks.length === 0) {
            background(255, 181, 181);
            textSize(32);
            textAlign(CENTER, CENTER);
            text("You WIN!!", width / 2, height / 2);
            noLoop();
        }
    };
//
}};

// Get the canvas that Processing-js will use
var canvas = document.getElementById("mycanvas");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);
