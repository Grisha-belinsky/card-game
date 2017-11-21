/**
 * Created by Abhishek Dasa.
 */

export function convert_to_img_name(num,suit) {
    return "./src/images/" + num.toString() + suit[0] + ".gif";
}

export function  displayCards(card_data){
    let {player_name,cards_remaining,image_name} = card_data;
    let card_str = `<h1>${player_name} Card's</h1>
                    <div class='card-block'>
            <div class='card-count'>Cards remaining: <span id='player-${player_name}'>${cards_remaining}</span></div>
            <div class='card-container'>
            <img src="${image_name}" id='my-card' />
            </div>
            </div>`;
    return card_str;
}

export function playButton(){
    const playBtn = document.createElement("button");
    return `<button class="btn btn-lg btn-warning" id="play">Play!</button>`;
}

export function playBtnListener() {
    const play_btn = document.getElementById("play");

}


