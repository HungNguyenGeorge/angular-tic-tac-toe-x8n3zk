import { AfterContentInit } from '@angular/core';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'my-app',
  template: `
  <div id="statusArea" className="status">Next player: <span>X</span></div>
<div id="winnerArea" className="winner">Winner: <span>None</span></div>
<button
  (click)="newGame()"
  class="reset"
>
  Reset
</button>
<section>
  <div class="row" *ngFor="let row of [0, 1, 2]">
    <button
      (click)="onCheck(row, col, $event)"
      *ngFor="let col of [0, 1, 2]"
      class="square"
    >
      {{boardArr[row][col]}}
    </button>
  </div>
</section>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterContentChecked {
  strCurrTurnEle: HTMLElement;
  winnerAreaEle: HTMLElement;
  allCoordinates;
  constructor() {}

  ngOnInit() {
    this.strCurrTurnEle = document.querySelector('#statusArea span');
    this.winnerAreaEle = document.querySelector('#winnerArea span');
  }

  ngAfterContentChecked() {
    this.allCoordinates = Array.from(
      document.querySelectorAll('button.square')
    );
  }
  // ngAfterContentInit() {
  //   this.allCoordinates = Array.from(
  //     document.querySelectorAll('button.square')
  //   );
  // }
  boardArr: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  currTurn: boolean = true; //true: X, false: O

  onCheck(row, col, event) {
    this.checkWin(row, col, event.target);
  }

  checkWin(row, col, ele) {
    if (this.boardArr[col][row] !== '') return;
    //Set text
    // ele.innerHTML = this.strCurrTurn;
    this.setCoordinates(row, col);

    if (
      (this.boardArr[0][0] &&
        this.boardArr[0][0] == this.boardArr[1][1] &&
        this.boardArr[0][0] == this.boardArr[2][2]) ||
      (this.boardArr[0][2] &&
        this.boardArr[0][2] == this.boardArr[1][1] &&
        this.boardArr[0][2] == this.boardArr[2][0])
    ) {
      this.setWinner();
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (
        (this.boardArr[i][0] &&
          this.boardArr[i][0] == this.boardArr[i][1] &&
          this.boardArr[i][0] == this.boardArr[i][2]) ||
        (this.boardArr[0][i] &&
          this.boardArr[0][i] == this.boardArr[1][i] &&
          this.boardArr[0][i] == this.boardArr[2][i])
      ) {
        this.setWinner();
        break;
      }
    }
    this.nextTurn();
  }

  setCoordinates(row, col) {
    this.boardArr[col][row] = this.strCurrTurn;
  }

  setWinner() {
    this.winnerAreaEle.innerText = this.strCurrTurn;
    this.allCoordinates.forEach((ele) =>
      ele.setAttribute('disabled', 'disabled')
    );
  }

  nextTurn() {
    this.currTurn = !this.currTurn;
    this.strCurrTurnEle.innerText = this.strCurrTurn;
  }

  get strCurrTurn() {
    return this.currTurn ? 'X' : 'O';
  }

  newGame() {
    this.allCoordinates.forEach((ele) => {
      ele.removeAttribute('disabled');
      ele.innerHTML = '&#8203;';
    });
    this.boardArr = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }
}
