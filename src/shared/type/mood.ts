import {ActivityType} from './activiti';

export type MoodType = {
  id: number;
  inputName: string;
  rating?: number;
  moodType: string;
  activities?: Array<number>;
  activitiesObj?: Array<ActivityType>;
  createTime?: number;
  lastMood?: any;
  image?: Array<string>;
  description?: string;
};
