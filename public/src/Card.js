/**
 * Created by Abhishek Dasa.
 */
class Card{
    constructor(number,suit,player){
        this.number = (number === 1) ? 14 : number;
        this.suit = suit;
        this.player = player;
    }
}

export default Card;
