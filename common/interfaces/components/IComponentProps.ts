import {EventTypes} from "../enums/EventTypes";

export interface IComponentProps {
    name?: string;                                                      //-- имя компоненты
    event?: (name: string, type: EventTypes, data: any) => void;        //-- события происходящие в компоненте
    value?: any;                                                        //-- значение компоненты
    required?: boolean;                                                 //-- обязательно должно быть значение, если отсутствует то false
    disabled?: boolean;                                                 //-- заблокирован, если отсутствует то false
    className?: string;                                                 //-- заблокирован, если отсутствует то false
}
