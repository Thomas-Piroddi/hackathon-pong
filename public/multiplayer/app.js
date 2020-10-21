document.addEventListener('DOMContentLoaded', () => {
    const socket = io()

    let playerNum = 0
    let currentPlayer = "player1"
    const startButton = document.getElementById("start")
    

    const multiPlayerButton = document.querySelector("#multiPlayerButton")

    multiPlayerButton.addEventListener("click", startMultiPlayer)

    


    function startMultiPlayer() {
        startButton.addEventListener('click', game)

        socket.on('player-number', num => {
            if (num == -1){
                infoDisplay.innerHTML = "Sorry the server is full"
            } else {
                playerNum = parseInt(num)
                if (playerNum == 1 ) currentPlayer = "player2"
                console.log(playerNum)
            }
        })

        // another player has connected or disconnected
        socket.on('player-connection', num => {
            console.log(`player number ${num} has connected or disconnected`)
        })

    }



    const canvas = document.getElementById("pong")
    const context = canvas.getContext("2d")

    // set up objects

    const net = {
        x: (canvas.width-2)/2,
        y: 0,
        width: 5,
        height: 30,
        color: "orange"
    }

    let player = {
        x: 0,
        y: canvas.height/2.5,
        width: 20, 
        height: 100,
        score: 0,
        color: "white"

    }

    let com = {
        x: canvas.width-20, 
        y: canvas.height/2.5,
        width: 20,
        height: 100,
        score: 0,
        color: "white",

    }

    let ball = {
        x: canvas.width/2+1,
        y: canvas.height/2-2,
        radius: 15,
        startAngle: 0, 
        endAngle: 2* Math.PI,
        color: "white",
        // speed: 5,
        velocityX: 5,
        velocityY: 5,

    }

    newX = 2
    newY = -2



    // move mouse functionality
    document.addEventListener("mousemove", movePaddles, false)


    function movePaddles(evt){
        let rect = canvas.getBoundingClientRect()
        player.y = (evt.clientY - rect.top - player.height/2) //update y coordinate of player paddle when mouse moves
    }

    const drawRectangle = (x, y, w, h, color) => {
        context.beginPath()
        context.rect(x, y, w, h)
        context.fillStyle = color
        context.fill()
        context.closePath()
    }

    function drawNet(){ // need to implement !
        for (let i = 0; i <= canvas.height; i+=42){
            drawRectangle(net.x, net.y+i, net.width, net.height, net.color)
        }
    }

    const drawCircle = (x, y, r, sAng, eAng, color) => {
        context.beginPath()
        context.arc(x, y, r, sAng, eAng)
        context.fillStyle = color
        context.fill()
        context.closePath()
    }

    const drawText = (x, y, text, color) => {
        context.fillStyle = color
        context.font = "60px helvetica"
        context.fillText(text, x, y)
    }

    function resetBall(){
        ball.x = canvas.width/2
        ball.y = canvas.height/2
        ball.speed = 5
    }

    function collide (b, p) { //function to calculate if ball collides with 
        
        p.top = p.y
        p.bottom = p.y + p.height
        p.left = p.x 
        p.right = p.x + p.width 

        b.top = b.y - b.radius 
        b.bottom = b.y + b.radius 
        b.right = b.x + b.radius 
        b.left = b.x - b.radius

        return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top
    }

    // function speedUp(){
    //     if (Math.sign(newX) == 1) { // increase the speed of the ball 
    //         setInterval(newX += 0.1, 5000)
    //     } else if (Math.sign(newX) == -1){
    //         setInterval(newX -= 0.1, 5000)
    //     } 
    //     if (Math.sign(newY) == 1){
    //         setInterval(newY += 0.1, 5000)
    //     } else if (Math.sign(newY) == -1){
    //         setInterval(newY -= 0.1, 5000)
    //     } 
    // }


    function draw() { // draw function to render everything
        context.clearRect(0, 0, canvas.width, canvas.height) // continuously clear and update board
        drawNet()
        drawCircle(ball.x, ball.y, ball.radius, ball.startAngle, ball.endAngle) // draw the ball
        drawRectangle(player.x, player.y, player.width, player.height, "#ff860d") // draw player paddle
        drawRectangle(com.x, com.y, com.width, com.height, "#ff860d") // draw com paddle
        drawText(canvas.width/2/2, canvas.height/2/2, player.score, "#ff860d") //drae player score
        drawText(canvas.width/1.5, canvas.height/2/2, com.score, "#ff860d") // draw com score
        
        ball.x += newX // move ball
        ball.y += newY // ^

        let computerLevel = 0.03 // level of the computer AI - move down to slow it down or up to speed it up
        com.y += (ball.y - (com.y + com.height/2)) * computerLevel // movement of com paddle based on com level
        
        
        


        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){ // ball bounce off top and bottom
            newY = -newY
        }


        let playerOrCom = (ball.x + ball.radius < canvas.width/2) ? player : com // find which paddle was hit 


        if (collide(ball, playerOrCom)){ // fucntion to change ball angle based on collision
            // newY =- 0.1
            newX = -newX // turn ball direction around
            computerLevel += 0.05
            


            // there is a slight glitch where the ball accidentally 
            // bounces multiple times and the speed increases dramatically - need to fix 
            if (Math.sign(newX) == 1) { // increase the speed of the ball 
                newX += 0.1
            } else if (Math.sign(newX) == -1){
                newX -= 0.1
            } 
            if (Math.sign(newY) == 1){
                newX += 0.1
            } else if (Math.sign(newY) == -1){
                newY -= 0.1
            } 

            
    

            // code from tutorial to change direction but dont think we really need it : 
            // ----------------------
            // let collidePoint = ball.y - (playerOrCom.y + playerOrCom.height/2) 
            // collidePoint = collidePoint/(playerOrCom.height/2)

            // let angleRad = (Math.PI/4) * collidePoint

            // let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1

            // ball.velocityX = direction * ball.speed * Math.cos(angleRad)
            // ball.velocityY = ball.speed * Math.sin(angleRad)


        }

        

        // increase scores and reset ball if ball goes out
        if (ball.x - ball.radius < 0){
            com.score++
            resetBall()
        } else if (ball.x + ball.radius > canvas.width){
            // console.log("hello")
            player.score++
            resetBall()
        }



    }


    function game(){
        setInterval(draw, frames) 
    }


    let frames = 10

    // setInterval(speedIncrease, 3000)

    // //continuously render draw func




})

