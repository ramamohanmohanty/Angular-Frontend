
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Property } from 'src/app/property.model';
import { PropertyService } from 'src/app/property.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {



  onPageChange(event: any): void {

  }

  property:Property={}
   
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  searchTerm: string = '';
  first = 0;
  rows = 5;
  totalEntities = 100;

  filter(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filteredProperties = this.properties.filter(property =>
        Object.values(property).some(value => value?.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
}

displayupdatebutton=false
  selected_propertyid:any;
    loading!: boolean;
    displayDialog!: boolean;
    static entity: any;

    constructor(private propertyService: PropertyService, private router: Router, private http: HttpClient, 
      private formBuilder: FormBuilder,) {
// this.entityForm = new FormGroup({

// });
      }

onpropertyAdd() {

  this.displayDialog = true
  this.resetForm();
}

resetForm(): void {
  this.property={}
}

ngOnInit(): void {
  this.loadProperty();
}



saveProperty(entityForm:any): void {
  let body=this.property
  this.propertyService.createProperties(body).subscribe(
    (response: Property) => {
      console.log('Property saved successfully:', response);
      alert("Saved")
      this.loadProperty();
      this.resetForm();
      this.alertSave();
    },
    (error: any) => {
      console.error('Error saving entity:', error);
    }
  );
  this.displayDialog = false;
  entityForm.reset();
}

alertSave() {
  Swal.fire("Success"," Property details saved successfully","success").then(() => {
    location.reload();
  });;
}


loadProperty(): void {
  this.propertyService.getProperties().subscribe(
    (entities: Property[]) => {
      this.properties = entities;
    },
    (error: any) => {
      this.properties=[]
      console.error('Error fetching entities:', error);
    }
  );
}

// Displayallstatenames(): void {
//   this.propertyService.getProperties()
//     .subscribe(res=>{
//       for(let i=0;i<res.length;i++){
      

//       }
//      this.stateclass=res;
//     },(error:any)=>{
//       this.stateclass=[]
//     });
// }


Propertydetails(propertydetails:any){
  debugger
  this.displayDialog = true
  this.displayupdatebutton=true
  this.selected_propertyid=propertydetails.propertyid
  this.property={...propertydetails}  
}


deletePropertys(propertyId:any): void {
  this.propertyService.deleteproperties(propertyId).subscribe(
    () => {
      console.log('Property details deleted successfully');
      this.loadProperty();
      this.alertdelete();
    },
    (error) => {
      console.error('Error deleting entity:', error);
    }
  );
  this.displayDialog = false;
}

alertdelete() {
  Swal.fire({
    title: 'Success',
    text: 'Property details deleted successfully',
    icon: 'success'
  }).then(() => {
    location.reload(); 
  });

}

updateEntity(entityForm:any): void {
  this.propertyService.updateProperty(this.selected_propertyid,this.property).subscribe(
    (response: Property) => {
      console.log('Property details updated successfully:', response);
      this.loadProperty();
      this.resetForm();
      this.alertupdate();
      this.selected_propertyid=null
    },
    (error) => {
      console.error('Error updating entity:', error);
    }
  );
  entityForm.reset()
this.displayDialog = false;
}

alertupdate() {
  Swal.fire({
    title: 'Success',
    text: 'Entity Master details updated successfully',
    icon: 'success'
  }).then(() => {
    location.reload(); // Refresh the page
  });

}




}


