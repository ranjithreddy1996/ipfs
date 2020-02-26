import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/web3.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // styleUrls: ["../assets/css/semidark-style-1.min.css"] 
})

export class LoginComponent implements OnInit {
  id: any;
  pass: any;
  error: string;

  constructor(private router: Router, private _web3service : Web3Service,private SpinnerService: NgxSpinnerService) { }
  childd: Array<any>=[];
  ngOnInit() {
   

  }

  user = {
    email : "",
    password : ""
  }
  public error_message;
  public show : boolean = false;
  onSubmit(user){
    this.SpinnerService.show();  

     this._web3service.login(user.email, user.password).then(result => {
       console.log("dfghjfgh", result);
      // if result 1 admin login user
       if (result[0] ==4&&result[1]==200) 
   //  && (user.email == "admin" && user.password == "admin")) 
     {
       //localStorage.setItem("admin");
       localStorage.setItem("admin",JSON.stringify(user.email ))
this.show=true;
// this._web3service.getRegs(this.show);


// });
        localStorage.setItem("openadmin", 'true');
        this.router.navigate(['/Admin/admin-dashboard'], { replaceUrl: true });
        this.SpinnerService.hide();  

      }
      else if (result[0] ==0&&result[1]==100) {
        localStorage.setItem("supplier",JSON.stringify(user.email ))
        console.log("result user",user.email);
        

        localStorage.setItem("opensupplier", 'true');
        localStorage.setItem("username",user.email)

        this.router.navigate(['Supplier/supplier-dashboard'], { replaceUrl: true });
        this.SpinnerService.hide();  

      }
      else if (result[0] ==1&&result[1]==100) {
        localStorage.setItem("openmanufacture",JSON.stringify( user.email));
        console.log(user.email);
        
        this.router.navigate(['Manufacture/manufacture-dashboard'], { replaceUrl: true });
        this.SpinnerService.hide();  

    
      }
      else if (result[0] ==2&&result[1]==100) {
        localStorage.setItem("opendistributer",JSON.stringify( user.email));
        console.log(user.email);

        this.router.navigate(['Distributer/distributer-dashboard'], { replaceUrl: true });
        this.SpinnerService.hide();  

      }
      
      else if (result[0] ==3&&result[1]==100) {
        localStorage.setItem("openretailer",JSON.stringify(  user.email));
        this.router.navigate(['Retailer/retailer-profile'], { replaceUrl: true });
        this.SpinnerService.hide();  

      }

      //new code

      else if (result[0] == 0   &&  result[1]==  0) {
      //  alert("Wrong Details")
      this.error="User Name or Password Not Correct"
      this.SpinnerService.hide();  

      }
    });
      
    // this._web3service.officer(user.email).then(result => {
    //   console.log("dfghjfgh", result);
    //   if (user.email == result[4] && user.password == result[1]){
    //     localStorage.setItem("openofficer", user.email);
    //     this.router.navigate(['/Government/government-dashboard'], { replaceUrl: true });
    //   }


    // });
    //    if (user.email == "off" && user.password == "off"){
    //     localStorage.setItem("openofficer", user.email);
    //     this.router.navigate(['/Government/government-dashboard'], { replaceUrl: true });
    //   }

     

    //   else if (user.email == "gua" && user.password == "gua"){
    //     localStorage.setItem("openguardian", user.email);
    //     this.router.navigate(['/Guardian/guardian-profile'], { replaceUrl: true });
    //   }
    //   else {
    //     this._web3service._contract.getPastEvents('certificateevent', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    //     .then((event) => {
    //       for (var i = 0; i < event.length; i++) {

    //         this.id=event[i].returnValues.certid
    //         if(user.email==this.id){
    //           this._web3service.nominee(user.email).then(result => {
    //             console.log("!!!!!!!!@@@@@@@@@", result);
              
    //             this.pass=result.password
    //             if (user.password == this.pass ) {
    //               console.log("event@@@@@@@!!!!!!!!!!",this.id);
    //               localStorage.setItem("openparent", user.email);
    //               this.router.navigate(['/Parent/parent-profile'], { replaceUrl: true });
    //             }
             
    //          });
           
    //         // this.childd.push(event[i]);
    //         // console.log("login!@@@@@@@@@@@@@@@"+this.childd);
    //         }
            
    //       }
    //   });
    //   this._web3service._contract.getPastEvents('deathcertificateevent', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    //   .then((event) => {
    //       for (var i = 0; i < event.length; i++) {

    //         this.id=event[i].returnValues.certid
    //         if(user.email==this.id){
    //           this._web3service.nominee(user.email).then(result => {
    //             console.log("!!!!!!!!@@@@@@@@@", result);
              
    //             this.pass=result.password
    //             if (user.password == this.pass ) {
    //               console.log("event@@@@@@@!!!!!!!!!!",this.id);
    //               localStorage.setItem("openguardian", user.email);
    //               this.router.navigate(['/Guardian/guardian-profile'], { replaceUrl: true });
    //             }
             
    //          });
    //         }
            
    //       }
    //   });
       
    //  }
      
    // });


    // if(user.email == "" && user.password == ""){
    //   // error code
    // } 
    // else{
    // this._web3service.loginis(user.email).then(result1=>{
    //  console.log(result1); 
    // //       this.show = false;
    // //       if(result1.username == ""){
    // //         this.show = true;
    // //         this.error_message = "Invalid Username & Password"
    //       //} 
    //       if( (result1[5] !== "") &&(result1[5] === user.email) &&  (result1[1] === user.password))
    //       {       
    //         localStorage.setItem("university",JSON.stringify(result1))
    //         localStorage.setItem("openissuer","true")
    //         localStorage.setItem("username",user.email)
    //         this.router.navigate(['University/university-dashboard'], { replaceUrl: true });
    //       }
    //     });
    // //}
      
    //   this._web3service.employer(user.email).then(result2=>{
    //     console.log("employeer",result2);
      
    //     if( (result2[0] !== "") &&(result2[0] === user.email) &&  (result2[1] === user.password)){
          
    //       localStorage.setItem("openemployer","true");
    //       this.router.navigate(['./side-nav/admindash'], { replaceUrl: true });
    //     }
        
      
    //   });
      
    //   this._web3service.getstu(user.email).then(result2=>{
    //     console.log(result2);
        
    //     if( (result2[5] !== "") &&(result2[0] === user.email) &&  (result2[8] === user.password))
    //     {
         
    //       localStorage.setItem("student",JSON.stringify(result2))
    //       localStorage.setItem("studentStatus","true")
    //       localStorage.setItem("username",user.email)
    //       this.router.navigate(['/Student/student-dashboard'], { replaceUrl: true });
    //     }
        
  //       });
      
   }
   link(){
     this.router.navigate(['signup'])
   }
}
