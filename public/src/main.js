/**
 * Created by Abhishek Dasa.
 */

import War from './War';

let war;
const play_btn = document.getElementById("play");
const start_btn = document.getElementById("start");
const players_input = document.getElementById("players");
const playersDiv = document.getElementById("playersDiv");
const gh_dom = document.getElementById("game_history");

start_btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    let players_count = players_input.value;
    //play_btn.disabled = false;
    start_btn.disabled = true;
    playersDiv.style = "display:none";
    gh_dom.style = "display:none";

    war = new War(players_count);
    war.play();
});

document.querySelector('body').addEventListener('click', function(event) {
    console.log("event====>",event.target.id);
    if (event.target.id === 'play') {
        // do your action on your 'li' or whatever it is you're listening for
        event.preventDefault();
        if(war)
            war.play();
    }
});
