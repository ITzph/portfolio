export interface Message {
  message: string;
}
export class Profile {
  name: string;
  image: string;
  address: string;
  currentCompany: string;
  currentRole: string;
  testimonial: string;
  greetings: string[];

  // This should be removed after db integrations
  static defaultInstance(): Profile {
    return {
      name: 'Code Gino',
      image: '',
      address: 'Mars',
      currentCompany: 'Krusty Krab',
      currentRole: 'Tank',
      testimonial: 'Hoy',
      greetings: [
        'The quick brown fox jumps over the lazy dog.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        'Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor.',
        'Ac placerat vestibulum lectus mauris ultrices eros in cursus.',
        'Purus in mollis nunc sed id semper risus in hendrerit.',
        'Welcome to my Page!',
      ],
    };
  }
}
