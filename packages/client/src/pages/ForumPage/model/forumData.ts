export interface ForumData {
  id: number;
  name: string;
  themes: number;
  answers: number;
}

export const forumsListMock: ForumData[] = [
  {
    id: 1,
    name: 'Новые игры',
    themes: 99,
    answers: 99,
  },
  {
    id: 2,
    name: 'Еще один форум',
    themes: 0,
    answers: 0,
  },
  {
    id: 2,
    name: 'И еще форум',
    themes: 1,
    answers: 2,
  },
];

export interface ForumTopicData {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
}
export const forumTopicsListMock: ForumTopicData[] = [
  {
    id: 'doom777',
    title: 'Doom 777',
    author: 'Doom',
    replies: 99,
    views: 99,
  },
  {
    id: 'sometopicname',
    title: 'Mahjong by Шaika',
    author: 'Dina',
    replies: 0,
    views: 0,
  },
  {
    id: 'anothertopicname',
    title: 'WoW: The War Within',
    author: 'Vonkrieger',
    replies: 111,
    views: 99,
  },
];

export const enum ForumPageStages {
  forumsList = 'forumsList',
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
