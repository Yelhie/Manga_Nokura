import { Component, Renderer2, OnInit } from '@angular/core';
import { AccountIconComponent } from '../../icons/account-icon/account-icon.component';
import { SunIconComponent } from '../../icons/sun-icon/sun-icon.component';
import { ShoppingIconComponent } from '../../icons/shopping-icon/shopping-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AccountIconComponent, SunIconComponent, ShoppingIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  darkMode = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.darkMode = true;
      this.renderer.addClass(document.documentElement, 'dark-theme');
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.renderer.addClass(document.documentElement, 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
