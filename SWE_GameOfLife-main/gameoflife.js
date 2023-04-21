const numRows = 25;
const numCols = 50;
let grid = new Array(numRows);
for (let i = 0; i < numRows; i++) {
  grid[i] = new Array(numCols);
}
function createTable(){
  var gridContainer= document.getElementById('gridContainer');
  if (!gridContainer) {
    // Throw error
    console.error("Problem: No div for the drid table!");
  }
  var table = document.createElement("table")

  for (var i=0;i<numRows;i++){
    var tr= document.createElement("tr");
    for (var j =0;j<numCols;j++){
      var cell = document.createElement("td");
      cell.setAttribute("id",i+"."+j)
      cell.setAttribute("class", "dead");
      cell.onclick = ClickCell;
      tr.appendChild(cell);
      
    }
    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
  }


  function ClickCell(){

    var position = this.id.split(".");
    var row = position[0];
    var col = position[1];
    var classes = this.getAttribute("class");
        if(classes.indexOf("live") > -1) {
            this.setAttribute("class", "dead");
            grid[row][col] = 0;
        } else {
            this.setAttribute("class", "live");
            grid[row][col] = 1;
        }
  }
// Populate the grid with random cells 
function random(){
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    grid[i][j] = Math.floor(Math.random() * 2);
    var cell = document.getElementById(i + "." + j);
      if (grid[i][j] === 1) {
        cell.setAttribute("class","live")

      } 
      else {
        cell.setAttribute("class","dead")
      }

  }
}

}


// Function to get the number of live neighbors for a cell
function getNumLiveNeighbors(row, col) {
  let numLiveNeighbors = 0;

  // Check the eight neighbors around the cell
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // Skip the current cell
      if (i === 0 && j === 0) {
        continue;
      }

      let neighborRow = row + i;
      let neighborCol = col + j;
      //edge of grid cases
      if (neighborRow < 0) {
        neighborRow = numRows - 1;
      } 
      else if (neighborRow >= numRows) {
        neighborRow = 0;
      }

      if (neighborCol < 0) {
        neighborCol = numCols - 1;
      } 
      else if (neighborCol >= numCols) {
        neighborCol = 0;
      }

      if (grid[neighborRow][neighborCol] === 1) {
        numLiveNeighbors++;
      }
    }
  }

  return numLiveNeighbors;
}

// Function to update the grid for the next generation
function updateGrid() 
{
  let newGrid = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    newGrid[i] = new Array(numCols);
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const numLiveNeighbors = getNumLiveNeighbors(i, j);
      
      if (grid[i][j] === 1) {
        if (numLiveNeighbors < 2 || numLiveNeighbors > 3) {
          newGrid[i][j] = 0;
        } 
        else {
          newGrid[i][j] = 1;
        }
      }
      else {
        if (numLiveNeighbors === 3){
          newGrid[i][j] = 1;
        }
      }
      
    }
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      var cell = document.getElementById(i + "." + j);
      if (newGrid[i][j] === 1) {
        cell.setAttribute("class","live")
      
      } else {
        cell.setAttribute("class","dead")
        
      
      }
    }
  }

  grid = newGrid; // Update the grid array
  
}


function initialize() {
  createTable();
  
  

}

//clear function
function ClearBoard() 
  {
    var liveCells = document.querySelectorAll(".live"); // select all live cells

    // Loop through all live cells and update class and grid array
    liveCells.forEach((cell) => {
      var position = cell.id.split(".");
      var row = position[0];
      var col = position[1];
      cell.setAttribute("class", "dead");
      grid[row][col] = 0;
    });
  }

  var intervalId; // variable to store interval ID
  var speedRadios = document.getElementsByName("speed"); // get all radio buttons with name "speed"
  
  // add event listener to each radio button
  speedRadios.forEach(function(radio) 
  {
    radio.addEventListener("change", function() 
    {
      // check which speed is selected and update interval time accordingly
      var speed = document.querySelector('input[name="speed"]:checked').value;
      clearInterval(intervalId); // clear previous interval
      if (speed === "Fast") {
        intervalId = setInterval(updateGrid, 200); // set interval for 200 milliseconds
      } else if (speed === "Medium") {
        intervalId = setInterval(updateGrid, 500); // set interval for 500 milliseconds
      } else if (speed === "Slow") {
        intervalId = setInterval(updateGrid, 1000); // set interval for 1000 milliseconds
      }
    });
  });

  // function start() 
  // {
  //   if (!playing){
  //     playing = true;
  //     // intervalld = setInterval(updateGrid, 500);
  //   }
  // }
  
  function start() 
  {
    if (!playing) 
    {
      playing = true;
      var speed = document.querySelector('input[name="speed"]:checked').value; // get the currently selected speed
      if (speed === "Fast") {
        intervalId = setInterval(updateGrid, 200); // set interval for 200 milliseconds
      } else if (speed === "Medium") {
        intervalId = setInterval(updateGrid, 500); // set interval for 500 milliseconds
      } else if (speed === "Slow") {
        intervalId = setInterval(updateGrid, 1000); // set interval for 1000 milliseconds
      }
    }
  }


  function stop() 
  {
    // if (playing) 
    // {
    //   playing = false;
      
    // }
    clearInterval(intervalId);
  }


  function iter23(){
   
    for(i =0;i<23;i++){
        setTimeout(updateGrid,500);
      console.log(i);
    }
    
    return;
  }

var Iter23 = document.getElementById("iter23");
Iter23.addEventListener("click", iter23);

var sinIteration = document.getElementById("sinIteration");
sinIteration.addEventListener("click", updateGrid);

var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", ClearBoard);
var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", stop);
window.onload= initialize();
var playing = false;

var startButton = document.getElementById("start");
startButton.addEventListener("click", start);
var rand = document.getElementById("random");
rand.addEventListener("click", random);

// function displayGrid() {
//   const gridContainer = document.getElementById("gridContainer"); // Replace "grid-container" with the ID of the container element for your grid in your HTML
//     gridContainer.innerHTML = ""; // Clear the existing content of the grid container

//   // Loop through the grid array and create HTML elements for each cell
//   for (let i = 0; i < numRows; i++) {
//     for (let j = 0; j < numCols; j++) {
//       const cell = document.createElement("div"); // Create a new element for each cell
//       cell.classList.add("cell"); // Add a CSS class for styling

//       // Set the cell's class based on the live/dead status in the grid array
//       if (grid[i][j] === 1) {
//         cell.classList.add("live"); // Add a CSS class for live cells
//       } else {
//         cell.classList.add("dead"); // Add a CSS class for dead cells
//       }

//       // Add the cell element to the grid container
//       gridContainer.appendChild(cell);
//     }
//   }
// }