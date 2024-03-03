import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get('common-contributed')
  async getMostCommonContributed(
    @Query('owner') owner: string,
    @Query('repoName') repoName: string,
  ): Promise<any[]> {
    return this.githubService.getMostCommonContributedRepos(owner, repoName);
  }
}
