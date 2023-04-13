const socket = io();

const submitButton = document.getElementById("addButton");
const deleteButton = document.getElementById("delButton");

function getId() {
    const idToDelete = parseInt(document.getElementById("delId").value);
    return idToDelete;
}

let productToAdd;

function getData() {

    const title = document.getElementById("addTitle").value;
    const description = document.getElementById("addDescription").value;
    const price = parseInt(document.getElementById("addPrice").value)
    const code = document.getElementById("addCode").value;
    const stock = parseInt(document.getElementById("addStock").value)
    const category = document.getElementById("addCategory").value;
    const estado = document.getElementById("addStatus").value

    if (
        !(
            title == "" ||
            description == "" ||
            code == "" ||
            price == "" ||
            stock == "" ||
            category == ""
        )
    ) {
        productToAdd = {
            title: title,
            description: description,
            price: price,
            code: code,
            stock: stock,
            category: category,
            status: estado
        };

        return productToAdd;
    } else {
        return alert("All fields must be complete to add a product");
    }
}

submitButton.addEventListener("click", (evt) => {
    getData();
    socket.emit("addProduct", productToAdd);
});

deleteButton.addEventListener("click", (evt) => {
    let id = getId();
    socket.emit("deleteProduct", id);
})