---
title: React 高阶组件
date: "2017-09-04T14:43:29.218Z"
path: "/react-hoc"
layout: post
tags:
- react
---

React 高阶组件简单来说, 就是一个 function 接受一个 component 作为参数, 最后返回一个新的组件, 高阶组件的概念来自于 Javascript 中的高阶函数。<!--more-->

## 高阶函数

因为函数在 Javascript 中为一等公民(first-class functions)，所以函数能作为参数, 或者返回值。一个函数如果接受函数作为参数，或者返回值为函数，则称为高阶函数，常见的的 Javascript 高阶函数有 `Array.prototype.filter`、`Array.prototype.map`、`Array.prototype.reduce` 等。

```javascript
[1, 2, 3, 4, 5].reduce(function(prev, curr, index, wholeArr) {
  return acc + curr;
}, 0);
```

`Array.prototype.reduce`中，第一个参数为一个函数，这个函数接受四个参数，第一个为上次运算的结果，第二个为当前循环的元素，第三个为当前循环的 index，第四个则为整个数组。

```javascript
function record() {
  const startTime = new Date().getTime();
  return function() {
    const now = new Date().getTime();
    return now - startTime;
  }
}

const startRecord = record();
setTimeout(() => console.log(startRecord()), 50); // 50
setTimeout(() => console.log(startRecord()), 100); // 100
```

函数 `record` 中返回了另外一个匿名函数，`record` 函数执行以后后，在以后再次执行 `startRecord` 都会返回与一次函数执行的时间间隔。

## 高阶组件

高阶组件类似于高阶函数，只是函数改为了 React 组件(实际上 React 组件也是一个函数)。例如我们要实现一个普通的倒计时组件

```javascript
class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: props.remaining
    };
    this.countDown = undefined;
  }

  componentDidMount() {
    this.countdown = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    if (this.remaining <= 0) {
      clearInterval(this.countdown);
      this.countdown = undefined;
      return undefined;
    }
    this.setState({ remaining: this.state.remaining -1 });
  }

  render() {
    let totalSeconds = this.state.remaining;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return (
      <time>
        <span>{ hours }
        <span>{ minutes }</span>
        <span>{ seconds }</span>
      </time>
    )
  }
}
```

上面的组件根据`remaining`属性，计算出倒计时的时、分、秒，但如果我们需要一个更抽象的组件，并不需要输出固定的 DOM 结构，这时候我们就可以借助高阶组件。

```javascript
function countdown(remaining, WrapperComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        remaining: props.remaining
      };
      this.countDown = undefined;
    }

    componentDidMount() {
      this.countdown = setInterval(this.tick.bind(this), 1000);
    }

    tick() {
      if (this.remaining <= 0) {
        clearInterval(this.countdown);
        this.countdown = undefined;
        return undefined;
      }
      this.setState({ remaining: this.state.remaining -1 });
    }

    render() {
      let totalSeconds = this.state.remaining;
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return (
       <WrapperComponent
        hour={ hour }
        minutes={ minutes }
        seconds={ seconds }
       />
      )
    }
  }
}
```

调用方式

```javascript
function Timer({ hour, minutes, seconds }) {
  return (
    <time>
      <span>{ hours }
      <span>{ minutes }</span>
      <span>{ seconds }</span>
    </time>
  )
}

const Countdown = countdown(3600, Timer);
```