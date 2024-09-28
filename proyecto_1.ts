export class Order {
    company: string;
    quantity: number;
    price: number;

    constructor(company: string, quantity: number, price: number) {
        this.company = company;
        this.quantity = quantity;
        this.price = price;
    }
}
