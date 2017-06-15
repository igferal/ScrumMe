import { IColor } from './IColor';
export class ErrorColor implements IColor {

    public getColor() {

        return {
            'color': '#E04A1B'
        };

    }

    public getBackground() {

        return {
            'background': '#E04A1B'
        };

    }


}