import { IColor } from './IColor';
export class SuccessColor implements IColor{


    public getColor() {

        return {
            'color': '#7FB800'
        };

    }

    public getBackground() {

        return {
            'background': '#7FB800'
        };

    }


}