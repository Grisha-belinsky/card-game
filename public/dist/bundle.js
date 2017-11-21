/******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId])
        /******/ 			return installedModules[moduleId].exports;
        /******/
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			i: moduleId,
            /******/ 			l: false,
            /******/ 			exports: {}
            /******/ 		};
        /******/
        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/ 		module.l = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// identity function for calling harmony imports with the correct context
    /******/ 	__webpack_require__.i = function(value) { return value; };
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
        /******/ 		if(!__webpack_require__.o(exports, name)) {
            /******/ 			Object.defineProperty(exports, name, {
                /******/ 				configurable: false,
                /******/ 				enumerable: true,
                /******/ 				get: getter
                /******/ 			});
            /******/ 		}
        /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
        /******/ 		var getter = module && module.__esModule ?
            /******/ 			function getDefault() { return module['default']; } :
            /******/ 			function getModuleExports() { return module; };
        /******/ 		__webpack_require__.d(getter, 'a', getter);
        /******/ 		return getter;
        /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 5);
    /******/ })
/************************************************************************/
/******/ ([
    /* 0 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Deck__ = __webpack_require__(2);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(6);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GamesHistory__ = __webpack_require__(3);
        /**
         * Created by Abhishek Dasa.
         */




        const gh = new __WEBPACK_IMPORTED_MODULE_2__GamesHistory__["a" /* default */]();
        class War {
            constructor(noOfPlayers) {
                noOfPlayers = noOfPlayers || 2;
                this.deck = new __WEBPACK_IMPORTED_MODULE_0__Deck__["a" /* default */](noOfPlayers);
                this.deck.create();
                this.deck.shuffle();
                this.deck.deal();
                this.tieCards = [];
            }

            resetTieCards() {
                this.tieCards = [];
            }

            play() {
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
                if (war_result.winner) {
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
                if (cards && cards.length) {
                    player = cards[0].player;
                }
                order.forEach(card => {
                    if (card) {
                        let temp_data = {
                            player_name: card.name,
                            cards_remaining: deck.cards_player_map[card.player].length,
                            image_name: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* convert_to_img_name */])(card.number, card.suit[0])
                        };
                        let temp_html = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* displayCards */])(temp_data);
                        if (player === card.player) {
                            temp_html += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* playButton */])();
                        }
                        cardsContainer.innerHTML = cardsContainer.innerHTML + temp_html;
                    }
                });
                if (cards && cards.length) {
                    let player_map = this.deck.cards_player_map[player];
                    if (war_result.result) {
                        if (tieCards.length > 0) {
                            tieCards.forEach(card => {
                                card.player = player;
                                player_map.push(card);
                            });
                            self.resetTieCards();
                        }
                        cards.forEach(card => {
                            card.player = player;
                            player_map.push(card);
                        });
                    } else {
                        let holdCards = war_result.holdCards;
                        //handle here incase of tie cards
                        order.forEach(card => {
                            card.player = player;
                            tieCards.push(card);
                        });
                        holdCards.forEach(card => {
                            if (card) {
                                card.player = player;
                                tieCards.push(card);
                            }
                        });
                    }
                }
            }
        }

        /* harmony default export */ __webpack_exports__["a"] = (War);

        /***/ }),
    /* 1 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /**
         * Created by Abhishek Dasa.
         */
        class Card {
            constructor(number, suit, player) {
                this.number = number === 1 ? 14 : number;
                this.suit = suit;
                this.player = player;
            }
        }

        /* harmony default export */ __webpack_exports__["a"] = (Card);

        /***/ }),
    /* 2 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Card__ = __webpack_require__(1);
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(4);
        /**
         * Created by Abhishek Dasa.
         */


        class Deck {
            constructor(noOfPlayers) {
                this.deck = [];
                this.players = noOfPlayers;
                this.cards_player_map = {};
                this.player_names = [];
                this.names = arr;
                this.cards_count = 10;
            }

            /*
             create a deck of cards
             */
            create() {
                let deck = this.deck;
                for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* SUITS */].length; i++) {
                    let suit = __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* SUITS */][i];
                    for (let j = 0; j < 13; j++) {
                        let card = new __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* default */](j + 1, suit);
                        deck.push(card);
                    }
                }
            }

            /*
             A method to shuffle cards in the deck
             */
            shuffle() {
                let deck = this.deck;
                let currentIndex = deck.length,
                    temporaryValue,
                    randomIndex;

                // While there remain elements to shuffle
                while (0 !== currentIndex) {

                    // Pick a remaining element
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    console.log('randome index');
                    console.log(randomIndex);

                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = deck[currentIndex];
                    deck[currentIndex] = deck[randomIndex];
                    deck[randomIndex] = temporaryValue;
                }

                return deck;
            }

            deal() {
                const no_of_players = this.players;
                let deck_count = this.deck.length,
                    cards_count = deck_count - deck_count % no_of_players,
                    card_player_map = this.cards_player_map;
                //console.log("cards count",cards_count);
                this.cards_count = cards_count;
                for (let i = 0; i < cards_count; i++) {
                    let card = this.deck[i];
                    //for ordering cards after shuffling
                    let player_id = (i + 1) % no_of_players == 0 ? no_of_players : (i + 1) % no_of_players;
                    player_id = "PLAYER" + player_id;
                    card.player = player_id;
                    console.log(this.names);
                    card.name = this.names[i];
                    if (!card_player_map[player_id]) {
                        this.player_names.push(player_id);
                        card_player_map[player_id] = [card];
                    } else {
                        card_player_map[player_id].push(card);
                    }
                }
            }

            is_war() {
                let cards = [],
                    newCards = [],
                    holdCards = [],
                    player_names = this.player_names,
                    names = this.names,
                    cards_player_map = this.cards_player_map,
                    isGameCompleted = false,
                    winner,
                    result = false,
                    counter = 0;

                player_names.forEach(player_name => {
                    if(cards_player_map[player_name].length == 0)
                    {
                        isGameCompleted = true;
                        winner = this.names[counter];
                        socket.emit('winner', {data: winner });
                        return;
                    }
                    console.log(player_name);
                    if (cards_player_map[player_name].length !== this.cards_count) {
                        let card = cards_player_map[player_name].shift();
                        //push into array only if element exists
                        if (card) {
                            console.log('my things==================================');
                            console.log(counter);
                            console.log(card);
                            console.log(this.names[counter]);
                            card.name = this.names[counter];
                            cards.push(card);
                            newCards.push(card);
                            counter = counter+1;
                            console.log(counter);
                        }
                    } else {
                        counter = counter+1;
                        isGameCompleted = true;
                        winner = this.names[counter];
                        socket.emit('winner', {data: winner })
                    }
                });

                cards.sort((a, b) => {
                    return b.number - a.number;
                });
                let count = 0;
                cards.forEach(card => {
                    if (card.number == cards[0].number) {
                        count++;
                    }
                });
                let allEqual = cards.length == count;
                //count = cards.length;
                //Incase of all numbers are equal
                if (allEqual) {
                    //debugger;
                    player_names.forEach(player_name => {
                        let card = cards_player_map[player_name].shift();
                        holdCards.push(card);
                    });
                } else {
                    result = true;
                    holdCards = [];
                }

                return { result, cards, newCards, holdCards, isGameCompleted, winner };
            }
        }

        /* harmony default export */ __webpack_exports__["a"] = (Deck);

        /***/ }),
    /* 3 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /**
         * Created by Sravanthi on 4/2/2017.
         */
        const storage = window.localStorage;

        class GemesHistory {
            constructor() {
                storage.setItem("games", "[]");
            }

            add(player_name) {
                let games = storage.getItem("games"),
                    count;
                games = JSON.parse(games);
                count = games.length;
                games.push({ player_name, count: count + 1 });
                storage.setItem("games", JSON.stringify(games));
            }

            clear() {
                storage.setItem("games", "[]");
            }

            show() {
                const gh_dom = document.getElementById("game_history");
                gh_dom.style = "display:block";
                let games = storage.getItem("games");
                games = JSON.parse(games);
                gh_dom.innerHTML = '<h2>Game History</h2>';
                games.forEach(game => {
                    const { count, player_name } = game;
                    gh_dom.innerHTML += `<li>Game ${count} won by ${player_name}</li>`;
                });
            }
        }
        /* harmony export (immutable) */ __webpack_exports__["a"] = GemesHistory;


        /***/ }),
    /* 4 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /**
         * Created by Abhishek Dasa.
         */
        const SUITS = ['hearts', 'diamonds', 'spades', 'clubs'];
        /* harmony export (immutable) */ __webpack_exports__["a"] = SUITS;


        /***/ }),
    /* 5 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__War__ = __webpack_require__(0);
        /**
         * Created by Abhishek Dasa.
         */



        let war;
        const play_btn = document.getElementById("play");
        const start_btn = document.getElementById("start");
        const players_input = document.getElementById("players");
        const playersDiv = document.getElementById("playersDiv");
        const gh_dom = document.getElementById("game_history");

        start_btn.addEventListener("click", evt => {
            evt.preventDefault();
            let players_count = players_input.value;
            //play_btn.disabled = false;
            start_btn.disabled = true;
            playersDiv.style = "display:none";
            gh_dom.style = "display:none";
            war = new __WEBPACK_IMPORTED_MODULE_0__War__["a" /* default */](players_count);
            war.play();
        });

        document.querySelector('body').addEventListener('click', function (event) {
            console.log("event====>", event.target.id);
            if (event.target.id === 'play') {
                // do your action on your 'li' or whatever it is you're listening for
                event.preventDefault();
                if (war) war.play();
            }
        });

        /***/ }),
    /* 6 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* harmony export (immutable) */ __webpack_exports__["a"] = convert_to_img_name;
        /* harmony export (immutable) */ __webpack_exports__["b"] = displayCards;
        /* harmony export (immutable) */ __webpack_exports__["c"] = playButton;
        /* unused harmony export playBtnListener */
        /**
         * Created by Abhishek Dasa.
         */

        function convert_to_img_name(num, suit) {
            return "./src/images/" + num.toString() + suit[0] + ".gif";
        }

        function displayCards(card_data) {
            let { player_name, cards_remaining, image_name } = card_data;
            let card_str = `<h1>${player_name} Card's</h1>
                    <div class='card-block'>
            <div class='card-count'>Cards remaining: <span id='player-${player_name}'>${cards_remaining}</span></div>
            <div class='card-container'>
            <img src="${image_name}" id='my-card' />
            </div>
            </div>`;
            return card_str;
        }

        function playButton() {
            const playBtn = document.createElement("button");
            return `<button class="btn btn-lg btn-warning" id="play">Play!</button>`;
        }

        function playBtnListener() {

            const play_btn = document.getElementById("play");
        }

        /***/ })
    /******/ ]);