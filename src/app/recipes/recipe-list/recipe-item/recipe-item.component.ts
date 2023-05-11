import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // use input to get data from a parent component
  @Input() recipe: Recipe;
  @Input() index: number;
  // use output to listen to events in other components
  // @Output() recipeSelected = new EventEmitter<void>();


  onSelected() {
    // this.recipeSelected.emit();
  }

  ngOnInit(): void {
    
  }

}
