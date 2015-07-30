require('./oAuthController.js');
var passport = require('passport');
var QuickBooks = require('../../node_modules/node-quickbooks/index.js');
var Firebase = require("firebase");

module.exports = function(app) {

app.get('/login', function(req, res){
  res.redirect('/');
});

app.get('/auth/intuit/callback',
  passport.authenticate('intuit', { failureRedirect: '/login' }),
   function(req, res) {
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
     var myFirebaseRef = new Firebase("https://bizgramer.firebaseio.com/"+global.org+"/BizData");

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
     var myFirebaseRef = new Firebase("https://bizgramer.firebaseio.com/"+global.org+"/BizData");
     qboFunc.findCustomers({}, function(err, list){
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
  
 var myFirebaseRef = new Firebase("https://bizgramer.firebaseio.com/"+req.session.org+"/BizData");
  qboFunc.reportAgedPayableDetail({num_periods:3}, function(_, report){
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

