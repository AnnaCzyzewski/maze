import Phaser from "phaser";

export default class LevelScene extends Phaser.Scene {

    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    yellow = 0xfff700;
    black = 0x000000;

    oneRecord;
    twoRecord;
    threeRecord;
    fourRecord;
    fiveRecord;
    sixRecord;
    sevenRecord;
    eightRecord;
    nineRecord;
    tenRecord;
    elevenRecord;
    twelveRecord;

    // zeroThruTwelve = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

    constructor() {
        super({key:'levelScene'});
    }

    init(data) {

        // Retrieves records: Gets the value stored in localStorage, or 0 if nothing is found
        this.oneRecord = parseInt(localStorage.getItem('oneRecord')) || null;
        this.twoRecord = parseInt(localStorage.getItem('twoRecord')) || null;
        this.threeRecord = parseInt(localStorage.getItem('threeRecord')) || null;
        this.fourRecord = parseInt(localStorage.getItem('fourRecord')) || null;
        this.fiveRecord = parseInt(localStorage.getItem('fiveRecord')) || null;
        this.sixRecord = parseInt(localStorage.getItem('sixRecord')) || null;
        this.sevenRecord = parseInt(localStorage.getItem('sevenRecord')) || null;
        this.eightRecord = parseInt(localStorage.getItem('eightRecord')) || null;
        this.nineRecord = parseInt(localStorage.getItem('nineRecord')) || null;
        this.tenRecord = parseInt(localStorage.getItem('tenRecord')) || null;
        this.elevenRecord = parseInt(localStorage.getItem('elevenRecord')) || null;
        this.twelveRecord = parseInt(localStorage.getItem('twelveRecord')) || null;

        // Sets new record if applicable
        if(data.level == 1) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.oneRecord) {
                this.oneRecord = data.record;
                localStorage.setItem('oneRecord', this.oneRecord);
            }
        } else if (data.level == 2) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.twoRecord) {
                this.twoRecord = data.record;
                localStorage.setItem('twoRecord', this.twoRecord);
            }
        } else if (data.level == 3) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.threeRecord) {
                this.threeRecord = data.record;
                localStorage.setItem('threeRecord', this.threeRecord);
            }
        } else if (data.level == 4) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.fourRecord) {
                this.fourRecord = data.record;
                localStorage.setItem('fourRecord', this.fourRecord);
            }
        } else if (data.level == 5) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.fiveRecord) {
                this.fiveRecord = data.record;
                localStorage.setItem('fiveRecord', this.fiveRecord);
            }
        } else if (data.level == 6) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.sixRecord) {
                this.sixRecord = data.record;
                localStorage.setItem('sixRecord', this.sixRecord);
            }
        } else if (data.level == 7) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.sevenRecord) {
                this.sevenRecord = data.record;
                localStorage.setItem('sevenRecord', this.sevenRecord);
            }
        } else if (data.level == 8) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.eightRecord) {
                this.eightRecord = data.record;
                localStorage.setItem('eightRecord', this.eightRecord);
            }
        } else if (data.level == 9) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.nineRecord) {
                this.nineRecord = data.record;
                localStorage.setItem('nineRecord', this.nineRecord);
            }
        } else if (data.level == 10) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.tenRecord) {
                this.tenRecord = data.record;
                localStorage.setItem('tenRecord', this.tenRecord);
            }
        } else if (data.level == 11) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.elevenRecord) {
                this.elevenRecord = data.record;
                localStorage.setItem('elevenRecord', this.elevenRecord);
            }
        } else if (data.level == 12) {
            var tempRecord;
            if(data.record == null) {
                tempRecord = 1000 * 1000;
            } else {
                tempRecord = data.record;
            } 
            if(tempRecord > this.twelveRecord) {
                this.twelveRecord = data.record;
                localStorage.setItem('twelveRecord', this.twelveRecord);
            }
        }
    
        // // My idea for how to do all of above in one nested loop, but this is not how things work lol
        // for (var i = 1; i <= this.zeroThruTwelve.length; i++) {

        //     var number = this.zeroThruTwelve[i];
        //     var numberRecord = number + 'record';
        //     var thisNumberRecord = 'this.' + numberRecord;
        //     thisNumberRecord = parseInt(localStorage.getItem(numberRecord)) || null;

        //     if(data.level == i) {
        //         var tempRecord;
        //         if(data.record == null) {
        //             tempRecord = 1000 * 1000;
        //         } else {
        //             tempRecord = data.record;
        //         } 
        //         if(tempRecord < eval(thisNumberRecord)) {
        //             thisNumberRecord = data.record;
        //             localStorage.setItem(numberRecord, thisNumberRecord);
        //         }
        //     }
        // }
    }
 
    create() {

        var title = this.add.image(755, 215, 'levelSelect');
        title.setScale(.75);

        var brain = this.add.image(750, 400, 'brainMaze');
        brain.setScale(.75);

        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);
        screen.setInteractive();
        screen.on("pointerover", () => {
            intro.setTintFill(this.black);
            introOutline.setStrokeStyle(3.5, this.black);
            one.setTintFill(this.black);
            two.setTintFill(this.black);
            three.setTintFill(this.black);
            four.setTintFill(this.black);
            five.setTintFill(this.black);
            six.setTintFill(this.black);
            seven.setTintFill(this.black);
            eight.setTintFill(this.black);
            nine.setTintFill(this.black);
            ten.setTintFill(this.black);
            eleven.setTintFill(this.black);
            twelve.setTintFill(this.black);
            home.setTintFill(this.black);
            bestTime.setVisible(false);
            oneRecordText.setVisible(false);
            twoRecordText.setVisible(false);
            threeRecordText.setVisible(false);
            fourRecordText.setVisible(false);
            fiveRecordText.setVisible(false);
            sixRecordText.setVisible(false);
            sevenRecordText.setVisible(false);
            eightRecordText.setVisible(false);
            nineRecordText.setVisible(false);
            tenRecordText.setVisible(false);
            elevenRecordText.setVisible(false);
        });

        var screenOutline = this.add.rectangle(750, 380, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(750, 380, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);

        var bestTime = this.add.image(715, 165, 'bestTime');
        bestTime.setScale(.3);

        var oneRecordText = this.add.text(785, 152, this.oneRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var twoRecordText = this.add.text(785, 152, this.twoRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var threeRecordText = this.add.text(785, 152, this.threeRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var fourRecordText = this.add.text(785, 152, this.fourRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var fiveRecordText = this.add.text(785, 152, this.fiveRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var sixRecordText = this.add.text(785, 152, this.sixRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var sevenRecordText = this.add.text(785, 152, this.sevenRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var eightRecordText = this.add.text(785, 152, this.eightRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var nineRecordText = this.add.text(785, 152, this.nineRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var tenRecordText = this.add.text(785, 152, this.tenRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var elevenRecordText = this.add.text(785, 152, this.elevenRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var twelveRecordText = this.add.text(785, 152, this.twelveRecord, { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);

        var home = this.add.image(542, 738, 'homeIcon');
        home.setScale(.75);

        var homeOutline = this.add.rectangle(542, 661, 56, 56);
        homeOutline.setInteractive({ useHandCursor: true });
        homeOutline.on('pointerup', () => this.homeButton());
        homeOutline.on("pointerover", () => {
            home.setTintFill(this.yellow);
        });

        var intro = this.add.image(750, 210, 'introBar');
        intro.setScale(.4);
        var introOutline = this.add.rectangle(750, 210, 416, 40);
        introOutline.setStrokeStyle(3.5);
        introOutline.setInteractive({ useHandCursor: true });
        introOutline.on('pointerup', () => this.introButton());
        introOutline.on("pointerover", () => {
            intro.setTintFill(this.blue);
            introOutline.setStrokeStyle(3.5, this.blue);
        });

        var one = this.add.image(580, 412, 'one');
        one.setScale(.9);
        var oneOutline = this.add.rectangle(581, 309, 80, 90);
        oneOutline.setInteractive({ useHandCursor: true });
        oneOutline.on('pointerup', () => this.level1Button());
        oneOutline.on("pointerover", () => {
            one.setTintFill(this.green);
            bestTime.setVisible(true);
            oneRecordText.setVisible(true);
        });

        var two = this.add.image(692.25, 408, 'two');
        two.setScale(.9);
        var twoOutline = this.add.rectangle(692.25, 309, 80, 90);
        twoOutline.setInteractive({ useHandCursor: true });
        twoOutline.on('pointerup', () => this.level2Button());
        twoOutline.on("pointerover", () => {
            two.setTintFill(this.green);
            bestTime.setVisible(true);
            twoRecordText.setVisible(true);
        });

        var three = this.add.image(807.75, 412, 'three');
        three.setScale(.9);
        var threeOutline = this.add.rectangle(808, 310, 80, 90);
        threeOutline.setInteractive({ useHandCursor: true });
        threeOutline.on('pointerup', () => this.level3Button());
        threeOutline.on("pointerover", () => {
            three.setTintFill(this.green);
            bestTime.setVisible(true);
            threeRecordText.setVisible(true);
        });

        var four = this.add.image(920, 394, 'four');
        four.setScale(.9);
        var fourOutline = this.add.rectangle(920.25, 310, 80, 90);
        fourOutline.setInteractive({ useHandCursor: true });
        fourOutline.on('pointerup', () => this.level4Button());
        fourOutline.on("pointerover", () => {
            four.setTintFill(this.orange);
            bestTime.setVisible(true);
            fourRecordText.setVisible(true);
        });

        var five = this.add.image(580, 507.5, 'five');
        five.setScale(.9);
        var fiveOutline = this.add.rectangle(580, 430, 80, 90);
        fiveOutline.setInteractive({ useHandCursor: true });
        fiveOutline.on('pointerup', () => this.level5Button());
        fiveOutline.on("pointerover", () => {
            five.setTintFill(this.orange);
            bestTime.setVisible(true);
            fiveRecordText.setVisible(true);
        });

        var six = this.add.image(692.25, 500, 'six');
        six.setScale(.9);
        var sixOutline = this.add.rectangle(692.25, 430, 80, 90);
        sixOutline.setInteractive({ useHandCursor: true });
        sixOutline.on('pointerup', () => this.level6Button());
        sixOutline.on("pointerover", () => {
            six.setTintFill(this.orange);
            bestTime.setVisible(true);
            sixRecordText.setVisible(true);
        });

        var seven = this.add.image(807.75, 514, 'seven');
        seven.setScale(.9);
        var sevenOutline = this.add.rectangle(807.75, 430, 80, 90);
        sevenOutline.setInteractive({ useHandCursor: true });
        sevenOutline.on('pointerup', () => this.level7Button());
        sevenOutline.on("pointerover", () => {
            seven.setTintFill(this.red);
            bestTime.setVisible(true);
            sevenRecordText.setVisible(true);
        });

        var eight = this.add.image(920, 504, 'eight');
        eight.setScale(.9);
        var eightOutline = this.add.rectangle(920, 430, 80, 90);
        eightOutline.setInteractive({ useHandCursor: true });
        eightOutline.on('pointerup', () => this.level8Button());
        eightOutline.on("pointerover", () => {
            eight.setTintFill(this.red);
            bestTime.setVisible(true);
            eightRecordText.setVisible(true);
        });
        

        var nine = this.add.image(580, 622, 'nine');
        nine.setScale(.9);
        var nineOutline = this.add.rectangle(580, 551, 80, 90);
        nineOutline.setInteractive({ useHandCursor: true });
        nineOutline.on('pointerup', () => this.level9Button());
        nineOutline.on("pointerover", () => {
            nine.setTintFill(this.red);
            bestTime.setVisible(true);
            nineRecordText.setVisible(true);
        });

        var ten = this.add.image(692.25, 552, 'ten');
        ten.setScale(.9);
        var tenOutline = this.add.rectangle(692.25, 551, 80, 90);
        tenOutline.setInteractive({ useHandCursor: true });
        tenOutline.on('pointerup', () => this.level10Button());
        tenOutline.on("pointerover", () => {
            ten.setTintFill(this.purple);
            bestTime.setVisible(true);
            tenRecordText.setVisible(true);
        });
        
        var eleven = this.add.image(807, 552, 'eleven');
        eleven.setScale(.9);
        var elevenOutline = this.add.rectangle(807, 552, 80, 91);
        elevenOutline.setInteractive({ useHandCursor: true });
        elevenOutline.on('pointerup', () => this.level11Button());
        elevenOutline.on("pointerover", () => {
            eleven.setTintFill(this.purple);
            bestTime.setVisible(true);
            elevenRecordText.setVisible(true);
        });

        var twelve = this.add.image(920, 552, 'twelve');
        twelve.setScale(.9);
        var twelveOutline = this.add.rectangle(920, 552, 80, 91);
        twelveOutline.setInteractive({ useHandCursor: true });
        twelveOutline.on('pointerup', () => this.level12Button());
        twelveOutline.on("pointerover", () => {
            twelve.setTintFill(this.purple);
            bestTime.setVisible(true);
            twelveRecordText.setVisible(true);
        });
    }

    homeButton() {
        this.scene.start('titleScene');
    }

    nextButton() {
        this.scene.start('levelSceneP2');
    }

    introButton() {
        this.scene.start('game', {level: 0, rapidFire: false});
    }

    level1Button() {
        this.scene.start('game', {level: 1, rapidFire: false});
    }

    level2Button() {
        this.scene.start('game', {level: 2, rapidFire: false});
    }

    level3Button() {
        this.scene.start('game', {level: 3, rapidFire: false});
    }

    level4Button() {
        this.scene.start('game', {level: 4, rapidFire: false});
    }

    level5Button() {
        this.scene.start('game', {level: 5, rapidFire: false});
    }

    level6Button() {
        this.scene.start('game', {level: 6, rapidFire: false});
    }

    level7Button() {
        this.scene.start('game', {level: 7, rapidFire: false});
    }

    level8Button() {
        this.scene.start('game', {level: 8, rapidFire: false});
    }

    level9Button() {
        this.scene.start('game', {level: 9, rapidFire: false});
    }

    level10Button() {
        this.scene.start('game', {level: 10, rapidFire: false});
    }

    level11Button() {
        this.scene.start('game', {level: 11, rapidFire: false});
    }

    level12Button() {
        this.scene.start('game', {level: 12, rapidFire: false});
    }

}