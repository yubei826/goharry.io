---
title: 冒泡和快排
date: "2018-03-22"
tags:
- algorithm
- javascript
---

冒泡排序和快速排序是两种最常见和基础的排序算法。

## 冒泡排序

冒泡排序的原理是数组中的每个元素于其后面的元素做比较，如果比较的元素小于它，则更换位置。

```javascript
function bubbleSort(arr) {
  return arr.reduce(function(pre, cur, index) {
    return compare(index, pre);
  }, arr.concat());
}

function compare(index, arr) {
  let newArr = arr.concat();
  for (let i = index + 1; i < arr.length; i++) {
    const item1 = newArr[index];
    const item2 = newArr[i];
    if (item2 < item1) {
      newArr = swap(newArr, item1, item2, index, i);
    }
  }
  return newArr;
}

function swap(arr, item1, item2, index1, index2) {
  let newArr = arr.concat();
  newArr[index1] = item2;
  newArr[index2] = item1;
  return newArr;
}
```

## 快速排序

快排的原理是在数组中选取中间的元素，然后将数组分割成两个部分，一个小于选取元素的数组，一个大于或等于选取元素的数组，然后递归。

```javascript
function quickSort(arr) {
  const newArr = arr.concat();
  if (newArr.length <= 1) {
    return newArr;
  }
  const middleIndex = Math.floor(newArr.length / 2);
  const middle = newArr.splice(middleIndex, 1)[0];
  let ltArr = [];
  let gteArr = [];
  for (let i = 0; i < newArr.length; i++) {
    const item = newArr[i];
    if (item < middle) {
      ltArr.push(item);
    } else {
      gteArr.push(item);
    }
  }
  return quickSort(ltArr)
    .concat(middle)
    .concat(quickSort(gteArr));
}
```
