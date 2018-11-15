import * as React from 'react';

import './Timer.css';

interface IState {
  elapsed: number;
  start: number;
  time: string;
}

interface IProps {
    tick: (time: string) => void;
}

/**
 * Компонент таймера.
 */
export class Timer extends React.Component<IProps, IState> {

  private timer: any;

  constructor(props: any) {
    super(props);

    this.state = {
      elapsed: 0,
      start: Date.now(),
      time: "00:00:00"
    };

    this.tick = this.tick.bind(this);
  }

  public componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public render() {
    return <div className="timer">{this.state.time}</div>;
  }

  private tick() {
    const elapsed:number = +new Date() - this.state.start;

    const elapsedToSecond = Math.round(elapsed / 1000);

    const hours = Math.floor(elapsedToSecond/3600);
    const minutes = Math.floor(elapsedToSecond/60);
    const seconds = elapsedToSecond - hours*3600 - minutes*60;
    
    let hoursToString = hours.toFixed();
    let minutesToString = minutes.toFixed();
    let secondsToString = seconds.toFixed();

    if (hours < 10) {
      hoursToString = `0${hoursToString}`
    }

    if (minutes < 10) {
      minutesToString = `0${minutesToString}`
    }

    if (seconds < 10) {
      secondsToString = `0${secondsToString}`
    }

    const time = `${hoursToString}:${minutesToString}:${secondsToString}`;

    this.props.tick(time);
    this.setState({ elapsed, time });
  }
}
