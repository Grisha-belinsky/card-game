/**
 * Created by Abhishek Dasa.
 */
import Card from "./Card";
import {SUITS} from "./constants";
class Deck{
    constructor(noOfPlayers){
        this.deck = [];
        this.players = noOfPlayers;
        this.cards_player_map ={};
        this.player_names = [];
        this.cards_count = 0;
    }

    /*
    create a deck of cards
     */
    create(){
        let deck = this.deck;
        for(let i=0;i<SUITS.length;i++){
            let suit = SUITS[i];
            for(let j =0;j<13;j++){
                let card = new Card(j+1,suit);
                deck.push(card);
            }
        }
    }

    /*
    A method to shuffle cards in the deck
     */
    shuffle(){
        let deck = this.deck;
        let currentIndex = deck.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle
        while (0 !== currentIndex) {

            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = temporaryValue;
        }

        return deck;
    }

    deal(){
        const no_of_players = this.players;
        let deck_count = this.deck.length,
            cards_count = (deck_count - (deck_count%no_of_players)),
            card_player_map = this.cards_player_map;
        //console.log("cards count",cards_count);
        this.cards_count = cards_count;
        for(let i = 0; i < cards_count; i++){
            let card = this.deck[i];
            //for ordering cards after shuffling
            let player_id = ((i+1)%(no_of_players) == 0) ? no_of_players : (i+1)%(no_of_players);
            player_id = "PLAYER" + player_id;
            card.player = player_id;
            if(!card_player_map[player_id]){
                this.player_names.push(player_id);
                card_player_map[player_id] = [card];
            }else{
                card_player_map[player_id].push(card);
            }
        }
    }

    is_war(){
        let cards = [],
            newCards = [],
            holdCards = [],
            player_names = this.player_names,
            cards_player_map = this.cards_player_map,
            isGameCompleted = false,
            winner,
            result = false;

        player_names.forEach((player_name)=>{
            if(cards_player_map[player_name].length !== this.cards_count){
                let card = cards_player_map[player_name].shift();
                //push into array only if element exists
                if(card){
                    cards.push(card);
                    newCards.push(card);
                }
            }else{
                isGameCompleted = true;
                winner = player_name;
            }
        });

        cards.sort((a,b)=>{
           return (b.number - a.number);
        });
        let count = 0;
        cards.forEach((card) => {
            if(card.number == cards[0].number){
                count++;
            }
        });
        let allEqual = (cards.length == count);
        //count = cards.length;
        //Incase of all numbers are equal
        if(allEqual){
            //debugger;
            player_names.forEach((player_name)=>{
                let card = cards_player_map[player_name].shift();
                holdCards.push(card);
            });
        }else{
            result = true;
            holdCards = [];
        }

        return {result,cards,newCards,holdCards,isGameCompleted,winner};
    }
}

export default Deck;
