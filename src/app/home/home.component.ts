import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DbService } from '../common/db.service';
import { SpecieService } from '../specie/specie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup
  constructor(private dbService: DbService,
              private specieServie: SpecieService,
              private router: Router) { }

  ngOnInit() {
    this.dbService.getSpecie();
    this.searchForm = new FormGroup(
      {
        'ricerca': new FormControl()
      }
    )
  }

  cerca() {
    let stringaRicerca: string = this.searchForm.get('ricerca').value;
    console.log(stringaRicerca);
    if (stringaRicerca) {
      this.specieServie.filtraSpecie(stringaRicerca);
      if(this.specieServie.specieDaVisualizzare.length > 0) {
          this.router.navigateByUrl("/specie");
      }
      else
      {
        alert("Messaggio di errore");
        this.searchForm.reset("");
      }
    } 
    else {
      this.specieServie.filtraSpecie();
    }
  }

}