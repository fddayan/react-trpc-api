export interface Article {
  articleID: string;
  title: string;
  url: string;
}

export interface Database {
  article: Article;
}
