const itemsContainer = document.getElementById('items');

async function fecthItems(){
    const response = await fetch('/api/items');
    const items = await response.json();
    itemsContainer.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button onclick="deleteItem('${item._id}')">Delete</button>
        `;
        itemsContainer.appendChild(itemElement);
    });
}


async function addItem(){
    const name = prompt('Enter item name: ');
    const description = prompt('Enter item description: ');

    await fetch('/api/items', {method: 'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name, description})});
    fecthItems();
}

async function deleteItem(){
    await fetch(`/api/items/${id}`, {method: 'DELETE'});
    fecthItems();
}


fecthItems();


