import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(private http: HttpClient) {
    this.asyncConstructor();
  }

  async asyncConstructor() {
    this.links = await this.fetchLinks();
    console.log(this.links)
  }

  links: Link[] = []

  async fetchLinks() {
    const raw: any = await this.http.get(`https://docs.google.com/spreadsheets/d/e/2PACX-1vRlOLam3FCo005JKta-qQXp2grUWHbogwCYQZ2bZxSAfq2Dm46PbgNBhlr0y2gcIYmNFPn3zr3Xe4z6/pub?gid=0&single=true&output=csv`, { responseType: 'text' }).toPromise() || {};
    const rows = raw.split('\n').map((row: string) => row.split(','));
    let links: any[] = []
    for (let row of rows) {
      links.push({
        platform: row[0],
        display: row[1],
        username: row[2],
        link: row[3],
        image: row[4],
      })
    }
    return links.slice(1,links.length)
  }
  
}

interface Link {
  platform: string
  display: string
  username: string
  link: string
  image: string
}
