import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { SkeletonModule } from 'primeng/skeleton'

@Component({
    selector: 'app-client-see-edit-placeholder',
    templateUrl: './client-see-edit-placeholder.html',
    styleUrl: './client-see-edit-placeholder.scss',
    imports: [
        SkeletonModule,
        MatCardModule
    ]
})
export class ClientSeeEditPlaceholder {

}