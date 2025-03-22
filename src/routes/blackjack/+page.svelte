<script lang="ts">
    import { onMount } from "svelte";
    
    let dealerSum = 0;
    let yourSum = 0;
    
    let dealerAceCount = 0;
    let yourAceCount = 0;
    
    let hidden: string;
    let deck: string[] = [];
    
    let canHit = true;
    let dealerCards: string[] = [];
    let yourCards: string[] = [];
    let message = "";
    
    onMount(() => {
        buildDeck();
        shuffleDeck();
        startGame();
    });
    
    function buildDeck() {
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let types = ["C", "D", "H", "S"];
        deck = [];
    
        for (let type of types) {
            for (let value of values) {
                deck.push(`${value}-${type}`);
            }
        }
    }
    
    function shuffleDeck() {
        for (let i = 0; i < deck.length; i++) {
            let j = Math.floor(Math.random() * deck.length);
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
    
    function startGame() {
        dealerCards = [];
        yourCards = [];
        dealerSum = 0;
        yourSum = 0;
        dealerAceCount = 0;
        yourAceCount = 0;
        canHit = true;
        message = "";
    
        hidden = deck.pop()!;
        dealerSum += getValue(hidden);
        dealerAceCount += checkAce(hidden);
        while (dealerSum < 17) {
            let card = deck.pop()!;
            dealerCards.push(card);
            dealerSum += getValue(card);
            dealerAceCount += checkAce(card);
        }
    
        for (let i = 0; i < 2; i++) {
            let card = deck.pop()!;
            yourCards.push(card);
            yourSum += getValue(card);
            yourAceCount += checkAce(card);
        }
    }
    
    function hit() {
        if (!canHit) return;
    
        let card = deck.pop()!;
        yourCards.push(card);
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
    
        if (reduceAce(yourSum, yourAceCount) > 21) {
            canHit = false;
        }
    }
    
    function stay() {
        dealerSum = reduceAce(dealerSum, dealerAceCount);
        yourSum = reduceAce(yourSum, yourAceCount);
    
        canHit = false;
    
        if (yourSum > 21) {
            message = "You Lose! L!";
        } else if (dealerSum > 21) {
            message = "You win! Only beginners luck!";
        } else if (yourSum === dealerSum) {
            message = "Tied up twat!";
        } else if (yourSum > dealerSum) {
            message = "You won this time but next time i will win and take all of your money and you will be poor muhahhahahahahha!";
        } else {
            message = "You Lose! Muhahhahahahah!";
        }
    }
    
    function getValue(card: string): number {
        let value = card.split("-")[0];
        if (isNaN(Number(value))) {
            return value === "A" ? 11 : 10;
        }
        return parseInt(value);
    }
    
    function checkAce(card: string): number {
        return card.startsWith("A") ? 1 : 0;
    }
    
    function reduceAce(playerSum: number, playerAceCount: number): number {
        while (playerSum > 21 && playerAceCount > 0) {
            playerSum -= 10;
            playerAceCount -= 1;
        }
        return playerSum;
    }
    </script>
    
    <style>
        img {
            width: 80px;
            height: auto;
            margin: 5px;
        }
        div {
            display: flex;
            gap: 5px;
        }
    </style>
    
    <main>
        <h1>Blackjack</h1>
        <button on:click={startGame}>Starta spelet</button>
        <button on:click={hit} disabled={!canHit}>Hit</button>
        <button on:click={stay} disabled={!canHit}>Stay</button>
    
        <h2>Dealer's Cards</h2>
        <div>
            <img src={"/cards/" + hidden + ".png"} alt="Hidden Card" />
            {#each dealerCards as card}
                <img src={"/cards/" + card + ".png"} alt={card} />
            {/each}
        </div>
    
        <h2>Your Cards</h2>
        <div>
            {#each yourCards as card}
                <img src={"/cards/" + card + ".png"} alt={card} />
            {/each}
        </div>
    
        <h3>Dealer Sum: {dealerSum}</h3>
        <h3>Your Sum: {yourSum}</h3>
        <h2>{message}</h2>
    </main>