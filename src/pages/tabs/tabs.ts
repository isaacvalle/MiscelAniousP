import { Component } from '@angular/core';
import {PrincipalPage, CatalogoPage, MisaldoPage, CompartirPage, CuentaPage} from '../index.paginas';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = PrincipalPage;
  tab2 = CatalogoPage;
  tab3 = MisaldoPage;
  tab4 = CompartirPage;
  tab5 = CuentaPage;



}
