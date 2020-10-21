export interface LineItemProperties {
    [key: string]: string;
}
export declare const addToCart: (variant: number, quantity?: number, properties?: LineItemProperties) => Promise<unknown>;
export declare const addToCartCB: (variant: number, quantity?: number, properties?: LineItemProperties, callback?: any, errorCallback?: any) => void;
