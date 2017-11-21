/**
 * Created by Abhishek Dasa.
 */
const storage = window.localStorage;

export default class GemesHistory{
    constructor(){
        storage.setItem("games","[]");
    }

    add(player_name){
        let games = storage.getItem("games"),count;
        games = JSON.parse(games);
        count = games.length;
        games.push({player_name,count : count + 1});
        storage.setItem("games",JSON.stringify(games));
    }

    clear(){
        storage.setItem("games","[]");
    }

    show(){
        const gh_dom = document.getElementById("game_history");
        gh_dom.style = "display:block";
        let games = storage.getItem("games");
        games = JSON.parse(games);
        gh_dom.innerHTML = '<h2>Game History</h2>';
        games.forEach((game)=>{
            const {count,player_name} = game;
            gh_dom.innerHTML += `<li>Game ${count} won by ${player_name}</li>`;
        })
    }
}