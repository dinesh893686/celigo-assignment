function groupObjectsBy(objectsArray, key) {
    let groupedObject = {};
    objectsArray.forEach(object => {
      if (!groupedObject[object[key]]) {
        groupedObject[object[key]] = [];
      }
      groupedObject[object[key]].push(object);
    });
    return groupedObject;
  }
  
  let inputArray = [
    {
      "channel": "A",
      "name": "shoe"
    },
    {
      "channel": "A",
      "name": "electronics"
    },
    {
      "channel": "B",
      "name": "apparel"
    },
    {
      "channel": "C",
      "name": "electronics"
    }
  ];
  
  console.log(groupObjectsBy(inputArray, 'channel'));
  