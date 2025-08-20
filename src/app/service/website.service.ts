import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(public http: HttpClient) {
    this.asyncConstructor();
  }

  async asyncConstructor() {
    await this.fetchData();
    await this.updateStaffList();
    console.log(this.sourcedData)
  }

  async updateStaffList() {
    this.staffList = await this.http.get("data/staff_list.json").toPromise() || {};
  }

  sourcedData: any = {}
  staffList: any = []

  sources: any = [
    {
      name: "sections",
      link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlOLam3FCo005JKta-qQXp2grUWHbogwCYQZ2bZxSAfq2Dm46PbgNBhlr0y2gcIYmNFPn3zr3Xe4z6/pub?output=csv",
      mappings: [
        "section",
        "information"
      ]
    },
    {
      name: "links",
      link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlOLam3FCo005JKta-qQXp2grUWHbogwCYQZ2bZxSAfq2Dm46PbgNBhlr0y2gcIYmNFPn3zr3Xe4z6/pub?gid=0&single=true&output=csv",
      mappings: [
        "platform",
        "display",
        "username",
        "link",
        "image"
      ]
    },
    {
      name: "staff",
      link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlOLam3FCo005JKta-qQXp2grUWHbogwCYQZ2bZxSAfq2Dm46PbgNBhlr0y2gcIYmNFPn3zr3Xe4z6/pub?gid=1272312979&single=true&output=csv",
      mappings: [
        "name",
        "department",
        "link",
        "image",
        "bio"
      ]
    },
    {
      name: "cast",
      link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlOLam3FCo005JKta-qQXp2grUWHbogwCYQZ2bZxSAfq2Dm46PbgNBhlr0y2gcIYmNFPn3zr3Xe4z6/pub?gid=1596187104&single=true&output=csv",
      mappings: [
        "name",
        "link",
        "bio",
        "image"
      ]
    }
  ]

  async fetchData() {
    for (let source of this.sources) {
      const raw: any = await this.http.get(source.link, { responseType: 'text' }).toPromise() || {};
  
      const CSV_ROW_SPLIT_REGEX = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g;
  
      const rows = raw.split('\n').filter((line: string) => line.trim() !== '');
  
      let sourceData: any[] = [];
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const rowString = rows[rowIndex];
        let rowData: any = {};
        let matches;
        let fields: string[] = [];
  
        while ((matches = CSV_ROW_SPLIT_REGEX.exec(rowString)) !== null) {
          let field = matches[1] !== undefined ? matches[1] : matches[2];
  
          if (field !== undefined) {
            field = field.replace(/""/g, '"');
          } else {
            field = '';
          }
          fields.push(field);
        }
        if (rowIndex === 0 && sourceData.length === 0) {
          continue;
        }
  
        for (let i = 0; i < source.mappings.length; i++) {
          let descriptor = source.mappings[i];
          rowData[descriptor] = fields[i] !== undefined ? fields[i] : '';
        }
        sourceData.push(rowData);
      }
      this.sourcedData[source.name] = sourceData;
    }
  }
}
