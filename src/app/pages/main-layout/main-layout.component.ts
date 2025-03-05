import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from './models/menu-item.model';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  sidenavMode: MatDrawerMode = 'side';
  menuOpen = true;

  // Menu items list
  menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'dashboard',
      isSelected: false,
      hasSubmenu: false
    },
    {
      name: 'Items',
      url: '/item',
      icon: 'casino',
      isSelected: false,
      hasSubmenu: false
    },
    {
      name: 'Orders',
      url: '/order',
      icon: 'local_grocery_store',
      isSelected: false,
      hasSubmenu: false
    },
    {
      name: 'Reports',
      url: '/report',
      icon: 'assignment',
      isSelected: false,
      hasSubmenu: false
    },
    {
      name: 'Profile',
      url: '/profile',
      icon: 'person',
      isSelected: false,
      hasSubmenu: false,
      isDialog: true
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver,
     private router: Router,
     public dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateMenuSelection(this.router.url);

    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.sidenavMode = result.matches ? 'over' : 'side';
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateMenuSelection(event.urlAfterRedirects);
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sidenav.open();
    });
  }

  updateMenuSelection(currentRoute: string): void {
    this.menuItems.forEach(item => {
      item.isSelected = this.isRouteSelected(item, currentRoute);

      if (item.hasSubmenu && item.submenu) {
        item.submenu.forEach(subItem => {
          subItem.isSelected = this.isRouteSelected(subItem, currentRoute);
        });
      }
    });
  }

  onMenuItemClick(item: MenuItem): void {
    if (item.isDialog) {
      this.openDialog();
    } else {
      this.router.navigate([item.url]);
    }
  }

  openDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '80vw',
      data: { name: 'Your Name' },
      panelClass: 'no-padding-dialog'
    });
  }

  private isRouteSelected(item: MenuItem, currentRoute: string): boolean {
    return item.url === currentRoute;
  }
}
