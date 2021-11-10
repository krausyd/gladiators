let playerInfo = {
    name : getPlayerName(),
    health : 100,
    attack : 10,
    money : 10,
    reset : function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

let enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14),
        health: 50,
        shield: {
            type: "wood",
            strength: 10
        }
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14),
        health: 50,
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14),
        health: 50,
    }
];

var fightOrSkip = function() {
    var promptFight = "";
    do {
        promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // Conditional Recursive Function Call
        if (promptFight === "" || promptFight === null) {
            window.alert("You need to provide a valid answer! Please try again.");
            promptFight = null;
        }
    } while(!promptFight)

    if (promptFight && promptFight.trim().toLowerCase() === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
        } else {
            // if no (false), fight
            promptFight = "fight";
        }
    }
    return promptFight.toLowerCase();
};

var playerTurn = function(enemy) {
    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);

    // Log a resulting message to the console so we know that it worked.
    console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
    // check enemy's health
    if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        playerInfo.money = playerInfo.money + 20;
        return false;
    } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
        return true;
    }
};

var enemyTurn = function(enemy) {
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);

    // Log a resulting message to the console so we know that it worked.
    console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
    // check player's health
    if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        return false;
    } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        return true;
    }
};

var fight = function(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
        var promptFight = fightOrSkip();
        // if player choses to fight, then fight
        if (promptFight && promptFight.trim().toLowerCase() === "fight") {
            if (Math.random() > 0.5) {
                alert(playerInfo.name + " attacks first!");
                // generate random damage value based on player's attack power
                if (playerTurn(enemy)) {
                    enemyTurn(enemy);
                }
            }else {
                alert(enemy.name + " attacks first!");
                // generate random damage value based on player's attack power
                if (enemyTurn(enemy)) {
                    playerTurn(enemy);
                }
            }
        } else if (promptFight && promptFight.trim().toLowerCase() === "skip") {
            break;
        }
    }
};

function getPlayerName() {
    let name = "";
    while (!name) {
        name = prompt("What is your robot's name?");
    }

    return name;
}

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);
var startGame = function() {
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        console.log(playerInfo.health);
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the enemy.names array
            var enemy = enemyInfo[i];

            // reset enemy.health before starting new fight
            enemy.health = randomNumber(40, 60);

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(enemy);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                // if yes, take them to the store() function
                if (window.confirm("The fight is over, visit the store before the next round?")) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    if(window.confirm("Would you like to play again?")) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }

    endGame();
};

// function to generate a random numeric value
function randomNumber(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) ;

    return value;
};

// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

startGame();
