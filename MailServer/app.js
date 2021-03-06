// $('html').append('<link rel="stylesheet" type="text/css" href="./style.css">');

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log('The mail has beed send 😃 and the id is ${info.messageId}');
    res.send(info);
  });
});
// app.post("/sendmailuni", (req, res) => {
//   console.log("request came");
//   let UNI = req.body;
//   sendMail(UNI, info1 => {
//     console.log('The mail has beed send 😃 and the id is ${info1.messageId}');
//     res.send(info1);
//   });
// });

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password 
    }
  });

  let mailOptions = {
    from: '"admin"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Application Submitted", // Subject line
  
  html:`<div class="card card_complete_email mt-md-5" style="   width: 65%; height:400px ! important;
  border-radius: 0px;
  margin: auto;">
  <div class="card-header  card_header_email pt-md-4 pb-md-4" style="  text-align: -webkit-center;
  background-color: #512da8;
  color: white;">
      <img src="eemail.png" class="imgi" style="width: 12%;">
      <div class="text-center mt-md-3">Welcome to Digital Blockchain Registration Platform</div><br/>
  </div>
  <div class="card-body"><br/>
  
      <div class="text-center ma" style=" font-weight: 400;
      font-size: 14px;  text-align: center;";>Your Account has been successfully registered</div><br/>
      <div class="lastdiv_email" style=" text-align-last: center;">
      <button class="btn verifyButton_email my-md-4" style=" background-color: #512da8;
      color: white;
      font-size: 11px;
      font-weight: 500;">Confirmation Mail</button><br/>
      </div>
      <div class="login_email mt-md-3" style="  font-size: 14px;
      font-weight: 600;"><span style="color: green;">*</span>Your Login Details</div><br/>
      <table class="my-md-3">
          <tbody class="table_t_email" style="font-size: 14px;
          font-weight: 400;">
              <tr>
                  <td>Username</td>
                  <td><span class="ml-md-2">:</span> ${user.id} </td>
              </tr>
              <tr>
                  <td>Password</td>
                  <td><span class="ml-md-2">:</span>  ${user.pass} </td>
              </tr>
          </tbody>
      </table><br/>

      <div id="alert_email" class="mt-md-5"><span style="color: black;  border: 1px solid #512da8;
      padding: 1%;
      border-radius: 2px;
      text-align: center;
      font-size: 12px;
      font-weight: 500;" >*Note - Please Don't share Your Login Details</span></div>
  </div>
 
</div>`
    // html: `<h3>${user.name} Login Details</h3>
    // <p>ID: ${user.id}</p>
    // <p>Password: ${user.pass}</p>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);

//   let mailOptions1 = {
//     from: '"admin"<example.gimail.com>', // sender address
//     to: user.email, // list of receivers
//     subject: "Application Submitted", // Subject line
  
//   html:`<div class="card card_complete_email mt-md-5" style="   width: 65%; height:400px ! important;
//   border-radius: 0px;
//   margin: auto;">
//   <div class="card-header  card_header_email pt-md-4 pb-md-4" style="  text-align: -webkit-center;
//   background-color: #512da8;
//   color: white;">
//       <img src="eemail.png" class="imgi" style="width: 12%;">
//       <div class="text-center mt-md-3">Welcome to Digital Blockchain Certificate Platform</div><br/>
//   </div>
//   <div class="card-body"><br/>
  
//       <div class="text-center ma" style=" font-weight: 400;
//       font-size: 14px;  text-align: center;";>Your Account has been successfully registered</div><br/>
//       <div class="lastdiv_email" style=" text-align-last: center;">
//       <button class="btn verifyButton_email my-md-4" style=" background-color: #512da8;
//       color: white;
//       font-size: 11px;
//       font-weight: 500;">Confirmation Mail</button><br/>
//       </div>
//       <div class="login_email mt-md-3" style="  font-size: 14px;
//       font-weight: 600;"><span style="color: green;">*</span>Your Login Details</div><br/>
//       <table class="my-md-3">
//           <tbody class="table_t_email" style="font-size: 14px;
//           font-weight: 400;">
//               <tr>
//                   <td>Username</td>
//                   <td><span class="ml-md-2">:</span> ${user.id} </td>
//               </tr>
//               <tr>
//                   <td>Password</td>
//                   <td><span class="ml-md-2">:</span>  ${user.pass} </td>
//               </tr>
//           </tbody>
//       </table><br/>

//       <div id="alert_email" class="mt-md-5"><span style="color: black;  border: 1px solid #512da8;
//       padding: 1%;
//       border-radius: 2px;
//       text-align: center;
//       font-size: 12px;
//       font-weight: 500;" >*Note - Please Don't share Your Login Details</span></div>
//   </div>
 
// </div>`
//     // html: `<h3>${user.name} Login Details</h3>
//     // <p>ID: ${user.id}</p>
//     // <p>Password: ${user.pass}</p>`
//   };

//   // send mail with defined transport object
//   let info1 = await transporter.sendMail(mailOptions1);

//   callback(info1);
}

// main().catch(console.error);
