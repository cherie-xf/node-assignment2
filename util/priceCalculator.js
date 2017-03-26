module.exports = class PriceCalculator{

    constructor(){
       this.baseSm = 7.99;
       this.baseMi = 9.99;
       this.baseLa = 11.99;
    }

    getCost(size, topCount, quantity){
       var baseCost = 0;
       if(size === 'small'){
         baseCost = this.baseSm;
       } else if(size =='medium'){
         baseCost = this.baseMi;
       } else if(size === 'large'){
         baseCost = this.baseLa;
       } else {
         return baseCost;
       }

       return ((baseCost + parseInt(topCount)) * parseInt(quantity)).toFixed( 2 );
    }

    getRandomTime(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}