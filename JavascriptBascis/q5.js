function SortArray(originalArray) {
    this.originalArray = originalArray;
  }
  
  SortArray.prototype.getSortedArray = function() {
    return this.sortArray(this.originalArray);
  }
  
  SortArray.prototype.sortArray = function(arr) {
    return arr.sort((a, b) => a - b);
  }
  
  function SortObjectArray(originalArray) {
    SortArray.call(this, originalArray);
  }
  
  SortObjectArray.prototype = Object.create(SortArray.prototype);
  SortObjectArray.prototype.constructor = SortObjectArray;
  
  SortObjectArray.prototype.sortArray = function(arr) {
    return arr.sort((a, b) => a.value - b.value);
  }
  
  let numbers = [5, 2, 9, 1, 3];
  let sortArray = new SortArray(numbers);
  console.log(sortArray.getSortedArray()); // [1, 2, 3, 5, 9]
  
  let objects = [{value: 5}, {value: 2}, {value: 9}, {value: 1}, {value: 3}];
  let sortObjectArray = new SortObjectArray(objects);
  console.log(sortObjectArray.getSortedArray()); // [{value: 1}, {value: 2}, {value: 3}, {value: 5}, {value: 9}]
  