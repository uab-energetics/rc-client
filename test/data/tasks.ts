import {Project} from './projects';

interface Task {
  name: string,
  project: Project,
  pg: number
}

export const tasks: Task[] = [
  {
    name: 'Screening 128',
    project: {
      name: 'Murine Rigor'
    },
    pg: 85
  },
  {
    name: 'Screening 129',
    project: {
      name: 'Missile'
    },
    pg: 30
  },
  {
    name: 'Screening 32',
    project: {
      name: 'Big Data Ed'
    },
    pg: 100
  }
];
