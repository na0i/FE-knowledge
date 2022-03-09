import { observable } from 'mobx';

const periodStore = observable({
  // state
  selectedPeriod: 0,

  // action
  onSelectedPeriod(year){
    this.selectedPeriod = year.name;
  }
});

export { periodStore };