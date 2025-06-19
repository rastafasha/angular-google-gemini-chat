import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { key } from '../key';
import { GoogleGeminiProService } from './services/google-gemini-pro.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,  LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Angular Google Gemini IA';
  result = '';
  prompt = '';
  isLoading = false;

  constructor(private googleGeminiPro: GoogleGeminiProService) {
    this.googleGeminiPro.initialize(key);
  }

  async generate() {
    this.isLoading = true;
    this.result = await this.googleGeminiPro.generateText(this.prompt);
    this.isLoading = false;
  }

  limpiar(){
    location.reload();
  }

}
