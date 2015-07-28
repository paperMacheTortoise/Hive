var oAuthController = require('./oAuthController.js');
var passport = require('passport');
var QuickBooks = require('../../node_modules/node-quickbooks/index.js');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://bizgramer.firebaseio.com/hr/qbo/qbokey");

module.exports = function(app) {


  app.get('/login', function(req, res){
    console.log("login req.session ", req.session);
    // console.log("login req.user ", req.user);
    // console.log("login req.session.passport.user", req.session.passport.user);

    // myFirebaseRef.on("value", function(snapshot) {
    //   console.log(snapshot.val());
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });

    res.redirect('/');
    //res.render('login', { user: req.user });
  });

  app.get('/auth/intuit/callback',
    passport.authenticate('intuit', { failureRedirect: '/login' }),
     function(req, res) {
        console.log("Successful LOGIN YAY!");
        console.log(req.session);
        //window.close();
        res.redirect('/after-auth.html');
    }
  );


  app.get('/receivable', function(req, res) {
     var qbRef = new Firebase('https://bizgramer.firebaseio.com/'+req.session.org+'/qbo/qbokey');
     qbRef.on('value', function(data){
      data = data.val();
      var myObjectArray = [];

      var qboFunc = new QuickBooks(data.consumerKey,
                              data.consumerSecret,
                              data.token,
                              data.tokenSecret,
                              data.realmId,
                              true, // use the Sandbox
                              true);
       myFirebaseRef = new Firebase("https://bizgramer.firebaseio.com/"+global.org+"/BizData");


       qboFunc.reportAgedPayableDetail({num_periods:3}, function(_, report){

          for(var i = 0; i < report.Rows.Row.length - 1; i++){
            for(var j = 0; j < report.Rows.Row[i].Rows.Row.length; j++){
              var myObject = {};
              myObject["days_past_due"] = report.Rows.Row[i].Header.ColData[0].value;
              myObject["client"] = report.Rows.Row[i].Rows.Row[j].ColData[3].value;
              myObject["client_id"] = report.Rows.Row[i].Rows.Row[j].ColData[3].id;
              myObject["amount"] = report.Rows.Row[i].Rows.Row[j].ColData[5].value;
              myObject["open_balance"] = report.Rows.Row[i].Rows.Row[j].ColData[6].value;
              myObject["invoice_num"] = report.Rows.Row[i].Rows.Row[j].ColData[2].value;
              myObject["invoice_date"] = report.Rows.Row[i].Rows.Row[j].ColData[0].value;
              myObject["due_date"] = report.Rows.Row[i].Rows.Row[j].ColData[4].value;
              myObjectArray.push(myObject);
            }
          }

          myFirebaseRef.update({
              Receivables: myObjectArray
            });
          res.send(200);
     });
    });
   });
app.get('/customers', function(req, res){
  console.log('THISISIT',req);
  var qbRef = new Firebase('https://bizgramer.firebaseio.com/'+req.session.org+'/qbo/qbokey');
  qbRef.on('value', function(data){
     data = data.val();
     var qboFunc = new QuickBooks(data.consumerKey,
                            data.consumerSecret,
                            data.token,
                            data.tokenSecret,
                            data.realmId,
                            true, // use the Sandbox
                            true);
     myFirebaseRef = new Firebase("https://bizgramer.firebaseio.com/"+global.org+"/BizData");
     qboFunc.findCustomers({}, function(err, list){
      console.log(list);
      myFirebaseRef.update({
        Customers: list
      });
      res.send(200);
     });
   });

});
app.get('/payable', function(req, res) {
  var qbRef = new Firebase('https://bizgramer.firebaseio.com/'+req.session.org+'/qbo/qbokey');
  qbRef.on('value', function(data){
   data = data.val();
   var myObjectArray = [];

   var qboFunc = new QuickBooks(data.consumerKey,
                          data.consumerSecret,
                          data.token,
                          data.tokenSecret,
                          data.realmId,
                          true, // use the Sandbox
                          true);
   myFirebaseRef = new Firebase("https://bizgramer.firebaseio.com/"+req.session.org+"/BizData");
   console.log(qboFunc);
   qboFunc.reportAgedPayableDetail({num_periods:3}, function(_, report){
      console.log('REPORT',report);
       for(var i = 0; i < report.Rows.Row.length - 1; i++){
        for(var j = 0; j < report.Rows.Row[i].Rows.Row.length; j++){
          var myObject = {};
          myObject["days_past_due"] = report.Rows.Row[i].Header.ColData[0].value;
          myObject["vendor"] = report.Rows.Row[i].Rows.Row[j].ColData[3].value;
          myObject["vendor_id"] = report.Rows.Row[i].Rows.Row[j].ColData[3].id;
          myObject["amount"] = report.Rows.Row[i].Rows.Row[j].ColData[6].value;
          myObject["open_balance"] = report.Rows.Row[i].Rows.Row[j].ColData[7].value;
          myObject["bill_num"] = report.Rows.Row[i].Rows.Row[j].ColData[2].value;
          myObject["billed_date"] = report.Rows.Row[i].Rows.Row[j].ColData[0].value;
          myObject["due_date"] = report.Rows.Row[i].Rows.Row[j].ColData[4].value;
          myObject["past_due"] = report.Rows.Row[i].Rows.Row[j].ColData[5].value;
          myObjectArray.push(myObject);
        }

       }
       console.log(myObjectArray);
      myFirebaseRef.update(
        {
          Payables: myObjectArray
        }
      );
      res.send(200);
   });
  });
 });

};
