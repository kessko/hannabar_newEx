/**
 * Created by Work on 07-Feb-16.
 */
window.onload = function () {
    function initializeCharacter(characterName) {
        var currentCharacter = characterName === 'hero' ? hero : enemy;
        if (characterName != null) {
            $('#' + characterName + '-health').text(currentCharacter.helth);
            $('#' + characterName + '-attack-power').text(currentCharacter.getAttackPower());
            $('#' + characterName + '-strength').text(currentCharacter.strength);
            $('#' + characterName + '-name').text(currentCharacter.name);
        }

    }
    function Hero(name, baseStrength) {
        this.name;
        this.strength;
        this.helth = 800;
        this.strengthMultiplicator = 2;
        var attackPower = 8;
        this.increeseStrength = function (amount) {
            if (amount != null && typeof amount == 'number' && amount > 0) {
                this.strength += amount;
            }
            else {
                this.strength += this.strengthMultiplicator;
            }
            return this.strength;
        };
        this.setName = function (newName) {
            if (newName != null) {
                this.name = newName;
            }
        };
        this.getAttackPower = function () {
            return this.strength * attackPower;
        }

        if (name != null) {
            this.name = name;
        }
        if (baseStrength != null && typeof baseStrength == 'number' && baseStrength > 0) {
            this.strength = baseStrength;
        }
    }
    function Enemy(name, baseStrength) {
    }
    function restartGame() {
        hero = new Hero('Hanna', 20);
        enemy = new Enemy();

        initializeCharacter('hero');
        initializeCharacter('enemy');
    }
    function winTheGame() {
        alert('You win the game!');
        restartGame();
    }

    var hero = new Hero('Hanna', 20);
    Enemy.prototype = new Hero('Orc', 40);
    var enemy = new Enemy();

    initializeCharacter('hero');
    initializeCharacter('enemy');


    $('#hero-increase-strength').click(function () {
        var actualStrength = hero.increeseStrength();
        $('#hero-strength').text(actualStrength);
        $('#hero-attack-power').text(hero.getAttackPower());

    });
    $('#hero-attack').click(function () {
        var $avatar = $('.avatar.hero-avatar');
        $avatar.addClass('attack-animation');
        setTimeout(function () {
            $avatar.removeClass('attack-animation');
        }, 2000);
        var $enemyAvatar = $('.avatar.enemy-avatar');
        setTimeout(function () {
            $enemyAvatar.css('opacity', '0.4');

            var damage = hero.getAttackPower();
            var enemyHealth = enemy.helth;
            if ((enemyHealth - damage) <= 0) {
                enemy.helth = 0;
                initializeCharacter('enemy');
                winTheGame();
            }
            else {
                enemy.helth -= damage;
                initializeCharacter('enemy');
            }
        }, 1300);
        setTimeout(function () {
            $enemyAvatar.css('opacity', '1');
        }, 1800);


    });

};

//$('document').ready(function(){
//   console.log('aa');
//});