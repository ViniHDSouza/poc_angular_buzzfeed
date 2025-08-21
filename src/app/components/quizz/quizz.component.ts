import { Component, OnInit } from '@angular/core';

import quizzQuestions from "../../../assets/data/quizz_questions.json";



@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = 'Quizz Component';

  questions: any;
  questionsSelect: any;

  answers:string[] = [];
  answersSelect: string=" ";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (quizzQuestions) {
      this.finished = false;
      this.title = quizzQuestions.title;
      this.questions = quizzQuestions.questions;
      this.questionsSelect = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length - 1;
    }
  }

  escolhaJogador(respostas:string ){
    //alert(respostas);
    this.answers.push(respostas);
    this.nextQuestion();
  }

  async nextQuestion() {
    this.questionIndex++;
    if (this.questionIndex < this.questionMaxIndex) {
      this.questionsSelect = this.questions[this.questionIndex];
      this.answersSelect = " ";
    } else {
      this.finished = true;
      this.validaResultado(this.answers);
      const respostaFinal:string = await this.validaResultado(this.answers);
      this.answersSelect = quizzQuestions.results[respostaFinal as keyof typeof quizzQuestions.results];
    }
  }

  async validaResultado(answers:string[]){
    let constQuantidadA = 0;
    let constQuantidadB = 0;

    const resultado = answers.reduce((valorAnterior, valorAtual, index, vetor) => {
      if (valorAtual === 'A') {
        constQuantidadA++;
      } else {
        constQuantidadB++;
      }
      return valorAtual;
    },"")


    const resultado2 = answers.reduce((valorAnterior, valorAtual, index, vetor) => {
      if (vetor.filter(item => item===valorAnterior).length > vetor.filter(item => item===valorAtual).length) {
        return valorAnterior;

      }else{
        return valorAtual;
      }
    },"")

    return resultado2;
  }

}
