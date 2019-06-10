import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { StatementComponent } from './statement/statement.component';
import { SharedModule } from '../shared/shared.module';
import { TransferenceComponent } from './transference/transference.component';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'statement', component: StatementComponent }
];

@NgModule({
  declarations: [InfoComponent, StatementComponent, TransferenceComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [TransferenceComponent]
})
export class DashboardModule { }
