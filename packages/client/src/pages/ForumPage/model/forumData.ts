export interface ForumData {
  id: number;
  name: string;
  themes: number;
  answers: number;
}

export interface ForumTopicData {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
}

export const enum ForumPageStages {
  forumTopicsList = 'forumTopicsList',
  createThread = 'createThread',
}

export const initialNewThreadFormData = {
  title: '',
  descr: '',
};

export interface newThreadFormData {
  title: string;
  descr: string;
}
