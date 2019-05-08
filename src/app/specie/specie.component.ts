import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../common/db.service';
import { Specie } from './model/specie.model';
import { SpecieService } from './specie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-specie',
  templateUrl: './specie.component.html',
  styleUrls: ['./specie.component.css']
})
export class SpecieComponent implements OnInit {

  specie: Specie[];
  corrente: number;

  specieSubscription: Subscription;

  constructor(private dbService: DbService,
              private specieService: SpecieService) { }

  ngOnInit() {    
    this.corrente = -1;
    this.specieSubscription = this.specieService.specieAvailable
      .subscribe(
        (specie: Specie[]) => {
          console.log('filtro', specie)
          this.specie = specie;
          this.corrente = 0;
        }
      );
    this.specieService.getSpecie();
  }

  getSpecie(index: number) {
    if(this.specie)
    return this.specie[index];
  }

  selezionaSpecie(indice: number) {
    this.corrente = indice;
  }
}
