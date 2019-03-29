import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsGhostComponent } from './cs-ghost/cs-ghost';

@NgModule({
	declarations: [CsGhostComponent],
	imports: [CommonModule],
	exports: [CsGhostComponent]
})
export class ComponentsModule {}
