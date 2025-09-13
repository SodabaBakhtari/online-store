//1 product list 

const products = [
  { id: 1, name: "لپ تاپ", price: 1200, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
  { id: 2, name: "جدید ترین مدل آیفون", price: 1099, image: "iphone 17.jpg" },
  { id: 3, name: "گوشکی / آیرپاد", price: 400, image: "airpods.jpg" },
  { id: 4, name: "ماوس", price: 50, image: "mouse.jpg" },
  { id: 5, name: "کیبورد", price: 30, image: "keyboard.jpg" },
  { id: 6, name: "دیسکتاپ جدید", price: 2000, image: "desktop.jpg" }
];

//2 add cart
  const addToCart = (id) => {
    const product = products.find(p => p.id === id)
    const item = cart.find(i=> i.id === id)
    if (item) {
      item.quantity++
    } else {
      cart.push({ ...product, quantity: 1})
    }
  saveCart()
  shopCart()
  showNotification(`${product.name} به سبد خرید اضافه شود`)
  }

// shop product
const productList = document.getElementById("product-list")
const shopProducts = (item) => {
    if (item.length === 0) {
        productList.innerHTML = '<div class="empty-cart">محصولی یافت نشد</div>'    
   return;
 }

  productList.innerHTML = item.map(p => 
   `<div class="product">
        <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p>قیمت: $${p.price}</p>
                <button onclick="addToCart(${p.id})">افزودن به سبد خرید</button>
             </div>
    </div>
      `).join("");
    };
    shopProducts(products);

// shop cart

const cartDiv = document.getElementById("cart")
const totalDiv = document.getElementById("total")

const shopCart = () => {
   if (cart.length === 0) {
    cartDiv.innerHTML= '<div class="empty-cart">سبد خرید خالی است</div>'
  totalDiv.innerHTML = '';
  return
}
//3 cart display
cartDiv.innerHTML = cart.map(item => 
  `<div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price} * ${item.quantity} = $${item.price * item.quantity}</p>
   </div>
   <div class="cart-item-actions">
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <button class="remove-btn" onclick="removeItem(${item.id})">حذف</button>
    </div>
  </div>`
).join("");
//4 total price 
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0 )
  totalDiv.textContent = `مجموع:$${total}`;
}
//  change quantity
const changeQuantity = (id, delta) => {
  const item = cart.find(i => i.id === id)
  if (!item) return

   item.quantity += delta;
    if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart()
  shopCart()
}
//5 Cart Array ioad from localStorage  
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// remove part 
const removeItem = (id) => {
  const item = cart.find(i => i.id === id)
  cart = cart.filter(i => i.id !== id)

  saveCart()
  shopCart()
  showNotification(`${item.name} از سبد خرید حذف شد`)

}

// save to localStorage
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// -- bonus-- search part
document.getElementById("search").addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchValue));
  shopProducts(filtered);
})

// -- bonus-- show notification
  const showNotification = (massage) =>{
    const Notification = document.getElementById("notification")
    Notification.textContent = massage;
    Notification.classList.add("show")

    setTimeout(() => {
      Notification.classList.remove("show");}, 3000)
  }

// show cart
    shopCart();