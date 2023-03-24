import { NgModule } from '@angular/core';
import { PeruvianCurrencyPipe } from 'src/app/pipes/peruvian-currency/peruvian-currency.pipe';
import { DolarCurrencyPipe } from './dolar-currency/dolar-currency.pipe';
import { CommonModule, CurrencyPipe } from '@angular/common';
// import { HideTextPipe } from 'src/app/pipes/hide-text-number/hide-text-number.pipe';
import { TruncateDecimalsPipe } from 'src/app/pipes/truncate-decimals/truncate-decimals.pipe';
import { MaskEmailPipe } from 'src/app/pipes/mask-email/mask-email.pipe';
import { TitleCasePipe } from 'src/app/pipes/title-case/title-case.pipes';
import { RoundDownPipe } from './round-down/round-down.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DolarCurrencyPipe,
    PeruvianCurrencyPipe,
    // HideTextPipe,
    TruncateDecimalsPipe,
    MaskEmailPipe,
    TitleCasePipe ,
    RoundDownPipe,
  ],
  exports: [
    DolarCurrencyPipe,
    PeruvianCurrencyPipe,
    // HideTextPipe,
    TruncateDecimalsPipe,
    MaskEmailPipe,
    TitleCasePipe ,
    RoundDownPipe,
  ],
  providers: [
    CurrencyPipe
  ]
})
export class PipesModule {}
