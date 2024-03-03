import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';
import { RepositoryDto } from 'dto/repository.dto';
import { ContributorDto } from 'dto/contributor.dto';
import { CounterService } from 'src/counter/counter.service';

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor(
    private config: ConfigService,
    private readonly counter: CounterService,
  ) {
    this.octokit = new Octokit({
      auth: this.config.get('githubApiToken'),
    });
  }

  async getMostCommonContributedRepos(
    owner: string,
    repo: string,
    reposNumber: number = 5,
  ): Promise<Array<any>> {
    const contributorsIterator = this.octokit.paginate.iterator(
      this.octokit.rest.repos.listContributors,
      {
        owner,
        repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        per_page: 100,
      },
    );

    const contributors: Array<{
      contributor: ContributorDto;
      repositories: RepositoryDto[];
    }> = [];

    // gather target repository contributors' data
    for await (const { data } of contributorsIterator) {
      for (const contributor of data) {
        contributors.push({ contributor, repositories: [] });
      }
    }

    const repositoriesPromises: Array<Promise<RepositoryDto>> = [];
    const repositories = {};

    // gather each contributor's repositories data
    for (const contributor of contributors) {
      repositoriesPromises.push(
        this.octokit
          .paginate(this.octokit.rest.repos.listForUser, {
            username: contributor.contributor.login,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
            },
            per_page: 300,
          })
          .then((data) => {
            for (const repository of data) {
              if (repository.name === repo) continue;

              if (repositories[repository.name]) {
                repositories[repository.name].contributors =
                  repositories[repository.name].contributors + 1;
              } else {
                repositories[repository.name] = {
                  contributors: 1,
                  name: repository.full_name,
                  url: repository.html_url,
                };
              }
            }

            return data;
          }),
      );
    }

    await Promise.all(repositoriesPromises);

    return this.counter.getBiggestRepos(
      Object.values(repositories),
      reposNumber,
    );
  }
}
