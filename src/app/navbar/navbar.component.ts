import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	navigation : string;

  constructor(private activated : ActivatedRoute) { 
  	this.navigation = this.activated.url.value[0] == undefined ? "" : this.activated.url.value[0].path;
  	  
  }

  ngOnInit() {
  }

}
