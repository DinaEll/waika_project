export const forumPageDataMock = {
  id: 1,
  title: 'Doom 666',
  description:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  date: new Date().setDate(new Date().getDate() - 7),
  author: {
    name: 'Han Solo',
    avatarSrc:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  comments: [
    {
      id: 2,
      author: {
        name: 'Han Solo',
        avatarSrc:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      },
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum perspiciatis consequatur ab enim odio voluptatem odit, quidem quisquam eligendi rem laboriosam. Corrupti neque cumque nam culpa maiores esse aliquid excepturi.',
      date: new Date(),
    },
    {
      id: 3,
      author: {
        name: 'Nah Olos',
        avatarSrc: '',
      },
      description:
        'Мушвикитон бак тайм ту зэ гуд олд деейс ванна мама сын нос трусы пинал вы стресс даун.',
      date: new Date(),
    },
  ],
};

export const initialReplyFormData = {
  reply: '',
};

export interface replyFormData {
  reply: string;
}
