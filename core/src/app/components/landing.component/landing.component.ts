import { TravisService } from './../../services/travis/travis.service';
import { Component } from '@angular/core';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [TravisService]
})
export class LandingComponent {

  constructor(public travisService: TravisService) {

  }

  public onclick() {
    this.travisService.getState();
  }

  /**
   * Componente que actualmente gestiona el html de la página de inicio
   * Se prevee que en futuras iteraciones gestionemos también animaciones
   */

}
