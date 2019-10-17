

(function($) {
  var $caRequestTable = $('#credit-admin-request-table');
  var $crnUpdateModal = $('#crn-update-modal');
  var $rejectRequestModal = $('#request-reject-modal');
  var $saveCrnBtn = $('.save-crn-btn');
  var $confirmSaveCrnBtn = $('.confirm-save-crn-btn');
  var $rejectRequestBtn = $('.request-reject-btn');
  var $crmsRequestSearch = $('#crms-Request-Search');
  var $crmsRequestSearchBtn= $('.custom-search-btn');
  var $confirmRejectRequestBtn = $('.confirm-reject-request-btn');

  var util = initUtil();

  $('#start-date, #end-date').daterangepicker({
    locale: {
      format: 'DD/MM/YYYY'
    },
    autoUpdateInput: false,
    singleDatePicker: true
  });

  $('#start-date, #end-date').on('apply.daterangepicker', function(e, picker) {
    $(this).val(picker.startDate.format('DD/MM/YYYY'));
  });

  $('#start-date, #end-date').on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
  });

  // var dataTableApi =
      $caRequestTable.DataTable({});
    // 'ajax': {
    //   'url': '',
    //     'data': function(data, setting) {
    //       // data.group = '';
          // data.accountNo=$crmsRequestSearch.find('.accountNo').val();
          // data.crmsType=$crmsRequestSearch.find('.crmsType').val();
          // data.status=$crmsRequestSearch.find('.status').val();
          //

      //  },
      // 'data': {
      //   'group': 'all'
      // }
   // },
   // 'scrollX': true
    // 'columns': [
    //   {'data': 'requestReference'},
    //   {'data': 'accountNo'},
    //   {'data': 'borrowerFullname'},
    //   {'data': 'crmsType'},
    //   {'data': 'createDate'},
    //   {'data': 'createdBy'},
    //   {'data': 'creditRefNo'},
    //   {'data': null}
    // ],
    // 'columnDefs': [
    //   {
    //     'targets': 7,
    //     'searchable': false,
    //     'orderable': false,
    //     'className': 'no-wrap',
    //     'render': function(data, type, row) {
    //       var $openBtn = util.getHyperLink(
    //         'btn btn-primary btn-sm mr-1 show-crms-detail-btn').text('Open');
    //       var openBtnHtml = $openBtn.prop('outerHTML');
    //       var updateCrnBtnHtml = '';
    //       var rejectBtnHtml = '';
    //
    //       if (row.status == 'N') {
    //         var $updateCrnBtn, $rejectBtn;
    //         var _400Aor400B = (row.crmsType == 'CRMS400A' || row.crmsType == 'CRMS400B');
    //         $updateCrnBtn = util.getHyperLink(
    //           'btn btn-success btn-sm mr-1 ' + (_400Aor400B ? 'approve-btn' : 'update-crn-btn'))
    //           .text(_400Aor400B ? 'Approve' : 'Update CRN');
    //         $rejectBtn = util.getHyperLink(
    //           'btn btn-danger btn-sm request-reject-btn').text('Reject');
    //         updateCrnBtnHtml = $updateCrnBtn.prop('outerHTML');
    //         rejectBtnHtml = $rejectBtn.prop('outerHTML');
    //       }
    //       return openBtnHtml + updateCrnBtnHtml + rejectBtnHtml;
    //     },
    //     'createdCell': function(td, cellData, rowData) {
    //       $(td).attr('data-id', rowData.id).attr('data-rrn', rowData.requestReference);
    //     }
    //   },
    //   {
    //     'targets': 4,
    //     'className': 'no-wrap'
    //   }
    //]
  //});

    $crmsRequestSearchBtn.click(function (e) {
      console.log(dataTableApi);
        dataTableApi.ajax.reload();
        //$('#example').DataTable().ajax.reload();
        // dataTableApi.DataTable().ajax.reload();
    });

  $caRequestTable.on('click', '.show-crms-detail-btn', function(e) {
    e.preventDefault();
    var id = $(this).parents('td').attr('data-id');
    $.getJSON('/api/getCrmsDetail', {id: id}, function(data) {
      buildViewDataModal(data);
    });
  });

  $caRequestTable.on('click', '.update-crn-btn', function(e) {
    e.preventDefault();
    var $td = $(this).parents('td');
    var id = $td.attr('data-id');
    var rrn = $td.attr('data-rrn');

    $crnUpdateModal.find('.identifier').text(rrn);
    $crnUpdateModal.find('.id-field').val(id);
    $crnUpdateModal.modal('show');
  });

  $caRequestTable.on('click', '.approve-btn', function(e) {
    e.preventDefault();
    var $td = $(this).parent('td');
    var id = $td.attr('data-id');
    var rrn = $td.attr('data-rrn');
    if (confirm("Confirm approval of request " + rrn)) {
      $.ajax({
        url: '/api/creditAdmin/approveRequest',
        type: 'POST',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({id: id}),
        success: function(data) {
          if (data.successful) {
            alert('Request approved successfully');
              dataTableApi.ajax.reload();
          }
        }

      })
        .fail(function() {
          alert('Request approval failed');
            dataTableApi.ajax.reload();
        });
    }
  });

  $caRequestTable.on('click', '.request-reject-btn', function(e) {
    e.preventDefault();
    var $td = $(this).parents('td');
    var id = $td.attr('data-id');
    var rrn = $td.attr('data-rrn');

    $rejectRequestModal.find('.identifier').text(rrn);
    $rejectRequestModal.find('.id-field').val(id);
    $rejectRequestModal.modal('show');
  });

  $rejectRequestBtn.click(function(e) {
    if (!$rejectRequestModal.find('.request-reject-reason').val()) { return; }
    $(this).hide(0, function() {
      $confirmRejectRequestBtn.show();
    });
  });

  $confirmRejectRequestBtn.click(function (e) {
    var id = $rejectRequestModal.find('.id-field').val();
    var reason = $rejectRequestModal.find('.request-reject-reason').val();

    $.ajax({
      url: '/api/creditAdmin/rejectRequest',
      type: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({id: id, reason: reason}),
      success: function(data) {
        if (data.successful) {
          alert('Request successfully rejected!');
            dataTableApi.ajax.reload();
          $rejectRequestModal.modal('hide');
        }
      }

    })
      .fail(function() {
        alert('Request rejection failed');
          dataTableApi.ajax.reload();
        $rejectRequestModal.modal('hide');
      });
  });

  $saveCrnBtn.click(function(e) {
    if (!$crnUpdateModal.find('.crn-input-field').val()) { return; }
    $(this).hide(0, function() {
      $confirmSaveCrnBtn.show();
    });
  });

  $confirmSaveCrnBtn.click(function (e) {
    var id = $crnUpdateModal.find('.id-field').val();
    var crn = $crnUpdateModal.find('.crn-input-field').val();

    $.ajax({
      url: '/api/updateCrn',
      type: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({id: id, crn: crn}),
      success: function(data) {
        if (data.successful) {
          alert('Credit Reference Number updated!');
          $crnUpdateModal.modal('hide');
            dataTableApi.ajax.reload();
        }
      }

    })
    .fail(function() {
        alert('Credit Reference Number update failed!');
        $crnUpdateModal.modal('hide');
        dataTableApi.ajax.reload();
      });
  });

  $crnUpdateModal.on('hidden.bs.modal', function(e) {
    var $this = $(this);
    $this.find('.crn-input-field').val('');
    $crnUpdateModal.find('.id-field').val('');
    $this.find($confirmSaveCrnBtn).hide();
    $this.find($saveCrnBtn).show();
  });




  function initUtil() {
    function getHyperLink(className, href) {
      return $('<a/>').attr('href', href || '#').addClass(className);
    }

    return {
      getHyperLink: getHyperLink
    }
  }

  function buildViewDataModal(data) {
    var rows = '';
    var fields = getFieldsMap(data.crmsType, data.origCrmsType);
    $.each(fields, function(i, field) {
      var label = data[field.prop] || '';
      rows += '<tr>'
        + '<td class="font-weight-bold">' + field.label + '</td>'
        + '<td>' + label + '</td>'
        + '</tr>';
    });

    $('.info-table').html(rows);
    // $rejectBtn.attr('data-id', data.id);
    $('#crms-detail-modal-view').modal('show');
  }

  function getFieldsMap(type, origType) {
    var
      baseFields = [
        {prop: 'creditType', label: 'Credit Type'},
        {prop: 'legalStatus', label: 'Legal Status'},
        {prop: 'creditPurposeBusinessLine', label: 'Credit Purpose by business lines'},
        {prop: 'creditPurposeBLineSubSector', label: 'Business lines sub-sector'},
        {prop: 'creditLimit', label: 'Credit Limit'},
        {prop: 'outstandingAmount', label: 'Outstanding Amount'},
        {prop: 'feeType', label: 'Fee Type'},
        {prop: 'feeAmount', label: 'Fee Amount'},
        {prop: 'feeDetail', label: 'Fee Detail'},
        {prop: 'effectiveDate', label: 'Effective Date'},
        {prop: 'tenor', label: 'Tenor'},
        {prop: 'expiryDate', label: 'Expiry Date'},
        {prop: 'repaymentAgreementMode', label: 'Repayment Agreement Mode'},
        {prop: 'specializedLoan', label: 'Specialized Loan'},
        {prop: 'specializedLoanPeriod', label: 'Specialized Loan Period'},
        {prop: 'interestRate', label: 'Interest Rate'},
        {prop: 'collateralPresent', label: 'Collateral Present'},
        {prop: 'collateralSecure', label: 'Collateral Secure'},
        {prop: 'securityType', label: 'Security Type'},
        {prop: 'syndication', label: 'Syndication'},
        {prop: 'syndicationStatus', label: 'Syndication Status'},
        {prop: 'syndicationRefNo', label: 'Syndication Ref Number'},
        {prop: 'creditRefNo', label: 'Credit Reference Number'},
        {prop: 'crmsType', label: 'CRMS Type'}
      ],
      crms100And200Fields = [
        {prop: 'repaymentSource', label: 'Repayment Source'}
      ],
      crms100Fields = [
        // {label: 'lgaCode', label: 'LGA Code'},
        {prop: 'requestReference', label: 'Request Reference'},
        {prop: 'borrowerFullname', label: 'Borrower Full Name'},
        {prop: 'govtCode', label: 'Government Code'}
      ],
      crms200Fields = [
        {prop: 'requestReference', label: 'Request Reference'},
        {prop: 'borrowerFullname', label: 'Borrower Full Name'},
        {prop: 'govtMdaTin', label: 'Government MDA TIN'},
        {prop: 'perfRepaymentStatus', label: 'Performance Repayment Status'}
      ],
      crms300Fields = [
        {prop: 'requestReference', label: 'Request Reference'},
        {prop: 'borrowerFullname', label: 'Borrower Full Name'},
        {prop: 'uniqueIdType', label: 'Identification Type'},
        {prop: 'uniqueIdNo', label: 'Identification Number'},
        {prop: 'beneAccountNo', label: 'Beneficiary Account Number'},
        {prop: 'locationOfbene', label: 'Location of Beneficiary'},
        {prop: 'relationshipType', label: 'Relationship Type'},
        {prop: 'directorDetail', label: 'Director Detail'},
        {prop: 'companySize', label: 'Company Size'},
        {prop: 'fundingSourceCategory', label: 'Funding Source Category'},
        {prop: 'fundingSource', label: 'Funding Source'},
        {prop: 'classByBusinessLine', label: 'Classification by Business Line'},
        {prop: 'classByBLineSubSector', label: 'Classification by Business Line sub sector'},
        {prop: 'addressOfSecurity', label: 'Address of Security'},
        {prop: 'ownerOfSecurity', label: 'Owner of Security'},
        {prop: 'idTypeOfSecurityOwner', label: 'Unique Identification Type of Security Owner'},
        {prop: 'guarantee', label: 'Guarantee'},
        {prop: 'guaranteeType', label: 'Guarantee Type'},
        {prop: 'guarantorIdType', label: 'Guarantor Unique Identification Type'},
        {prop: 'guarantorId', label: 'Guarantor Unique Id'},
        {prop: 'amountGuaranteed', label: 'Amount Guaranteed'}
      ],
      crms400BFields = [
        {prop: 'restructureReason', label: 'Restructure Reason'}
      ]

    switch (type) {
      case 'CRMS100':
        return crms100Fields.concat(crms100And200Fields, baseFields);
      case 'CRMS200':
        return crms200Fields.concat(crms100And200Fields, baseFields);
      case 'CRMS300':
        return crms300Fields.concat(baseFields);
      case 'CRMS400A':
        return getFieldsMap(origType);
      case 'CRMS400B':
        return getFieldsMap(origType).concat(crms400BFields);
    }
  }
})(jQuery);
