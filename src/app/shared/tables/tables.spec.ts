import {Paginator} from "./Paginator";

declare let window: any;

describe("Paginator Test", () => {
  it("Should work", () => {

    console.log("total records: ", data.length);

    let dataSource = new Paginator(data);

    dataSource.changes.subscribe( newRows => console.log("New Data...", newRows));

    dataSource.setRowsPerPage(10);

    let intervalID = setInterval(() => {
      dataSource.next();
    }, 2500);
  })
});

const data = JSON.parse('[["Tempsoft","3rd generation"],["Ronstring","conglomeration"],["Holdlamis","Right-sized"],["Flexidy","standardization"],["Gembucket","workforce"],["Bigtax","extranet"],["Bigtax","Streamlined"],["Hatity","Centralized"],["Kanlam","regional"],["Kanlam","productivity"],["Job","Grass-roots"],["Lotlux","optimal"],["Zamit","fault-tolerant"],["Quo Lux","Triple-buffered"],["Duobam","Customer-focused"],["Konklab","pricing structure"],["Aerified","Team-oriented"],["Pannier","Reduced"],["Asoka","initiative"],["Zaam-Dox","approach"],["Konklux","Multi-lateral"],["Otcom","challenge"],["Zamit","User-friendly"],["Home Ing","Diverse"],["Solarbreeze","Compatible"],["Lotlux","model"],["Holdlamis","open architecture"],["Prodder","Business-focused"],["Namfix","customer loyalty"],["Zaam-Dox","software"]]');
