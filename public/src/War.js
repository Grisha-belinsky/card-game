/**
 * Created by Abhishek Dasa.
 */

import Deck from './Deck';
import {displayCards,convert_to_img_name,playButton} from './utils';
import GH from './GamesHistory';
const gh = new GH();
class War{
    constructor(noOfPlayers){
        noOfPlayers = noOfPlayers || 2;
        this.deck = new Deck(noOfPlayers);
        this.deck.create();
        this.deck.shuffle();
        this.deck.deal();
        this.tieCards = [];
    }

    resetTieCards(){
        this.tieCards = [];
    }

    play(){
        const cardsContainer = document.getElementById("cards-container");
        const play_btn = document.getElementById("play");
        const start_btn = document.getElementById("start");
        const playersDiv = document.getElementById("playersDiv");
        const players_input = document.getElementById("players");

        let deck = this.deck,
            self = this,
            war_result = this.deck.is_war(),
            //sorted order
            cards = war_result.cards,
            //previous order
            order = war_result.newCards,
            tieCards = this.tieCards;
        if(war_result.winner){
            debugger;
            cardsContainer.innerHTML = war_result.winner + ' won the game';
            gh.add(war_result.winner);
            gh.show();
            playersDiv.style = "display:block";
            //play_btn.disabled = true;
            start_btn.disabled = false;
            players_input.disabled = false;
            return true;
        }
        cardsContainer.innerHTML = '';
        let player;
        if(cards && cards.length){
            player = cards[0].player;
        }
        order.forEach((card)=>{
            if(card){
                let temp_data = {
                    player_name : card.player,
                    cards_remaining : deck.cards_player_map[card.player].length,
                    image_name : convert_to_img_name(card.number,card.suit[0])
                };
                let temp_html = displayCards(temp_data);
                if(player === card.player){
                    temp_html += playButton();
                }
                cardsContainer.innerHTML = cardsContainer.innerHTML + temp_html;
            }
        });
        if(cards && cards.length){
            let player_map = this.deck.cards_player_map[player];
            if(war_result.result){
                if(tieCards.length > 0){
                    tieCards.forEach((card)=>{
                        card.player = player;
                        player_map.push(card);
                    });
                    self.resetTieCards();
                }
                cards.forEach((card)=>{
                    card.player = player;
                    player_map.push(card);
                });
            }else{
                let holdCards = war_result.holdCards;
                //handle here incase of tie cards
                order.forEach((card)=>{
                    card.player = player;
                    tieCards.push(card);
                });
                holdCards.forEach((card)=>{
                    if(card){
                        card.player = player;
                        tieCards.push(card);
                    }
                });
            }
        }

    }
}

export default War;
