export declare const CART_QUEUE: any[];
export declare const FINISH_TRIGGERS: FinishTrigger[];
export interface FinishTrigger {
    event: string;
    data: any;
}
export declare const addTask: (task: any) => void;
export declare const removeTask: (task: any) => any[];
export declare const errorQueue: () => void;
export declare const addFinishTrigger: (trigger: FinishTrigger) => void;
export declare const removeFinishTrigger: (trigger: FinishTrigger) => void;
export declare const nextTask: () => void;
