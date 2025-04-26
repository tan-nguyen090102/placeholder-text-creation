import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextToListWords } from './utils/text-to-list-words';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TextToListWords,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'placeholder-text-creation';
  private text: string = ''
  private listOfWords: string[] = []
  private listOfPunc: string[] = ['. ', '? ', '! ']
  public inputForm: FormGroup
  public paragraph: string = ''

  constructor(private http: HttpClient, private textToWordsService: TextToListWords, private inputFormBuilder: FormBuilder) {
    this.inputForm = inputFormBuilder.group({
      numParagraph: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    })
  }

  ngOnInit() {
    let jsonData: any
    this.http.get('lorem.json').subscribe({
      
      next: (response) => {
        jsonData = response
        this.text = jsonData.text
        this.listOfWords = this.textToWordsService.turnTextIntoWords(this.text);
      }
    });
  }

  onGenerateParagraph() {
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
    } else {
      this.paragraph = '';

      for (let i = 0; i < this.inputForm.get('numParagraph')?.value; i++) {
        let sentencesCount = Math.floor(Math.random() * 5) + 3;
      
        for (let j = 0; j < sentencesCount; j++) {
          let wordsCount = Math.floor(Math.random() * 10) + 5;
          let commaPlacement = Math.floor(Math.random() * wordsCount - 2);
  
          for (let k = 0; k < wordsCount; k++) {
            let randomWord = this.listOfWords[Math.floor(Math.random() * this.listOfWords.length)];
            this.paragraph += (k === 0) 
              ? randomWord[0].toUpperCase() + randomWord.slice(1)
              : randomWord;
  
            if (k === commaPlacement) {
              this.paragraph += ', ';
            } 
            
            if (k !== wordsCount - 1) {
              this.paragraph += ' ';
            }
          }
  
          this.paragraph +=  this.listOfPunc[Math.floor(Math.random() * this.listOfPunc.length)];
        }

        this.paragraph += '\n\n';
      }
    }
  }
}
