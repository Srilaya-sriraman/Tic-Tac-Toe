const X_CLASS='x'
const O_CLASS='o'
const Winning_Combinations=[
    [0,1,2]
    ,[3,4,5]
    ,[6,7,8]
    ,[0,3,6]
    ,[1,4,7]
    ,[2,5,8]
    ,[0,4,8]
    ,[2,4,6]
]
const cellElements= document.querySelectorAll('[data-cell]');
const board=document.getElementById('board')
const winnermsg=document.getElementById('winner-message')
const winner=document.querySelector('[data-winning-message-text]')
const restartb=document.getElementById('restart')
let OTurn;

StartGame(); 

restartb.addEventListener('click',StartGame)

function StartGame()
{   
    OTurn=false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick,{once:true});
    });
    setBoardHoverClass();
    winnermsg.classList.remove('show')

}
function handleClick(e){
    const cell=e.target;
    const currentClass= OTurn ? O_CLASS : X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass))
    {
        finishGame(false)
    }
    else if(isDraw())
    {
        finishGame(true)
    }
    else
    {
        swapTurns()
        setBoardHoverClass()
    }
}
function finishGame(draw)
{
    if(draw)
    {
        winner.innerText='Draw :((';
    }
    else
    {
        winner.innerText=`${OTurn? "O " : "X" } Won!!!`;
    }
    winnermsg.classList.add('show')
}
function isDraw()
{
    return [...cellElements].every(cell=>
        {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
        })
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}
function swapTurns()
{
    OTurn=!OTurn;
}
function setBoardHoverClass()
{
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(OTurn)
    {
        board.classList.add(O_CLASS)
    }
    else
    {
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass)
{
    return Winning_Combinations.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}