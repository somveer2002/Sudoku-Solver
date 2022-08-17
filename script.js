var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.addEventListener('click' , function () {
	// console.log("kj");
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
})

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

// in JS their is fun return type we use we have to use function  

function isvalid(board, i, j, num, n){
	//row col check
	for(let x=0;x<n;x++)
	{
       if(board[i][x] == num || board[x][j] == num){
		   return false;
	   }
	}
	//submatrix check
    
	let rt = Math.sqrt(n);
	let ni = i - i % rt;
	let nj = j - j % rt;

	for(let x = ni; x < ni + rt ; x++ ){
		for(let y = nj; y < nj + rt ; y++){
          if(board[x][y] == num ){
            return false;
		  }
		}
	}
	return true;
}


function SudokuSolver(board, i, j, n) {
    //base case
	if ( i==n )
	{
		// print board
		FillBoard(board)
		return;
	}
	// we are not inside board
	if(j==n){
		// return SudokuSolver(board, i+1, 0, n);
		return SudokuSolver(board, i+1, 0, n);
	}
	// if cell is already filled  just move ahead
	if(board[i][j]!=0){
		return SudokuSolver(board, i, j+1, n);
	} 
    //try to fill cell with appropriate no
	for(let num=1;num<=9;num++)
	{
		if(isvalid(board,i,j,num,n)){
			board[i][j]=num;
			let subAns = SudokuSolver(board, i, j+1, n);
			if(subAns){
				return true;
			}
			//bactrack undo changes
			board[i][j]=0;
		}

	}
	return false;
}
