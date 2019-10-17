/**
 * Created by TeneceUBA2 on 08/12/2017.
 */
$('#main-logout').click(function(e) {
  e.preventDefault();
  $('<form />', {action: '/logout', method: 'post'})
    .hide().appendTo('body').submit();
});

$.validator.addMethod('bvn', function(value, ele) {
  return this.optional(ele) || /^\d{11}$/.test(value)
}, 'Invalid BVN');

$.validator.addMethod('accountNumber', function(value, ele) {
    return this.optional(ele) || /^\d{10}$/.test(value)
}, 'Invalid Account Number');

$.validator.addMethod('tin', function(value, ele) {
  return this.optional(ele) || /^.{15}$/.test(value)
}, 'Invalid TIN');

$.validator.addMethod('customEmail', function(value, ele) {
    return this.optional(ele) || /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)
}, 'Invalid Email');


