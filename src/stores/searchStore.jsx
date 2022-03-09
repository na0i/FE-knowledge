import { observable } from 'mobx';
import { toJS } from 'mobx';

const searchStore = observable({
  // state
  interestedPapers: [ ],
  
  // action
  getInterestedPaper(){
    if (localStorage.getItem('interestedPapers')){
      let interestedPapers = JSON.parse(localStorage.getItem('interestedPapers'));
      this.interestedPapers = interestedPapers;
    } else {
      this.interestedPaper = [];
    };
  },

  addInterestedPaper(item){
    let interestedPapers = this.interestedPapers;
    if (interestedPapers.findIndex((element) => element.id === item.id) === -1){
      interestedPapers = [...interestedPapers, item];
      console.log(this.interestedPapers===interestedPapers);
      localStorage.setItem('interestedPapers', JSON.stringify(interestedPapers));
    };
  },

  removeInterestedPaper(item){
    let interestedPapers = this.interestedPapers.filter((element) => element.id !== item.id);
    this.interestedPapers = interestedPapers;
    localStorage.setItem('interestedPapers', JSON.stringify(interestedPapers));
  }
});

export { searchStore };