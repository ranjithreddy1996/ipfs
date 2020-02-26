import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { TransactionListComponent } from './Admin/transaction-list/transaction-list.component';
import { OfficerRegistrationComponent } from './Admin/officer-registration/officer-registration.component';
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
import { RetailerProfileComponent } from './retailer/retailer-profile/retailer-profile.component';
import { AddProdutsretailerComponent } from './retailer/add-produtsretailer/add-produtsretailer.component';
import { ReqSupplierComponent } from './manufacture/req-supplier/req-supplier.component';
import { ReqDistributerComponent } from './retailer/req-distributer/req-distributer.component';
import { ReqManufactureComponent } from './distributer/req-manufacture/req-manufacture.component';
import { AddMaterialsmanuComponent } from './manufacture/supplier-approved/add-materialsmanu.component';
import { MaterialStatusComponent } from './supplier/material-status/material-status.component';
import { ProductStatusComponent } from './manufacture/product-status/product-status.component';
import { ManuApprovalComponent } from './manufacture/manu-approval/manu-approval.component';
import { ManuRejectedComponent } from './manufacture/manu-rejected/manu-rejected.component';
import { SupRejectedComponent } from './supplier/sup-rejected/sup-rejected.component';
import { SupApprovallistComponent } from './supplier/sup-approvallist/sup-approvallist.component';
import { DisApprovallistComponent } from './distributer/dis-approvallist/dis-approvallist.component';
import { DisRejectedComponent } from './distributer/dis-rejected/dis-rejected.component';
import { ManuApprovalsComponent } from './distributer/manu-approvals/manu-approvals.component';
import { DisApprovalComponent } from './retailer/dis-approval/dis-approval.component';
import { DisRejComponent } from './retailer/dis-rej/dis-rej.component';
import { SupplierRejComponent } from './manufacture/supplier-rej/supplier-rej.component';
import { ManuRejComponent } from './distributer/manu-rej/manu-rej.component';
import { DamagedatsupllierComponent } from './supplier/damagedatsupllier/damagedatsupllier.component';
import { ReturndamagedatsupllierComponent } from './supplier/returndamagedatsupllier/returndamagedatsupllier.component';
import { ManuDamagedToSupllierComponent } from './manufacture/manu-damaged-to-supllier/manu-damaged-to-supllier.component';
import { ManuDamagedInFormComponent } from './manufacture/manu-damaged-in-form/manu-damaged-in-form.component';
import { DistributerDamagedToManuComponent } from './manufacture/distributer-damaged-to-manu/distributer-damaged-to-manu.component';
import { DistributerDamagedFoamComponent } from './distributer/distributer-damaged-foam/distributer-damaged-foam.component';
import { DistributerDamagedToManufactureComponent } from './distributer/distributer-damaged-to-manufacture/distributer-damaged-to-manufacture.component';
import { DistributerDamagedByRetailerComponent } from './distributer/distributer-damaged-by-retailer/distributer-damaged-by-retailer.component';
import { ReturnToDistributerComponent } from './retailer/return-to-distributer/return-to-distributer.component';
import { TransactionNavComponent } from './Admin/transaction-nav/transaction-nav.component';
import { ManufactureListComponent } from './Admin/manufacture-list/manufacture-list.component';
import { DistributerListComponent } from './Admin/distributer-list/distributer-list.component';
import { RetailerListComponent } from './Admin/retailer-list/retailer-list.component';
import { SignupComponent } from './Authentication/signup/signup.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },

{
  path: '',
  component: NavbarComponent,
  children: [    
    {path : 'Admin/admin-dashboard', component:AdminDashboardComponent},
    // {path : 'Admin/transaction-list', component:TransactionListComponent},
    {path : 'Admin/officer-registration', component:OfficerRegistrationComponent},
    {path : 'Admin/supplier-registration', component:SupplierRegistrationComponent},
    {path : 'Admin/transaction-nav', component:TransactionNavComponent},
    // {path : 'Admin/manufacture-list', component:ManufactureListComponent},
    // {path : 'Admin/distributer-list', component:DistributerListComponent},
    // {path : 'Admin/retailer-list', component:RetailerListComponent},


    
    {path : 'Supplier/supplier-dashboard', component:SupplierDashboardComponent},
    {path : 'Supplier/add-materials', component:AddMaterialsComponent},
    {path : 'Supplier/manufacture-requests', component:ManufactureRequestsComponent},
    {path : 'Supplier/manufacture-registration', component:ManufactureRegistrationComponent},
    {path : 'Supplier/material-status', component:MaterialStatusComponent},
    {path : 'Supplier/sup-rejected', component:SupRejectedComponent},
    {path : 'Supplier/sup-approvallist', component:SupApprovallistComponent},
    {path : 'Supplier/damagedatsupllier', component:DamagedatsupllierComponent},
    {path : 'Supplier/returndamagedatsupllie', component:ReturndamagedatsupllierComponent},

    {path : 'Manufacture/manufacture-dashboard', component:ManufactureDashboardComponent},
    {path : 'Manufacture/distributer-registration', component:DistributerRegistrationComponent},
    {path : 'Manufacture/add-products', component:AddProductsComponent},
    {path : 'Manufacture/dist-request', component:DistRequestComponent},
    {path : 'Manufacture/add-materialsmanu', component:AddMaterialsmanuComponent},
    {path : 'Manufacture/req-supplier', component:ReqSupplierComponent},
    {path : 'Manufacture/product-status', component:ProductStatusComponent},
    {path : 'Manufacture/manu-approval', component:ManuApprovalComponent},
    {path : 'Manufacture/manu-rejected', component:ManuRejectedComponent},
    {path : 'Manufacture/supplier-rej', component:SupplierRejComponent},
    {path : 'Manufacture/manu-damaged-to-supllier', component:ManuDamagedToSupllierComponent},
    {path : 'Manufacture/manu-damaged-in-form', component:ManuDamagedInFormComponent},
    {path : 'Manufacture/distributer-damaged-to-manu', component:DistributerDamagedToManuComponent},


    
    {path : 'Distributer/distributer-dashboard', component:DistributerDashboardComponent},
    {path : 'Distributer/retailer-registration', component:RetailerRegistrationComponent},
    {path : 'Distributer/add-productsdis', component:AddProductsdisComponent},
    {path : 'Distributer/retailer-requests', component:RetailerRequestsComponent},
    {path : 'Distributer/req-manufacture', component:ReqManufactureComponent},
    {path : 'Distributer/dis-approvallist', component:DisApprovallistComponent},
    {path : 'Distributer/dis-rejected', component:DisRejectedComponent},
    {path : 'Distributer/manu-approvals', component:ManuApprovalsComponent},
    {path : 'Distributer/manu-rej', component:ManuRejComponent},
    {path : 'Distributer/distributer-damaged-foam', component:DistributerDamagedFoamComponent},
    {path : 'Distributer/distributer-damaged-to-manufacture', component:DistributerDamagedToManufactureComponent},
    {path : 'Distributer/distributer-damaged-by-retailer', component:DistributerDamagedByRetailerComponent},


    {path : 'Retailer/retailer-profile', component:RetailerProfileComponent},
    {path : 'Retailer/add-produtsretailer', component:AddProdutsretailerComponent},
    {path : 'Retailer/req-distributer', component:ReqDistributerComponent},
    {path : 'Retailer/dis-approvals', component:DisApprovalComponent},
    {path : 'Retailer/dis-rej', component:DisRejComponent},
    {path : 'Retailer/return-to-distributer', component:ReturnToDistributerComponent},
  ]
},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
