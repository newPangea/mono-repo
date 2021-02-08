import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatBadgeModule } from "@angular/material/badge";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatRadioModule } from "@angular/material/radio";
import { MatRippleModule } from "@angular/material/core";
import { MatChipsModule } from "@angular/material/chips";
import { ReactiveFormsModule } from "@angular/forms";
import {MatProgressBarModule} from '@angular/material/progress-bar'; 


const materialModules = [
  CommonModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatCardModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatBottomSheetModule,
  MatBadgeModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatSliderModule,
  MatToolbarModule,
  MatRadioModule,
  MatRippleModule,
  MatChipsModule,
  ReactiveFormsModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: [...materialModules],
  providers: [],
})
export class MaterialModule {}
