export class Post {
  id?: string;
  type: string = 'node--article';
  attributes: Attributes;
}

export class Attributes {
  title: string;
  body: Body;
}

export class Body {
  value: string;
  format: string = 'plain_text';
  summary: string;
}
