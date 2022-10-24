export type ActivityType = {
  id: number;
  name: string;
  type: string;
  image: string;
  arrActivitiesFollowMood?: Array<ActivityType>;
  arrActivities?: Array<ActivityType>;
};

export type ActivityObject = {
  id: number;
  name: string;
  image: string;
  type?: string;
};
