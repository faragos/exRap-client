import { ProjectOverview } from '../gen/timeTrack.api.generated';
import { AuthInfo } from '../store/authInfo/types';

/**
 * Sorts contributor projects descending (spend time)
 * @param contributorProjects - all projects as a contributor from a user
 * @param authInfo - user store info of current user
 */
const sortOwnProjects = (
  contributorProjects: ProjectOverview[] | undefined,
  authInfo: AuthInfo,
) => contributorProjects?.slice().sort(
  (a, b) => {
    // eslint-disable-next-line max-len
    if (a.contributorsSpentMinutes?.[authInfo.username] && b.contributorsSpentMinutes?.[authInfo.username]) {
      // eslint-disable-next-line max-len
      return b?.contributorsSpentMinutes?.[authInfo.username] - a?.contributorsSpentMinutes?.[authInfo.username];
    }
    return 0;
  },
);

export default sortOwnProjects;
