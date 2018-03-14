import { Component, OnInit, Input, Output } from '@angular/core';
import { Article } from '../models/article';
import { EventEmitter } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    @Input()
  	article: Article;

  	@Output()
	deletedArticle : EventEmitter<Article> = new EventEmitter();

  id : number;

    constructor(private route :ActivatedRoute, private articleService : ArticleService){
      this.id = undefined;
    	this.route.params.subscribe( params => {
			if (params && params['id']){
				this.articleService.get(params['id']).subscribe(fetchedArticle => this.article = fetchedArticle);
        this.id = params['id'];

			}
		});
    }

    ngOnInit() {
    	
  	}
    
    delete(){
    	this.deletedArticle.emit(this.article);
	}

	modify(){
		
	}
}