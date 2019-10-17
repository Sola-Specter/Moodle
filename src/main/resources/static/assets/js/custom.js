/**
 * Created by TeneceUBA2 on 20/11/2017.
 */
(function ($) {
  var $dateRange = $('#date-range');
  var $reportGrid = $('#report-grid');
  var reportGridSerial = 0;

  $dateRange.daterangepicker({
    locale: {
      format: 'DD/MM/YYYY'
    },
    autoUpdateInput: false
  });

  $dateRange.on('apply.daterangepicker', function(e, picker) {
    $(this).val(picker.startDate.format('DD/MM/YYYY')
      + ' - ' + picker.endDate.format('DD/MM/YYYY'));
  });

  $dateRange.on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
  });

  $('#generator-form').on('submit', function (e) {
    e.preventDefault();
    var newReport;
    var range = $dateRange.val().trim().split("-");
    if (range.length < 2) {
      return false;
    }
    newReport = JSON.stringify({
      startDate: range[0].trim(),
      endDate: range[1].trim(),
      amount: $('#threshold').val()
    });
    $.ajax({
      type: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/api/generateReport',
      data: newReport
    })
    .done(function (res) {
      console.log(res);
      alert("Report generation initiated");
      window.location = '/list';
    })
    .fail(function (a) {
      console.log(a);
    });
  });

  var $reportGridDt = $('#report-grid').DataTable({
    'ajax': '/api/reportList',
    'columns': [
      {'data': null},
      {'data': 'reportId'},
      {'data': 'countryCode'},
      {'data': 'createdDate'},
      {'data': 'createdBy'},
      {'data': 'status'},
    ],
    'columnDefs': [
      {
        'targets': 5,
        'data': 'status',
        'render': function(data) {
          switch (data) {
            case 'S': return 'Completed';
            case 'P': return 'Pending';
            case 'F': return 'Failed';
          }
        }
      },
      {
        'targets': 6,
        'data': 'reportId',
        'render': function (data, type, row, meta) {
          console.log(row);
          return row.status == 'S'
            ? '<a href="/api/downloadReport/' + data + '">Download</a>'
            : '';
        }
      },
      {
        'targets': 0,
        'data': null,
        'searchable': false,
        'orderable': false,
        'render': function () {
          return ++reportGridSerial;
        }
      }]
  });
  $reportGrid.attr('style', 'border-collapse: collapse !important');
  $reportGridDt.on('order.dt search.dt', function () {
    $reportGridDt.column(0, {search:'applied', order:'applied'})
      .nodes().each(function (cell, i) { cell.innerHTML = i+1; });
  }).draw();
})(jQuery);
