//* Author - Darrion Oster             *//
//* Description - DOM Based TODO List *//
//* Date - 5/08/26                   *//

//I Miss doing the author thing Mrs.Hefton taught me back in hs so ima do it here since I cant at work 

//TODO 1 - Connect and get the Input add it to a array STATUS - FINISHED
//TODO 2 - Display the array and make them buttons / hoverable and clickable use #C74F54 for the color STATUS - FINISHED
//TODO 3 - Make the array not scuffed make it actually like delete and not go 1,2,3 on the same line STATUS - FINISHED
//TODO 4 - Maybe verify input further could keep a user save so it can be reloaded like in the techschool one? so the page can be reloaded? idk if possible in js tho as I did all that in python at the time STATUS - UNKNOWN? 

var itemArray = []; //Lowkey this is scuffed but idc
var completedItemArray = [];

//? Lowkey had to look this one up as it was bugging me I couldnt just hit enter 
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#textEntrance').addEventListener('keydown', (e) => {
        if (e.key === 'Enter'){ 
            getItems();
        }
    });
});

function storeOrUpdateActive(){
    localStorage.setItem('activeValues', JSON.stringify(itemArray));
}

function storeOrUpdateCompleted(){
    localStorage.setItem('completedValues', JSON.stringify(completedItemArray));
}

function getItems(){
    let inputElement = document.querySelector('#textEntrance');
    let item = inputElement.value.trim();
    if (item !== ""){
        itemArray.push(item);
        storeOrUpdateActive();
        inputElement.value = '';
        inputElement.focus();
        createItemList();
    }
    else{
        console.error("no input given");
        inputError();
        inputElement.focus();
    }
}

function inputError(){
    let inputElement = document.getElementById('textEntrance');
    inputElement.style.color = 'red';
    inputElement.placeholder = 'PLEASE INPUT TODO ITEM';
    inputElement.style.caretColor = 'transparent';
    inputElement.readOnly = true;
    
    //? Had to look up how to do sleep in js this is p much it but unsure if this would cause issues later down no clue so doesnt matter
    setTimeout(() => {
        inputElement.placeholder = 'Enter new item...';
        inputElement.style.color = '';
        inputElement.readOnly = false;
        inputElement.style.caretColor = "auto";
        inputElement.focus();
    }, 2000);
}

function createItemList(){
    let activeContainer = document.querySelector('#containerActive');
    activeContainer.innerHTML = '';
    let completedContainer = document.querySelector('#containerCompleted');
    completedContainer.innerHTML = '';

    itemArray.forEach((item, index) => {
        const newTODO = document.createElement('button');
        //? Also looked this up but just in the sense of I couldnt remember or didnt know how to add a js created thing into a css class
        newTODO.classList.add('textButtonActive')
        
        let content = document.createTextNode(item);
        newTODO.appendChild(content);
        
        newTODO.onclick = () => completeItem(index);
        
        activeContainer.appendChild(newTODO)
    });

    completedItemArray.forEach((item, index) => {
        const completedTODO = document.createElement('button');
        //? Also looked this up but just in the sense of I couldnt remember or didnt know how to add a js created thing into a css class
        completedTODO.classList.add('textButtonCompleted')
        
        let content = document.createTextNode(item);
        completedTODO.appendChild(content);
        
        completedTODO.onclick = () => deleteItem(index);
        
        completedContainer.appendChild(completedTODO)
    });
}

if(localStorage.getItem('activeValues') != null)
{
    itemArray =  JSON.parse(localStorage.getItem('activeValues'));
    createItemList()
}
if(localStorage.getItem('completedValues') != null)
{
    completedItemArray = JSON.parse(localStorage.getItem('completedValues'))
    createItemList();
}

function completeItem(index){
    console.log(itemArray[index] + " Completed From Active List")
    completedItemArray.push(itemArray[index])
    itemArray.splice(index, 1);
    storeOrUpdateActive();
    storeOrUpdateCompleted();
    createItemList();
}

function deleteItem(index) {
    console.log(completedItemArray[index] + " Deleted From Completed List")
    completedItemArray.splice(index, 1);
    storeOrUpdateActive();
    storeOrUpdateCompleted();
    createItemList();
}




