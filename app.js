import { initializeApp } from "https://gstatic.com";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc } from "https://gstatic.com";

// ВАШИ КЛЮЧИ ИЗ FIREBASE (УЖЕ ПОДКЛЮЧЕНЫ)
const firebaseConfig = {
    apiKey: "AIzaSyBXEQJjxAKOZ3S43vTYBEvxfTf6ETnAShE",
    authDomain: "://firebaseapp.com",
    projectId: "kiniro-sushi",
    storageBucket: "kiniro-sushi.firebasestorage.app",
    messagingSenderId: "710609177306",
    appId: "1:710609177306:web:ae68ee60413d1f6f7733e3",
    measurementId: "G-QZFV0EF7JG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ПОЛНОЕ МЕНЮ «КИНИРО СУШИ РОМАНОВСКАЯ»
const menuData = [
    // --- РОЛЛЫ ---
    { id: 1, name: "Тори", price: 280, cat: "rolls" },
    { id: 2, name: "Темпура Чиз", price: 290, cat: "rolls" },
    { id: 3, name: "Амаго", price: 340, cat: "rolls" },
    { id: 4, name: "Темпура хот с креветкой", price: 290, cat: "rolls" },
    { id: 5, name: "Темпура хот с крабом", price: 250, cat: "rolls" },
    { id: 6, name: "Темпура хот с угрем", price: 290, cat: "rolls" },
    { id: 7, name: "Темпура хот с лососем", price: 290, cat: "rolls" },
    { id: 8, name: "Кагасаки", price: 290, cat: "rolls" },
    { id: 9, name: "Оиши", price: 290, cat: "rolls" },
    { id: 10, name: "Чикен Хот", price: 280, cat: "rolls" },
    { id: 11, name: "Биг ролл", price: 490, cat: "rolls" },
    { id: 12, name: "Ясай", price: 220, cat: "rolls" },
    { id: 13, name: "Харуми", price: 300, cat: "rolls" },
    { id: 14, name: "Самурай", price: 250, cat: "rolls" },
    { id: 15, name: "Малибу", price: 270, cat: "rolls" },
    { id: 16, name: "Банкай", price: 280, cat: "rolls" },
    { id: 17, name: "Фудзияма", price: 290, cat: "rolls" },
    { id: 18, name: "Юнами", price: 310, cat: "rolls" },
    { id: 19, name: "Тануки", price: 250, cat: "rolls" },
    { id: 20, name: "Киото", price: 270, cat: "rolls" },
    { id: 21, name: "Хоккайдо", price: 340, cat: "rolls" },
    { id: 22, name: "Тояма", price: 290, cat: "rolls" },
    { id: 23, name: "Сен-сей", price: 340, cat: "rolls" },
    { id: 24, name: "Тайфун", price: 340, cat: "rolls" },
    { id: 25, name: "Вулкан", price: 370, cat: "rolls" },
    { id: 26, name: "Техас", price: 240, cat: "rolls" },
    { id: 27, name: "Микадо", price: 340, cat: "rolls" },
    { id: 28, name: "Саппоро", price: 340, cat: "rolls" },
    { id: 29, name: "Калифорния запечённая", price: 290, cat: "rolls" },
    { id: 30, name: "Ниигата", price: 290, cat: "rolls" },
    { id: 31, name: "Бронкс", price: 340, cat: "rolls" },
    { id: 32, name: "Азия", price: 340, cat: "rolls" },
    { id: 33, name: "Курай маки", price: 250, cat: "rolls" },
    { id: 34, name: "Изуми", price: 250, cat: "rolls" },
    { id: 35, name: "Мия", price: 270, cat: "rolls" },
    { id: 36, name: "Гейша", price: 270, cat: "rolls" },
    { id: 37, name: "Цезарь (ролл)", price: 290, cat: "rolls" },
    { id: 38, name: "Гурман", price: 290, cat: "rolls" },
    { id: 39, name: "Шанхай", price: 250, cat: "rolls" },
    { id: 40, name: "Жареный с тунцом", price: 290, cat: "rolls" },
    { id: 41, name: "Темпура кунсей", price: 320, cat: "rolls" },
    { id: 42, name: "Жареный с крабом", price: 240, cat: "rolls" },
    { id: 43, name: "Осака", price: 330, cat: "rolls" },
    { id: 44, name: "Унаги в кляре", price: 330, cat: "rolls" },
    { id: 45, name: "Якудза", price: 290, cat: "rolls" },
    { id: 46, name: "Дунай", price: 330, cat: "rolls" },
    { id: 47, name: "Креветка темпура", price: 330, cat: "rolls" },
    { id: 48, name: "Острые роллы с угрем", price: 290, cat: "rolls" },
    { id: 49, name: "Острые роллы с лососем", price: 270, cat: "rolls" },
    { id: 50, name: "Острые роллы с креветкой", price: 290, cat: "rolls" },
    { id: 51, name: "Острые роллы с крабом", price: 240, cat: "rolls" },
    { id: 52, name: "Острые роллы с тунцом", price: 290, cat: "rolls" },
    { id: 53, name: "Калифорния с тунцом", price: 310, cat: "rolls" },
    { id: 54, name: "Калифорния микс", price: 330, cat: "rolls" },
    { id: 55, name: "Калифорния с угрем", price: 310, cat: "rolls" },
    { id: 56, name: "Калифорния с креветкой", price: 310, cat: "rolls" },
    { id: 57, name: "Калифорния с крабом", price: 280, cat: "rolls" },
    { id: 58, name: "Калифорния с лососем", price: 310, cat: "rolls" },
    { id: 59, name: "Унаги маки", price: 190, cat: "rolls" },
    { id: 60, name: "Эби ролл", price: 190, cat: "rolls" },
    { id: 61, name: "Сяке кунсей маки", price: 190, cat: "rolls" },
    { id: 62, name: "Сяке маки", price: 170, cat: "rolls" },
    { id: 63, name: "Ролл с крабом", price: 140, cat: "rolls" },
    { id: 64, name: "Каппа маки", price: 90, cat: "rolls" },
    { id: 65, name: "Унаги чиз", price: 370, cat: "rolls" },
    { id: 66, name: "Токио", price: 290, cat: "rolls" },
    { id: 67, name: "Канада", price: 350, cat: "rolls" },
    { id: 68, name: "Хатцу", price: 340, cat: "rolls" },
    { id: 69, name: "Сливочный краб", price: 240, cat: "rolls" },
    { id: 70, name: "Кани маки", price: 270, cat: "rolls" },
    { id: 71, name: "Комацу", price: 290, cat: "rolls" },
    { id: 72, name: "Бонито", price: 250, cat: "rolls" },
    { id: 73, name: "Томаго маки", price: 190, cat: "rolls" },
    { id: 74, name: "Яки тори", price: 270, cat: "rolls" },
    { id: 75, name: "Филадельфия унаги кунсей", price: 360, cat: "rolls" },
    { id: 76, name: "Филадельфия", price: 350, cat: "rolls" },
    { id: 77, name: "Филадельфия лайт", price: 330, cat: "rolls" },
    { id: 78, name: "Филадельфия кунсей", price: 340, cat: "rolls" },

    // --- СЕТЫ ---
    { id: 79, name: "Гункан сет", price: 590, cat: "sets" },
    { id: 80, name: "Окинава", price: 870, cat: "sets" },
    { id: 81, name: "Бинго", price: 790, cat: "sets" },
    { id: 82, name: "Флорида", price: 690, cat: "sets" },
    { id: 83, name: "Микс", price: 740, cat: "sets" },
    { id: 84, name: "Акира", price: 1790, cat: "sets" },
    { id: 85, name: "Сидней", price: 790, cat: "sets" },
    { id: 86, name: "Классический сет", price: 450, cat: "sets" },
    { id: 87, name: "Сегун", price: 1420, cat: "sets" },
    { id: 88, name: "Сет Динамит", price: 1890, cat: "sets" },
    { id: 89, name: "Тай сет", price: 720, cat: "sets" },
    { id: 90, name: "Сет Изуми хот", price: 670, cat: "sets" },
    { id: 91, name: "Сет Кунсей", price: 920, cat: "sets" },
    { id: 92, name: "Сет Пятница", price: 890, cat: "sets" },
    { id: 93, name: "Сет Тодзава", price: 850, cat: "sets" },
    { id: 94, name: "Сет Хакиро", price: 840, cat: "sets" },
    { id: 95, name: "Сет Хиросима", price: 800, cat: "sets" },
    { id: 96, name: "Темпура сет", price: 790, cat: "sets" },
    { id: 97, name: "Сет Такара", price: 890, cat: "sets" },
    { id: 98, name: "Сет Горячий хит", price: 890, cat: "sets" },
    { id: 99, name: "Топ сет", price: 850, cat: "sets" },
    { id: 100, name: "Сет Ниагара", price: 730, cat: "sets" },
    { id: 101, name: "Сет Якитория", price: 790, cat: "sets" },
    { id: 102, name: "Сет Кидо", price: 740, cat: "sets" },
    { id: 103, name: "Сет Марокко", price: 680, cat: "sets" },
    { id: 104, name: "Сет Мини", price: 540, cat: "sets" },
    { id: 105, name: "Сет Жареный", price: 680, cat: "sets" },

    // --- ПИЦЦА ---
    { id: 106, name: "Пицца 4 Сезона", price: 650, cat: "pizza" },
    { id: 107, name: "Деревенская пицца", price: 690, cat: "pizza" },
    { id: 108, name: "Мясная пицца", price: 890, cat: "pizza" },
    { id: 109, name: "Пицца Цезарь", price: 690, cat: "pizza" },
    { id: 110, name: "Детская пицца", price: 620, cat: "pizza" },
    { id: 111, name: "Тропическая пицца", price: 640, cat: "pizza" },
    { id: 112, name: "Пицца Пепперони", price: 570, cat: "pizza" },
    { id: 113, name: "Пицца Морская", price: 760, cat: "pizza" },
    { id: 114, name: "Пицца Мексиканская", price: 690, cat: "pizza" },
    { id: 115, name: "Пицца 4 сыра", price: 640, cat: "pizza" },
    { id: 116, name: "Пицца Салями", price: 640, cat: "pizza" },
    { id: 117, name: "Пицца с курицей и грибами", price: 640, cat: "pizza" },
    { id: 118, name: "Пицца с ветчиной и грибами", price: 640, cat: "pizza" },
    { id: 119, name: "Пицца Киниро", price: 790, cat: "pizza" },

    // --- ВОК, ГОРЯЧЕЕ И САЛАТЫ ---
    { id: 120, name: "Курица по-тайски", price: 290, cat: "wok" },
    { id: 121, name: "Салат Цезарь", price: 270, cat: "wok" },
    { id: 122, name: "Салат Чука", price: 150, cat: "wok" },
    { id: 123, name: "Мидии запечённые", price: 320, cat: "wok" },
    { id: 124, name: "Тепаньяки с морепродуктами", price: 310, cat: "wok" },
    { id: 125, name: "Тепаньяки с овощами", price: 240, cat: "wok" },
    { id: 126, name: "Тепаньяки с курицей", price: 320, cat: "wok" },
    { id: 127, name: "Харусаме с морепродуктами", price: 340, cat: "wok" },
    { id: 128, name: "Харусаме с овощами", price: 240, cat: "wok" },
    { id: 129, name: "Харусаме с курицей", price: 320, cat: "wok" },
    { id: 130, name: "Удон с морепродуктами", price: 340, cat: "wok" },
    { id: 131, name: "Удон с овощами", price: 240, cat: "wok" },
    { id: 132, name: "Удон с курицей", price: 320, cat: "wok" },

    // --- БУРГЕРЫ И ЗАКУСКИ ---
    { id: 133, name: "Бургер с курицей", price: 270, cat: "snacks" },
    { id: 134, name: "Бургер (острый)", price: 270, cat: "snacks" },
    { id: 135, name: "Бургер Классический", price: 270, cat: "snacks" },
    { id: 136, name: "Луковые кольца", price: 100, cat: "snacks" },
    { id: 137, name: "Кольца кальмара", price: 150, cat: "snacks" },
    { id: 138, name: "Картофель фри", price: 120, cat: "snacks" },
    { id: 139, name: "Картофель по-деревенски", price: 140, cat: "snacks" },
    { id: 140, name: "Наггетсы", price: 150, cat: "snacks" },
    { id: 141, name: "Эби фрай", price: 320, cat: "snacks" 
    // --- СОУСЫ И ДОБАВКИ ---
{ id: 142, name: "Имбирь", price: 30, cat: "sauces" },
{ id: 143, name: "Спайси соус", price: 90, cat: "sauces" },
{ id: 144, name: "Унаги соус", price: 60, cat: "sauces" },
{ id: 145, name: "Васаби", price: 25, cat: "sauces" },
{ id: 146, name: "Соевый соус", price: 40, cat: "sauces" },
{ id: 147, name: "Белый соус", price: 100, cat: "sauces" }
];
const categoryInfo = {
rolls: { label: "Роллы", icon: "🍣" },
sets: { label: "Сеты", icon: "🍱" },
pizza: { label: "Пицца", icon: "🍕" },
wok: { label: "Вок и салаты", icon: "🍜" },
snacks: { label: "Бургеры и закуски", icon: "🍔" },
sauces: { label: "Соусы и добавки", icon: "🥢" }
};
let cart = [];
let currentCategory = "all";
let searchQuery = "";
// ==========================================
// ЛОГИКА ДЛЯ КЛИЕНТСКОГО САЙТА (index.html)
// ==========================================
const menuGrid = document.getElementById("menu-grid");
if (menuGrid) {
function renderMenu() {
menuGrid.innerHTML = "";
const filtered = menuData.filter(item => {
const matchCat = currentCategory === "all" || item.cat === currentCategory;
const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
return matchCat && matchSearch;
});
if (filtered.length === 0) {
menuGrid.innerHTML = "Ничего не найдено. Попробуйте изменить запрос.";
return;
}
filtered.forEach(item => {
const catMeta = categoryInfo[item.cat];
const card = document.createElement("div");
card.className = "card";
card.innerHTML = <div> ${item.img  ? :${catMeta.icon}} <h3>${item.name}</h3> <div class="card-cat">${catMeta.label}</div> </div> <div> <div class="price">${item.price} ₽</div> <button class="btn-add" onclick="addToCart(${item.id})">В корзину</button> </div>;
menuGrid.appendChild(card);
});
}
document.querySelectorAll(".tab-btn").forEach(btn => {
btn.addEventListener("click", () => {
document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
btn.classList.add("active");
currentCategory = btn.dataset.cat;
renderMenu();
});
});
document.getElementById("search-input").addEventListener("input", (e) => {
searchQuery = e.target.value;
renderMenu();
});
window.addToCart = (id) => {
const existing = cart.find(c => c.id === id);
if (existing) {
existing.qty += 1;
} else {
const item = menuData.find(m => m.id === id);
cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
}
renderCart();
};
window.changeQty = (id, delta) => {
const index = cart.findIndex(c => c.id === id);
if (index === -1) return;
cart[index].qty += delta;
if (cart[index].qty <= 0) {
cart.splice(index, 1);
}
renderCart();
};
function renderCart() {
const cartList = document.getElementById("cart-items");
const totalEl = document.getElementById("total-price");
cartList.innerHTML = "";
let total = 0;
if (cart.length === 0) {
cartList.innerHTML = <li class="empty-cart">Корзина пуста</li>;
totalEl.textContent = "0";
return;
}
cart.forEach(item => {
const sum = item.price * item.qty;
total += sum;
const li = document.createElement("li");
li.innerHTML = <span>${item.name} (${sum} ₽)</span> <div class="qty-controls"> <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button> <strong>${item.qty}</strong> <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button> </div>;
cartList.appendChild(li);
});
totalEl.textContent = total;
}
document.getElementById("order-form").addEventListener("submit", async (e) => {
e.preventDefault();
if (cart.length === 0) return alert("Добавьте хотя бы одну позицию в корзину!");
const orderData = {
name: document.getElementById("client-name").value,
phone: document.getElementById("client-phone").value,
address: document.getElementById("client-address").value,
payment: document.getElementById("payment-method").value,
items: cart.map(item => ${item.name} × ${item.qty} шт. (${item.price * item.qty} ₽)),
totalPrice: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
status: "Новый",
createdAt: new Date().toLocaleString("ru-RU"),
timestamp: Date.now()
};
try {
await addDoc(collection(db, "orders"), orderData);
alert("Заказ принят! Ожидайте звонка оператора «Киниро Суши».");
cart = [];
renderCart();
e.target.reset();
} catch (error) {
console.error("Ошибка отправки:", error);
alert("Ошибка отправки: проверьте вкладку Rules в Firestore (должно быть allow read, write: if true;).");
}
});
renderMenu();
}
// ==========================================
// ЛОГИКА ДЛЯ ВАШЕЙ АДМИНКИ (admin.html)
// ==========================================
const ordersList = document.getElementById("orders-list");
if (ordersList) {
const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
ordersList.innerHTML = "";
if (snapshot.empty) {
ordersList.innerHTML = "Пока нет ни одного заказа.";
return;
}
snapshot.forEach((docSnap) => {
const order = docSnap.data();
const id = docSnap.id;
const isDone = order.status === "Выполнен";
const card = document.createElement("div");
card.className = order-card ${isDone ? "completed" : ""};
card.innerHTML = <h3>Заказ от ${order.createdAt}</h3> <p><strong>Статус:</strong> ${order.status}</p> <p><strong>Клиент:</strong> ${order.name}</p> <p><strong>Телефон:</strong> <a href="tel:${order.phone}">${order.phone}</a></p> <p><strong>Адрес:</strong> ${order.address}</p> <p><strong>Оплата:</strong> ${order.payment}</p> <div class="order-items"> <strong>Состав заказа:</strong><br> ${order.items.join("<br>")} </div> <p class="price">Итого: ${order.totalPrice} ₽</p> ${!isDone ?Отметить выполненным: ""};
ordersList.appendChild(card);
});
});
window.markAsDone = async (orderId) => {
const orderRef = doc(db, "orders", orderId);
await updateDoc(orderRef, { status: "Выполнен" });
};
}
