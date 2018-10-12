import {CheckStates} from "../enums/CheckStates";

export interface IComponentForm {
    getValue():any;                             //-- получение значения компоненты
    setValue(value: any);                       //-- установка значения компоненты
    getStatus():any;                            //-- получение состояния компоненты
    checkState(states: CheckStates[])           //-- проверка состояния компонента
}
