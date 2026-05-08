//* Author - Darrion Oster             *//
//* Description - DOM Based TODO List *//
//* Date - 5/08/26                   *//

//TODO 1 - Connect and get the Input add it to a array STATUS - FINISHED
//TODO 2 - Display the array and make them buttons / hoverable and clickable use #C74F54 for the color STATUS - FINISHED
//TODO 3 - Make the array not scuffed make it actually like delete and not go 1,2,3 on the same line STATUS - FINISHED
//TODO 4 - Maybe verify input further could keep a user save so it can be reloaded like in the techschool one? so the page can be reloaded? idk if possible in js tho as I did all that in python at the time STATUS - UNKNOWN? 

const itemArray = [] //Lowkey this is scuffed but idc

//Lowkey had to look this one up as it was bugging me I couldnt just hit enter 
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#textEntrance').addEventListener('keydown', (e) => {
        if (e.key === 'Enter'){ 
            getItems();
        }
    });
});

function getItems(){
    let inputElement = document.querySelector('#textEntrance');
    let item = inputElement.value;
    if (item !== ""){
        itemArray.push(item);
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
    
    setTimeout(() => {
        inputElement.placeholder = 'Enter new item...';
        inputElement.style.color = '';
        inputElement.readOnly = false;
        inputElement.style.caretColor = "auto";
        inputElement.focus();
    }, 2000);
}

function createItemList(){
    let container = document.querySelector('#container');
    container.innerHTML = '';

    itemArray.forEach((item, index) => {
        const newTODO = document.createElement('button');
        newTODO.classList.add('textButton')
        
        let content = document.createTextNode(item);
        newTODO.appendChild(content);
        
        newTODO.onclick = () => deleteItem(index);
        
        container.appendChild(newTODO)
    });
}

function deleteItem(index){
    itemArray.splice(index, 1)
    createItemList();
}




