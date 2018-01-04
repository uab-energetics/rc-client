import {Paginator} from "./Paginator";

declare let window: any;

describe("Paginator Test", () => {
  it("Should work", () => {

    expect(data.length).toBe(30);

    let dataSource = new Paginator(data, 10);

    let rows = [];
    dataSource.changes.subscribe( newRows => rows = newRows);

    expect(rows.length).toBe(10);

    dataSource.setRowsPerPage(11);
    expect(rows.length).toBe(11);

    dataSource.next();
    dataSource.next();
    expect(rows.length).toBe(8);
    expect(dataSource.hasNext()).toBe(false);


  })
});

const data = JSON.parse('[["Tempsoft","3rd generation"],["Ronstring","conglomeration"],["Holdlamis","Right-sized"],["Flexidy","standardization"],["Gembucket","workforce"],["Bigtax","extranet"],["Bigtax","Streamlined"],["Hatity","Centralized"],["Kanlam","regional"],["Kanlam","productivity"],["Job","Grass-roots"],["Lotlux","optimal"],["Zamit","fault-tolerant"],["Quo Lux","Triple-buffered"],["Duobam","Customer-focused"],["Konklab","pricing structure"],["Aerified","Team-oriented"],["Pannier","Reduced"],["Asoka","initiative"],["Zaam-Dox","approach"],["Konklux","Multi-lateral"],["Otcom","challenge"],["Zamit","User-friendly"],["Home Ing","Diverse"],["Solarbreeze","Compatible"],["Lotlux","model"],["Holdlamis","open architecture"],["Prodder","Business-focused"],["Namfix","customer loyalty"],["Zaam-Dox","software"]]');
