import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
  findMostContributedRepo(
    repositories: Array<{ contributors: number; name: string; url: string }>,
  ) {
    let biggest = repositories[0].contributors;
    let biggestIndex = 0;

    for (let i = 1; i < repositories.length; i++) {
      if (repositories[i].contributors > biggest) {
        biggest = repositories[i].contributors;
        biggestIndex = i;
      }
    }

    return biggestIndex;
  }

  getBiggestRepos(
    repositories: Array<{ contributors: number; name: string; url: string }>,
    length: number = 5,
  ) {
    const newArr = [];

    for (let i = 0; i < length; i++) {
      const biggestIndex = this.findMostContributedRepo(repositories);
      newArr.push(repositories[biggestIndex]);
      repositories.splice(biggestIndex, 1);
    }

    return newArr;
  }
}
