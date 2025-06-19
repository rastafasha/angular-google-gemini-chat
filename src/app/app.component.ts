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

  title = 'Angular Gemini IA';
  result = '';
  prompt = '';
  image = '';
  isLoading = false;

  constructor(private googleGeminiPro: GoogleGeminiProService) {
    this.googleGeminiPro.initialize(key);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        this.isLoading = true;
        const base64Image = e.target.result as string;
        try {
          this.result = await this.googleGeminiPro.recognizeImage(base64Image);
        } catch (error) {
          this.result = 'Error recognizing image';
          console.error(error);
        }
        this.isLoading = false;
      };
      reader.readAsDataURL(file);
    }
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
