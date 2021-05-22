import { ProjectOverview } from '../gen/timeTrack.api.generated';
import { AuthInfo } from '../store/authInfo/types';

const minutesToDaysHoursMinutes = (min: number | undefined) => {
  if (!min || min < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
    };
  }
  const days = Math.floor(min / 1440); // 60*24
  const hours = Math.floor((min - (days * 1440)) / 60);
  const minutes = Math.round(min % 60);
  return {
    days,
    hours,
    minutes,
  };
};

const printSpentTime = (min: number | undefined) => {
  const time = minutesToDaysHoursMinutes(min);
  return `${time.days}d ${time.hours}h ${time.minutes}min`;
};

export const sortOwnProjects = (
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

export default printSpentTime;
