import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ArticleService} from "../services/article.service";
import {RawArticle} from "../models/raw-article";
import { EventEmitter } from '@angular/core';
import { Article } from '../models/article';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

	@Input()
  	article: Article;

	@Output()
	createdArticles : EventEmitter<Article> = new EventEmitter();


  articleForm : FormGroup;
  modification : boolean;

  constructor(private fb: FormBuilder, private articleService : ArticleService, private router : Router , private activatedRoute  : ActivatedRoute) {
    
  }

  ngOnInit() {
    this.articleForm = this.fb.group({
      'title': ['Fake Title', Validators.required ],
      'content' : ['', Validators.required ],
      'authors' : ['', Validators.required ],
    });
    this.modification = false;
    console.log(this.articleForm);
  	this.activatedRoute.params.subscribe( params => {
		if (params && params['id']){

			this.articleService.get(params['id']).subscribe(
				(fetchedArticle: Article) => 

				{this.article = fetchedArticle;

				console.log(this.article);

				this.articleForm.controls['title'].setValue(this.article.title);
				this.articleForm.controls['content'].setValue(this.article.content);
				this.articleForm.controls['authors'].setValue(this.article.authors);

				this.modification = true;
			});

		}
	});
  }

  actionArticle() {
  	if (this.modification) {
  		this.updateArticle();
  	} else {
  		this.createArticle();
  	}
  }

  createArticle(){
    const formModel = this.articleForm.value;
	const rawArticle : RawArticle = {
	  title : formModel.title,
	  content : formModel.content,
	  authors : formModel.authors
	}
    this.articleService.add(rawArticle).subscribe((newArticle)=>{
		this.router.navigate(['/articles/' + newArticle.id]);
	});
  }

  updateArticle(){
	const formModel = this.articleForm.value;

	this.article.title = formModel.title;
	this.article.content = formModel.content;
	this.article.authors = formModel.authors

  	this.articleService.put(this.article.id, this.article).subscribe(()=>{
		this.router.navigate(['/articles/' + this.article.id]);
	});
  }

}
