// APICALL
async function apiCall() {
  const response = await fetch(
    "https://670ed0e63e7151861655dd83.mockapi.io/api/v1/ingredients"
  );
  const data = response.json;
  console.log(data);
}

//VAR   VARIABLES DOM
let items = [];
const shopListDOM = document.getElementById("listId");
const inputIdDOM = document.getElementById("inputId");
const addBtnId = document.getElementById("addBtnId");

//

//¿   FUNCTION TO PRINT ARRAY[ITEMS]
function printList() {
  shopListDOM.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    shopListDOM.innerHTML += `<li>
    <span><input type="checkbox" onchange="checkedItem('${i}')" ${
      items[i].isBought ? "checked" : ""
    } ></span>
    <span class='${items[i].isBought ? "textSpan" : ""}'>${
      items[i].nameProduct
    }</span>
    <span onclick="deleteItemFromList('${i}')" class="item-delete-btn">x</span>
    </li>`;
  }
}

//!   FUNCTION TO ADD ITEM
function addItemToList() {
  const newItem = inputIdDOM.value.trim();
  inputIdDOM.value = "";

  if (!newItem) {
    alert("añade algo !! ");
    return;
  }
  if (newItem.length > 150) {
    alert("el archivo es superior a 25 caracteres");
    return;
  }
  for (const item of items) {
    if (item.nameProduct.toLowerCase() == newItem.toLowerCase()) {
      alert("ya esta en la lista");
      return;
    }
  }

  items.push({
    nameProduct: textFormat(newItem),
    isBought: false,
  });
  printList();
}

//¡   FUNCTION TO DELETE
function deleteItemFromList(index) {
  items.splice(index, 1);
  printList();
}

//OKAY   FUNCION TO CHECKBOX
function checkedItem(index) {
  items[index].isBought = !items[index].isBought;
  printList();
}

//-   FUNCTION TO FORMAT TEXT
function textFormat(text) {
  const splitText = text.split(" ");
  const wordFormatText = [];
  splitText.forEach((word) =>
    wordFormatText.push(
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
  );
  return wordFormatText.join(" ");
}

//?   FUNCTION MAIN
function main() {
  // alert("Welcome to the list app! Start deleting this alert, please.");
  addBtnId.addEventListener("click", addItemToList);
  apiCall();
  printList();
}

main();

window.addItemToList = addItemToList;
window.deleteItemFromList = deleteItemFromList;
window.checkedItem = checkedItem;
