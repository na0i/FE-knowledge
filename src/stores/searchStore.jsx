import { observable } from 'mobx';


const searchStore = observable({
  // state
  interestedPaper: [],
  searchResultIdx: 0,

  getInterestedPaperList(){
    if (localStorage.getItem('interestedPapers')){
			this.interestedPaper = JSON.parse(localStorage.getItem('interestedPapers'));
		}
  },

  addInterestedPaper(item){
    let interestedPapersList = JSON.parse(localStorage.getItem('interestedPapers'));
    if ( interestedPapersList === null ){
      let newItem = {};
      newItem.id = item.id;
      newItem.title = item.title;

      let newArr = [...this.interestedPaper, newItem];
      console.log(newArr);
      this.interestedPaper.push(newItem);
      localStorage.setItem('interestedPapers', JSON.stringify(this.interestedPaper));
      
    } else {
      if (interestedPapersList.findIndex((element) => element.id === item.id) === -1) {
        let newItem = {};
        newItem.id = item.id;
        newItem.title = item.title;
        
        let newArr = [...this.interestedPaper, newItem];
        this.interestedPaper = newArr;
        localStorage.setItem('interestedPapers', JSON.stringify(this.interestedPaper));
      }
    }
  },

  removeInterestedPaper(item){
    const interestedPapersList = JSON.parse(localStorage.getItem('interestedPapers'));
    if (interestedPapersList.findIndex((element) => element.id === item.id) !== -1) {
      let newArr = [];
      newArr = interestedPapersList.filter((element) => element.id !== item.id);
      localStorage.setItem('interestedPapers', JSON.stringify(newArr));
    }
  }
  
});

export { searchStore };