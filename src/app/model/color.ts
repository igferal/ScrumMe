export class Color{



constructor(private background :string, private color : string){

}

public getBackground(){
    return {
        background : this.background
    }
}


public getColor(){
    return {
        color : this.color
    }
}


}