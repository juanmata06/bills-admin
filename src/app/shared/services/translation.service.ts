import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private _defaultLanguage: string = 'es';
  private validLanguages: string[] = ['es', 'en'];
  private currentLanguageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._defaultLanguage);
  private translations: any = {};

  constructor(private http: HttpClient) { }

  private loadTranslations(language: string): Observable<any> {
    return this.http.get(`/assets/translations/${language}.json`).pipe(
      map((data) => {        
        this.translations = data;
        return data;
      })
    );
  }

  setLanguage(language: string): Promise<void> {
    if (!this.validLanguages.includes(language)) { return Promise.resolve(); }
    this.currentLanguageSubject.next(language);
    localStorage.setItem('currentLanguage', language);
    return new Promise((resolve) => {
      this.loadTranslations(language).subscribe(() => {
        resolve();
      });
    });
  }
  

  translate(key: string): string {    
    return this.translations[key] || key;
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLanguageSubject.asObservable();
  }

  getCurrentLanguageValue(): string {
    return this.currentLanguageSubject.value;
  }
}
