import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import {
  getBrowserLang,
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule,
} from '@ngneat/transloco';

@Injectable()
export class TranslocoInitializer {
  constructor() {}

  static provideAppInitializerListener() {
    return {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: preloadUser,
      deps: [TranslocoInitializer],
    };
  }

  initialize() {
    const browserLang = getBrowserLang();
    const defaultLang = "en";
    const availableLangs = ['en','de']
    const activeLang = availableLangs.includes(browserLang)
      ? browserLang
      : defaultLang;
  }
}

export function preloadUser(initializer: TranslocoInitializer) {
  return () => {
    initializer.initialize();
  };
}

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en','de'],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: false,
        missingHandler: {
          allowEmpty: true,
        },
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    TranslocoInitializer,
    TranslocoInitializer.provideAppInitializerListener(),
  ],
})
export class TranslocoRootModule {}
