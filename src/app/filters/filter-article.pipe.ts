import { Pipe, PipeTransform } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { Article } from "../models/article"

@Pipe({
  name: "filterArticle"
})
export class FilterArticlePipe implements PipeTransform {
  transform(articles: Article[], filter: string): Article[] {
    if (articles === null) return []
    filter = filter.toLowerCase()
    return articles.filter(
      article =>
        (article.title && article.title.toLowerCase().includes(filter)) ||
        (article.content && article.content.toLowerCase().includes(filter)) ||
        (article.authors && article.authors.toLowerCase().includes(filter))
    )
  }
}