class TicTacToe {
  fieldSize = 3;
  field = [];
  players = [];
  currentPlayerId = 0;
  gameOver = false;

  cellsUi = [];
  
  constructor(playerOneInfo, playerTwoInfo, fieldSize) {
    this.players = [
      {info: playerOneInfo, symbol: "X"},
      {info: playerTwoInfo, symbol: "O"}
    ];
    this.fieldSize = fieldSize;

    this.createField();
  }

  checkIsWin(player) {
    
    
    /*Проверяем строки*/
    for (let x = 0; x < this.fieldSize; x++)
    {
      let currentRowWin = true;
      for (let y = 0; y < this.fieldSize; y++)
      {
        currentRowWin = currentRowWin && this.field[x][y] === player.symbol;
      }
      if (currentRowWin)
      {
        console.log(`Player "${player.info}" is win!`);
        this.gameOver = true;
        for (let y = 0; y < this.fieldSize; y++)
        {
          this.cellsUi[x][y].style.background = "#1EE16C";
        }
        
      }
    }
    
    
    /*Проверяем столбцы*/
    for (let y = 0; y < this.fieldSize; y++)
    {
      let currentColWin = true;
      for (let x = 0; x < this.fieldSize; x++)
      {
        currentColWin = currentColWin && this.field[x][y] === player.symbol;
      }
      if (currentColWin)
      {
        console.log(`Player "${player.info}" is win!`);
        this.gameOver = true;
        for (let x = 0; x < this.fieldSize; x++)
        {
          this.cellsUi[x][y].style.background = "#1EE16C";
        }
        
      }
    }
    
    /*Проверяем первую диагональ*/
    let Diag1Win = true;
    for (let x = 0; x < this.fieldSize; x++)
    {
      let y = x;
      Diag1Win = Diag1Win && this.field[x][y] === player.symbol;
    }
    if (Diag1Win)
    {
      console.log(`Player "${player.info}" is win!`);
      this.gameOver = true;
      for (let x = 0; x < this.fieldSize; x++)
      {
        let y = x;
        this.cellsUi[x][y].style.background = "#1EE16C";
      }

    }
    
    /*Проверяем вторую диагональ*/
    let Diag2Win = true;
    for (let y = 0; y < this.fieldSize; y++)
    {
      let x = this.fieldSize - y - 1;
      Diag2Win = Diag2Win && this.field[x][y] === player.symbol;
    }
    if (Diag2Win)
    {
      console.log(`Player "${player.info}" is win!`);
      this.gameOver = true;
      for (let y = 0; y < this.fieldSize; y++)
      {
        let x = this.fieldSize - y - 1;
        this.cellsUi[x][y].style.background = "#1EE16C";
      }

    }
    


    return false;
  }

  makeMove(element, player, x, y) {
    try {    
      
    
      if (!this.isPossibleMove(x,y)) {
        throw new Error("Illegal move");
      }

      /*Устанавливаем ход игрока*/
      this.field[x][y] = player.symbol;
      this.setSymbolToUi(element, player.symbol);
      console.log(`x=${x}, y=${y}`);
      /*Проверяем победу игрока*/
      this.checkIsWin(player);
          
      /*Меняем игрока на следующего*/
      this.currentPlayerId =  (this.currentPlayerId+1)%2;
      
    } catch(exc) {
        if (exc instanceof Error) {
            console.log(exc.message);
        } else {
            console.log(exc);
        }
    }
  }

  //Проверка допустимости хода
  isPossibleMove(x, y) {
    return x < this.fieldSize && y < this.fieldSize && !this.field[x][y];
  }

  getPlayer(playerIdx) {
    return this.players[playerIdx];
  }

  //Вывод изображений в UI
  setSymbolToUi(element, symbol)
  {
    let crossSVG = document.getElementById("cross");
    let circleSVG = document.getElementById("circle");
           
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(
      symbol=='X'?crossSVG.outerHTML : circleSVG.outerHTML)));  
    img.style = "width:'100%';height:'100%';";
    element.appendChild(img);
  }
  
  //Создание игрового поля
  createField(){
    this.field = new Array(this.fieldSize);
    this.cellsUi = new Array(this.fieldSize);
    for (let i = 0; i < this.fieldSize; i++) {
      this.field[i] = new Array(this.fieldSize);
      this.cellsUi[i] = new Array(this.fieldSize);
      for (let j = 0; j < this.fieldSize; j++) {
        this.field[i][j] = null;
        this.cellsUi[i][j] = null;
      }
    }
    
    let gameFieldUi = document.getElementById("game-field");
    
    /*Определяем стиль с нужным количеством колонок*/
    let styleColumnsStr = "";
    for (let i = 0; i< this.fieldSize; i++)
    {
      styleColumnsStr += 'auto ';
    }
    gameFieldUi.style.gridTemplateColumns = styleColumnsStr;
    
    /*Очищаем поля*/
    while (gameFieldUi.firstChild) {
      gameFieldUi.removeChild(gameFieldUi.firstChild);
    }
    
    /*Генерим новые элементы*/
    for (let x = 0; x< this.fieldSize; x++)
    {
      for (let y = 0; y< this.fieldSize; y++)
      {
        const newField = document.createElement("div");
        gameFieldUi.appendChild(newField);
        newField.classList.add("game-field_cell");
        
        /*Событие на нажатие поля*/
        newField.onclick = function() {
          if (!game.gameOver)
          {
            let player = game.getPlayer(game.currentPlayerId);
            game.makeMove(this, player, x, y);
          }
        }
        this.cellsUi[x][y] = newField;
      }
    }
    

  }
     
  
}
 
const playerOne = "Player1";
const playerTwo = "Player2";
  
let game = new TicTacToe(playerOne, playerTwo, 3);

// ОСНОВНОЙ ХОД ПРОГРАММЫ
window.onload = function() {
  
  
  document.getElementById("resetButton").onclick = function() {
    let fieldSize = Number(document.getElementById("sizeInput").value);
    game = new TicTacToe(playerOne, playerTwo, fieldSize);
  }
  
  console.log("============Начало программы==============");
  document.getElementById("resetButton").click(); 
  
}
