import { Component, OnInit } from '@angular/core'

declare let vis: any

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {

  ngOnInit(): void {
    document.body.classList.add('page-aside-fixed', 'page-aside-left')
    // create an array with nodes
    let nodes = new vis.DataSet([
      {id: 10, label: 'pub-repo-4397y', shape: 'image', image: "https://image.flaticon.com/icons/svg/138/138939.svg" },
      {id: 11, label: 'pub-repo-4397y', shape: 'image', image: "https://image.flaticon.com/icons/svg/138/138939.svg" },
      {id: 51, label: 'user-group-982j', shape: 'image', image: "https://image.flaticon.com/icons/svg/32/32441.svg" },
      {id: 21, label: 'data-ex-u0f8', shape: 'image', image: "https://image.flaticon.com/icons/svg/429/429107.svg" },
      {id: 31, label: 'conflict-res-9v78ha9', shape: 'image', image: "https://image.flaticon.com/icons/svg/552/552419.svg" },
      {id: 41, label: 'codebooks-2308j', shape: 'image', image: "https://image.flaticon.com/icons/svg/148/148990.svg" },
    ])

    // create an array with edges
    let edges = new vis.DataSet([
      {from: 10, to: 21, arrows:'to', label: 'pubs-added'},
      {from: 11, to: 21, arrows:'to', label: 'pubs-added'},
      {from: 21, to: 31, arrows:'to', label: 'encoding-complete'},
      {from: 51, to: 21, arrows:'to', label: 'encoding-complete'},
      {from: 41, to: 21, arrows:'to', label: 'version-published'}
    ])

    // create a network
    let container = document.getElementById('mynetwork')
    let data = {
      nodes: nodes,
      edges: edges
    }
    let options = {
      edges: {
        smooth: {
          enabled: false
        }
      },
      physics: {
        enabled: false
      }
    }
    let network = new vis.Network(container, data, options)
  }

  ngOnDestroy() {
    document.body.classList.remove('page-aside-fixed', 'page-aside-left')
  }

}
