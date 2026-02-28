// ვამოწმებთ, გვაქვს თუ არა უკვე შენახული პროდუქტები, თუ არა - ვიყენებთ საწყისს
let products = JSON.parse(localStorage.getItem('myShopData')) || {
    vintage: [{ name: "ვინტაჟური კაბა", price: 120, img: "https://i.pinimg.com/736x/00/6a/11/006a114e3ee2bf2651944452015e6c99.jpg" }],
    gothic: [{ name: "გოთიკური კაბა", price: 150, img: "https://m.media-amazon.com/images/I/71RpRx3EZ-L._AC_UY1000_.jpg" }],
    maternity: [{ name: "საორსულო კაბა", price: 95, img: "https://www.pinkblushmaternity.com/cdn/shop/files/15877_10.jpg?v=1759467627" }],
    accessories: []
};

function saveToStorage() {
    localStorage.setItem('myShopData', JSON.stringify(products));
}

function addNewProduct() {
    const name = document.getElementById('new-name').value;
    const price = document.getElementById('new-price').value;
    const img = document.getElementById('new-img').value;
    const category = document.getElementById('new-category').value;

    if(name && price && img) {
        products[category].push({ name, price: parseInt(price), img });
        saveToStorage(); // ვინახავთ მეხსიერებაში
        
        document.getElementById('new-name').value = '';
        document.getElementById('new-price').value = '';
        document.getElementById('new-img').value = '';
        
        alert("ნივთი წარმატებით დაემატა!");
        renderHome();
        showSection('home');
    } else {
        alert("გთხოვთ შეავსოთ ყველა ველი!");
    }
}

function renderHome() {
    const grid = document.getElementById('home-grid');
    if(!grid) return;
    grid.innerHTML = '';
    for (let cat in products) {
        products[cat].forEach(item => {
            grid.innerHTML += `
                <div class="card">
                    <img src="${item.img}">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price} GEL</p>
                </div>`;
        });
    }
}

function showSection(sectionId) {
    const main = document.getElementById('main-content');
    const display = document.getElementById('product-display');
    const list = document.getElementById('product-list');
    const title = document.getElementById('category-title');

    if (sectionId === 'home') {
        main.style.display = 'block';
        display.style.display = 'none';
        renderHome();
        return;
    }

    main.style.display = 'none';
    display.style.display = 'block';
    list.innerHTML = '';
    title.innerText = sectionId.toUpperCase();

    const items = products[sectionId] || [];
    items.forEach(item => {
        list.innerHTML += `<div class="card"><img src="${item.img}"><h3>${item.name}</h3><p class="price">${item.price} GEL</p></div>`;
    });
}

window.onload = renderHome;