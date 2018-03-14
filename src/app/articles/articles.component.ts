import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";
import { Article } from '../models/article';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

	private _articles : Observable<Article[]>;
	wordSearch : string;
  	constructor(private articleService: ArticleService) {
	}

	articles(): Observable<Article[]> {
    	return this._articles;
  	}

	ngOnInit() {
		this._articles = this.articleService.getArticles();
		this.wordSearch = "";
	}

	delete(article: Article){
		this.articleService.delete(article.id).subscribe(()=>{
			this._articles = this.articleService.getArticles();
    	});
  	}

}