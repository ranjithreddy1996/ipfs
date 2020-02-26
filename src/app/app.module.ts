import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { TransactionListComponent } from './Admin/transaction-list/transaction-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';


import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from  '@angular/material';
import { QRCodeModule } from 'angularx-qrcode';
import { OfficerRegistrationComponent } from './Admin/officer-registration/officer-registration.component';

import { RetailerProfileComponent } from './retailer/retailer-profile/retailer-profile.component';
import { SupplierRegistrationComponent } from './Admin/supplier-registration/supplier-registration.component';
import { SupplierDashboardComponent } from './supplier/supplier-dashboard/supplier-dashboard.component';
import { ManufactureRegistrationComponent } from './supplier/manufacture-registration/manufacture-registration.component';
import { ManufactureDashboardComponent } from './manufacture/manufacture-dashboard/manufacture-dashboard.component';
import { DistributerRegistrationComponent } from './manufacture/distributer-registration/distributer-registration.component';
import { DistributerDashboardComponent } from './distributer/distributer-dashboard/distributer-dashboard.component';
import { RetailerRegistrationComponent } from './distributer/retailer-registration/retailer-registration.component';
import { AddMaterialsComponent } from './supplier/add-materials/add-materials.component';
import { ManufactureRequestsComponent } from './supplier/manufacture-requests/manufacture-requests.component';
import { AddProductsComponent } from './manufacture/add-products/add-products.component';
import { DistRequestComponent } from './manufacture/dist-request/dist-request.component';
import { RetailerRequestsComponent } from './distributer/retailer-requests/retailer-requests.component';
import { AddProductsdisComponent } from './distributer/add-productsdis/add-productsdis.component';
import { AddMaterialsmanuComponent } from './manufacture/supplier-approved/add-materialsmanu.component';
import { AddProdutsretailerComponent } from './retailer/add-produtsretailer/add-produtsretailer.component';
import { ReqDistributerComponent } from './retailer/req-distributer/req-distributer.component';
import { ReqManufactureComponent } from './distributer/req-manufacture/req-manufacture.component';
import { ReqSupplierComponent } from './manufacture/req-supplier/req-supplier.component';
import { MaterialStatusComponent } from './supplier/material-status/material-status.component';
import { ProductStatusComponent } from './manufacture/product-status/product-status.component';
import { ManuApprovalComponent } from './manufacture/manu-approval/manu-approval.component';
import { ManuRejectedComponent } from './manufacture/manu-rejected/manu-rejected.component';
import { SupRejectedComponent } from './supplier/sup-rejected/sup-rejected.component';
import { SupApprovallistComponent } from './supplier/sup-approvallist/sup-approvallist.component';
import { DisApprovallistComponent } from './distributer/dis-approvallist/dis-approvallist.component';
import { DisRejectedComponent } from './distributer/dis-rejected/dis-rejected.component';
import { ManuApprovalsComponent } from './distributer/manu-approvals/manu-approvals.component';
import { DisRejComponent } from './retailer/dis-rej/dis-rej.component';
import { DisApprovalComponent } from './retailer/dis-approval/dis-approval.component';
import { ManuRejComponent } from './distributer/manu-rej/manu-rej.component';
import { SupplierRejComponent } from './manufacture/supplier-rej/supplier-rej.component';
import { initIPFS, IPFS } from './ipfs';
import { DamagedatsupllierComponent } from './supplier/damagedatsupllier/damagedatsupllier.component';
import { ReturndamagedatsupllierComponent } from './supplier/returndamagedatsupllier/returndamagedatsupllier.component';
import { ManuDamagedToSupllierComponent } from './manufacture/manu-damaged-to-supllier/manu-damaged-to-supllier.component';
import { ManuDamagedInFormComponent } from './manufacture/manu-damaged-in-form/manu-damaged-in-form.component';
import { DistributerDamagedToManuComponent } from './manufacture/distributer-damaged-to-manu/distributer-damaged-to-manu.component';
import { DistributerDamagedFoamComponent } from './distributer/distributer-damaged-foam/distributer-damaged-foam.component';
import { DistributerDamagedToManufactureComponent } from './distributer/distributer-damaged-to-manufacture/distributer-damaged-to-manufacture.component';
import { DistributerDamagedByRetailerComponent } from './distributer/distributer-damaged-by-retailer/distributer-damaged-by-retailer.component';
import { ReturnToDistributerComponent } from './retailer/return-to-distributer/return-to-distributer.component';
import { ChartsModule } from 'ng2-charts';
import { TransactionNavComponent } from './Admin/transaction-nav/transaction-nav.component';
import { ManufactureListComponent } from './Admin/manufacture-list/manufacture-list.component';
import { DistributerListComponent } from './Admin/distributer-list/distributer-list.component';
import { RetailerListComponent } from './Admin/retailer-list/retailer-list.component';
import {DataTableModule} from "angular-6-datatable";
import { SignupComponent } from './Authentication/signup/signup.component';
import { HttpService } from './http.service';
import {HttpClientModule} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";  

import { NgxPrintModule } from 'ngx-print';
import { OfficerlistComponent } from './Admin/officerlist/officerlist.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    NavbarComponent,
    TransactionListComponent,
    OfficerRegistrationComponent,
   
    RetailerProfileComponent,
   
    SupplierRegistrationComponent,
   
    SupplierDashboardComponent,
   
    ManufactureRegistrationComponent,
   
    ManufactureDashboardComponent,
   
    DistributerRegistrationComponent,
   
    DistributerDashboardComponent,
   
    RetailerRegistrationComponent,
   
    AddMaterialsComponent,
   
    ManufactureRequestsComponent,
   
    AddProductsComponent,
   
    DistRequestComponent,
   
    RetailerRequestsComponent,
   
    AddProductsdisComponent,
   
   
    AddMaterialsmanuComponent,
   
   
    AddProdutsretailerComponent,
   
   
    ReqDistributerComponent,
   
   
    ReqManufactureComponent,
   
   
    ReqSupplierComponent,
   
   
    MaterialStatusComponent,
   
   
    ProductStatusComponent,
   
   
    ManuApprovalComponent,
   
   
    ManuRejectedComponent,
   
   
    SupRejectedComponent,
   
   
    SupApprovallistComponent,
   
   
    DisApprovallistComponent,
   
   
    DisRejectedComponent,
   
   
    ManuApprovalsComponent,
  
    
   
    DisRejComponent,
   
   
    DisApprovalComponent,
   
   
    ManuRejComponent,
   
   
    SupplierRejComponent,
   
   
    DamagedatsupllierComponent,
   
   
    ReturndamagedatsupllierComponent,
   
   
    ManuDamagedToSupllierComponent,
   
   
    ManuDamagedInFormComponent,
   
   
    DistributerDamagedToManuComponent,
   
   
    DistributerDamagedFoamComponent,
   
   
    DistributerDamagedToManufactureComponent,
   
   
    DistributerDamagedByRetailerComponent,
   
   
    ReturnToDistributerComponent,
   
   
    TransactionNavComponent,
   
   
    ManufactureListComponent,
   
   
    DistributerListComponent,
   
   
    RetailerListComponent,
   
   
    SignupComponent,

    OfficerlistComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    QRCodeModule,
    ChartsModule,
    DataTableModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPrintModule,

    

    

  ],
  providers: [HttpService,{
    provide: APP_INITIALIZER,
    useFactory: initIPFS,
    multi: true,
    deps: [IPFS]
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
