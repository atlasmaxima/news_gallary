export interface ArticleType {
    id:         string;
    byline: {
        text:   string,
    };
    head:       string;
    teaser:     string; 
    image:      string;
    bylineId:   number;
  }

  export interface BylineElementType {
    bylineId:   number;
    text:       string;
  }