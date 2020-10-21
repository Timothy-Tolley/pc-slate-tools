export interface CartChange {
    variant: string;
    quantity: number;
}
export declare const changeCart: (changes: CartChange | CartChange[]) => Promise<unknown>;
export declare const changeCartCb: (changes: CartChange | CartChange[], callback?: any, errorCallback?: any) => void;
