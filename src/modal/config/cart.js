function Cart(oldCart) {

    this.items = oldCart.items || {};
    this.quanity = oldCart.quanity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    // method thêm
    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                Qty: 0,
                price: 0
            }
        }
        storedItem.Qty++;
        storedItem.price = storedItem.Qty * item.price;
        this.quanity++;
        this.totalPrice += storedItem.price;
    };

    this.addCount = function (count, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                Qty: 0,
                price: 0
            }
        }
        
        if (storedItem.Qty > count) {
            storedItem.Qty = count;
            storedItem.price = storedItem.Qty * this.items[id].price;
            this.quanity--;

        }

        if (storedItem.Qty < count) {
            storedItem.Qty = count;
            storedItem.price = storedItem.Qty * this.items[id].price;
            this.quanity++;
        }
        this.totalPrice += storedItem.price;
    };

    // method xóa
    this.delete = function (item, id) {
        var storedItem = this.items[id];
        storedItem.Qty--;
        this.quanity -= storedItem.Qty;
        this.totalPrice -= storedItem.price;
        delete this.items[id];
    }
}

module.exports = Cart;
