import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientRxJSService } from 'src/app/core/services/httpClientRxJS.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { Villain } from '../../villain.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})
export class VillainsComponent implements OnInit, OnDestroy {
  villainList: Villain[];
  isLoading = false;
  editingTracker = "0";
  itemForm: FormGroup;
  editedForm: FormGroup;

  private subSink = new SubSink();

  constructor(
    private rxjsService: HttpClientRxJSService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formBuilderInit();
    this.fetchVillains();

  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  fetchVillains() {
    this.isLoading = true;

     this.subSink.add(this.rxjsService.getVillains().subscribe(
      data => (this.villainList = data),
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.statusText);
      },
      () => (this.isLoading = false)
    ));
  }

  onSave() {
    this.isLoading = true;

    this.subSink.add(this.rxjsService.postVillain(this.itemForm.value).subscribe(
      data => this.villainList.push(data),
      (err: HttpErrorResponse) => {
        console.log(err.message);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    ));
  }

  onUpdate() {
    const villain = this.editedForm.value;
    this.isLoading = true;
    this.subSink.add(this.rxjsService.putVillain(villain).subscribe(
      () => {
        const index = this.villainList.findIndex(h => h.id === villain.id);
        this.villainList[index] = villain;
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err.statusText);
      },
      () => {
        this.isLoading = false;
      }
    ));
  }

  goToDetail(id: string) {
    this.router.navigateByUrl("/villains/villain-detail/" + id);
  }

  remove(id: string) {
    
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });

    this.editedForm = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      house: [""],
      knownAs: [""]
    });
  }

}
