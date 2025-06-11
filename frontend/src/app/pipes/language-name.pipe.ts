import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageName',
})
export class LanguageNamePipe implements PipeTransform {
  private languages: { [key: string]: string } = {
    en: 'English',
    fr: 'French',
    es: 'Spanish',
    pt: 'Portuguese',
    de: 'German',
    it: 'Italian',
    ja: 'Japanese',
    ko: 'Korean',
    zh: 'Chinese',
    ru: 'Russian',
    hi: 'Hindi',
    ar: 'Arabic',
    tr: 'Turkish',
    nl: 'Dutch',
    pl: 'Polish',
    sv: 'Swedish',
    fi: 'Finnish',
    no: 'Norwegian',
    da: 'Danish',
    he: 'Hebrew',
    el: 'Greek',
    th: 'Thai',
    vi: 'Vietnamese',
    id: 'Indonesian',
    ro: 'Romanian',
    hu: 'Hungarian',
    cs: 'Czech',
    sk: 'Slovak',
    uk: 'Ukrainian',
    ms: 'Malay',
    fa: 'Persian',
    ur: 'Urdu',
  };

  transform(code: string): string {
    return this.languages[code] || code;
  }
}
