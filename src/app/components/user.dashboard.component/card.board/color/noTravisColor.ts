import { IColor } from './IColor';
export class NoTravisColor implements IColor{


    public getColor() {

        return {
            'color': '#FFB400'
        };

    }

    public getBackground() {

        return {
            'background': '#FFB400'
        };

    }


}