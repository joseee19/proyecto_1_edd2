import { Order } from './proyecto_1';

export class MaxHeapOrders {
    private heap: Order[];
    private n: number;

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public insert(order: Order): void {
        if (this.n == (this.heap.length - 1)) {
            this.resize(2 * this.heap.length);
        }
        this.n++;
        this.heap[this.n] = order;
        this.swap(this.n);
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2);
        while (i > 1 && this.heap[father].price < this.heap[i].price) {
            let temp: Order = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father;
            father = Math.floor(i / 2);
        }
    }

    private resize(newSize: number): void {
        let newHeap: Order[] = new Array(newSize);
        for (let i = 0; i < this.heap.length; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    public getMax(): Order {
        return this.heap[1]; 
    }

    public removeMax(): Order {
        let max: Order = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.n--;
        this.sink(1);
        return max; 
    }

    private sink(k: number): void {
        while (2 * k <= this.n) {
            let j: number = 2 * k;
            if (j < this.n && this.heap[j].price < this.heap[j + 1].price) {
                j++;
            }
            if (this.heap[k].price >= this.heap[j].price) {
                break;
            }
            let temp: Order = this.heap[k];
            this.heap[k] = this.heap[j];
            this.heap[j] = temp;
            k = j;
        }
    }
}
