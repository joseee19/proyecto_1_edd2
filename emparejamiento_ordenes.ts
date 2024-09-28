import { Order } from "./proyecto_1";
import { MaxHeapOrders } from "./ordenes_compra";
import { MinHeapOrders } from "./ordenes_venta";

class MarketSimulator {
    private buyHeap: MaxHeapOrders;
    private sellHeap: MinHeapOrders;
    private transactionHistory: any[];

    constructor() {
        this.buyHeap = new MaxHeapOrders(10);
        this.sellHeap = new MinHeapOrders(10);
        this.transactionHistory = [];
    }

    private matchOrders(): void {
        while (this.buyHeap.getMax() && this.sellHeap.getMin()) {
            let buyOrder = this.buyHeap.getMax();
            let sellOrder = this.sellHeap.getMin();

            if (buyOrder.price >= sellOrder.price) {
                let transactionQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);
                let transactionPrice = sellOrder.price;

                this.transactionHistory[this.transactionHistory.length] = {
                    empresa: buyOrder.company,
                    cantidad: transactionQuantity,
                    precio: transactionPrice,
                    comprador: buyOrder,
                    vendedor: sellOrder
                };

                console.log(`${transactionQuantity} acciones de ${buyOrder.company} intercambiadas a un precio de ${transactionPrice} por acción.`);

                buyOrder.quantity -= transactionQuantity;
                sellOrder.quantity -= transactionQuantity;

                if (buyOrder.quantity === 0) {
                    this.buyHeap.removeMax(); 
                }
                if (sellOrder.quantity === 0) {
                    this.sellHeap.removeMin(); 
                }
            } else {
                break;
            }
        }
    }

    public getTransactionHistory(): any[] {
        return this.transactionHistory;
    }

    public addBuyOrder(order: Order): void {
        this.buyHeap.insert(order);
        this.matchOrders();
    }

    public addSellOrder(order: Order): void {
        this.sellHeap.insert(order);
        this.matchOrders();
    }
}


let simulator = new MarketSimulator();
simulator.addBuyOrder(new Order("Amazon", 100, 48));
simulator.addBuyOrder(new Order("Google", 50, 55));
simulator.addBuyOrder(new Order("Microsoft", 75, 52));
simulator.addSellOrder(new Order("Amazon", 80, 47));
simulator.addSellOrder(new Order("Google", 50, 56));
simulator.addSellOrder(new Order("Microsoft", 100, 50));

console.log("Historial de transacciones: ", simulator.getTransactionHistory());