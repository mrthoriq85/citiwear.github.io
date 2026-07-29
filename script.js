//  <!-- JAVASCRIPT LOGIC (Unchanged functionality) -->
function shopApp() {
  return {
    cartOpen: false,
    quickViewOpen: false,
    currentCategory: "all",
    selectedProduct: {},
    selectedSize: "m",
    selectedColor: "",
    selectedColorImage: "",
    quantity: 1,
    whatsappNumber: "6281238810175",

    products: [
      {
        id: 1,
        category: "tshirt",
        categorylink: "tshirt",
        categoryName: "T-Shirt",
        name: "Baju Polos 24s Combed Premium",
        price: 40000,
        image: "img/baju/cover.png",
        colorOptions: [
          { name: "Putih", image: "img/baju/Putih.png" },
          // { name: "Abu Tua", image: "img/baju/Abu_tua.jpg" },
          { name: "Hitam", image: "img/baju/Hitam.png" },
          // { name: "Maroon", image: "img/baju/Maroon.jpg" },
          { name: "Navy", image: "img/baju/Navy.png" },
        ],
        desc: "Kaos berbahan katun preshrunk 24s combed berat premium yang tebal namun tetap adem dipakai seharian di perkotaan.",
      },
      {
        id: 2,
        category: "tshirt",
        categorylink: "longtshirt",
        categoryName: "Long T-Shirt",
        name: "Baju Polos LP 24s Combed Premium",
        price: 50000,
        image: "img/panjang/cover.png",
        colorOptions: [
          { name: "Putih", image: "img/panjang/Putih.png" },
          { name: "Hitam", image: "img/panjang/Hitam.png" },
          // { name: "Milo", image: "img/panjang/Milo.png" },
        ],
        desc: "Kaos panjang berbahan katun preshrunk 24s combed premium yang tebal namun tetap adem dipakai seharian di perkotaan.",
      },
      {
        id: 3,
        category: "tshirt",
        categorylink: "stripedtshirt",
        categoryName: "Striped T-Shirt",
        name: "Baju Striped 24s Combed Premium",
        price: 50000,
        image: "img/strip/cover.png",
        colorOptions: [
          { name: "Maroon", image: "img/strip/maroon.jpg" },
          { name: "Putih", image: "img/strip/putih.jpg" },
          { name: "Hitam", image: "img/strip/hitam.jpg" },
          { name: "Kuning", image: "img/strip/kuning.jpg" },
        ],
        desc: "Kaos bergaris berbahan katun preshrunk 24s combed premium yang tebal namun tetap adem dipakai seharian di perkotaan.",
      },
      // {
      //   id: 4,
      //   category: "pants",
      //   categorylink: "pants",
      //   categoryName: "Pants",
      //   name: "Celana Chino Rileks",
      //   price: 70000,
      //   image: "img/celana/hitam.jpg",
      //   colorOptions: [
      //     { name: "Hitam", image: "img/celana/hitam.jpg" },
      //     { name: "Cream", image: "img/celana/cream.jpg" },
      //   ],
      //   desc: "Celana chino berpotongan lurus rileks dengan karet elastis tersembunyi di bagian pinggang demi mobilitas fleksibel.",
      // },
    ],

    cart: [],

    filteredProducts() {
      return this.currentCategory === "all"
        ? this.products
        : this.products.filter((p) => p.category === this.currentCategory);
    },
    openQuickView(product) {
      console.log("Mengarahkan ke halaman kategori:", product.categorylink);

      // Hasilnya akan menjadi: tshirt.html
      window.location.href = product.categorylink + ".html";
    },
    addToCartFromModal() {
      const itemToCart = {
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        price: this.selectedProduct.price,
        image: this.selectedColorImage,
        size: this.selectedSize,
        color: this.selectedColor,
      };

      const existingIndex = this.cart.findIndex(
        (item) =>
          item.id === itemToCart.id &&
          item.size === itemToCart.size &&
          item.color === itemToCart.color,
      );

      if (existingIndex > -1) {
        this.cart[existingIndex].quantity += this.quantity; 
        } else {
        this.cart.push({ ...itemToCart, quantity: this.quantity });
        }

      this.quickViewOpen = false;
      this.cartOpen = true;
    },
    updateQuantity(index, amount) {
      this.cart[index].quantity += amount;
      if (this.cart[index].quantity <= 0) this.removeFromCart(index);
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    cartTotal() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
    formatRupiah(number) {
      if (number === undefined || number === null || isNaN(number)) {
        return "Rp 0";
      }
      return "Rp " + number.toLocaleString("id-ID");
    },
    checkoutWhatsApp() {
      let message = `*FORMAT ORDER - CITIWEAR.BASIC*\n===============================\n\nHalo Admin, saya ingin memesan:\n\n`;
      this.cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n   - Warna: ${item.color}\n   - Ukuran: ${item.size.toUpperCase()}\n   - Qty: ${item.quantity} pcs\n   - Harga: ${this.formatRupiah(item.price * item.quantity)}\n\n`;
      });
      message += `===============================\n*TOTAL TAGIHAN:* ${this.formatRupiah(this.cartTotal())}\n\nMohon rincian ongkos kirimnya ya Min. Terima kasih!`;
      window.open(
        `https://api.whatsapp.com/send?phone=${this.whatsappNumber}&text=${encodeURIComponent(message)}`,
        "_blank",
      );
    },
  };
}
