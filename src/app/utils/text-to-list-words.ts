import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
  
export class TextToListWords {
    public turnTextIntoWords(text: string): string[] {
        let listWords: any = [];

        text.split(" ").forEach((word: string) => listWords.push(word));
        listWords = Array.from(new Set(listWords))
        return listWords
    }
}