import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerLink, Page } from '@ts/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  headerLink: string[] = headerLink;
  headerHref: number = 0;
  constructor(private router: Router) { }
  selectHref(number: number) {
    this.headerHref = number;
    this.router.navigate([`${Page[number]}`]);
  }
  ngOnInit() {
    let page = Page.indexOf(location.hash.split("/")[1]);
    this.headerHref = (page == -1) ? 0 : page;
  }
}
