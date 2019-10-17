(function ($) {
    var $caRequestTable = $('#credit-admin-request-table');
    var $rollOverSaveBtn = $('.roll-over-save-btn');
    var $saveModBtn = $('.save-mod-btn');
    var $rollOverRequestModal = $('#roll-over-modal');
    var $uniqueIdType = $('#uniqueIdType');
    var $uniqueIdVal = $('#uniqueIdNo');
    var modType = $('#mod-type').length ? $('#mod-type').val() : '';
    var modAcc = $('#mod-accNo').length ? $('#mod-accNo').val() : '';
    var lookupCategory = {LGA: 'LGA', SUB_SECTOR: 'SUB_SECTOR', BENE_LOCATION: 'BENE_LOCATION'};
    var util = initUtil();
    var feeDetailManager = feeDetailManagerFactory('.fee-detail-form');
    var directorDetailManager = initDirectorDetailManager();
    var $effectiveDate = $('#effectiveDate');
    var $expiryDate = $('#expiryDate');
    var $tenor = $('#tenor');

    $(document).bind("contextmenu",function(e){
        return false;
    });

    $(document).keydown(function (event) {
        if (event.keyCode == 123) { // Prevent F12
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I
            return false;
        }
    });

    $tenor.on('change paste keyup', function (e) {
        var tenor = $(this).val();
        updateExpiryDate($effectiveDate.val(), tenor);
    });

    function updateExpiryDate(dateString, tenor) {
        if (dateString && isNumber(tenor)) {
            var expiryDate = moment(dateString, 'DD/MM/YYYY').add(tenor, 'month').format('DD/MM/YYYY');
            $expiryDate.val(expiryDate);
        } else {
            $expiryDate.val('');
        }
    }

    function isNumber(value) {
        return (value && !isNaN(value));
    }

    $('.datepicker').daterangepicker({
        locale: {
            format: 'DD/MM/YYYY'
        },
        autoUpdateInput: false,
        singleDatePicker: true
    });

    $('.datepicker').on('apply.daterangepicker', function (e, picker) {
        var $this = $(this);
        var tenor;
        if ($this.is($effectiveDate)) {
            console.log('running...');
            tenor = $tenor.val();
            updateExpiryDate($effectiveDate.val(), tenor);
        }
        $(this).val(picker.startDate.format('DD/MM/YYYY'));
    });

    $('.datepicker').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    $caRequestTable.DataTable({
        'ajax': {
            'url': '/api/usersList',
            'data': {
                'group': 'all'
            }
        },
        'scrollX': true,
        'columns': [
            {'data': 'userid'},
            {'data': 'firstname'},
            {'data': 'lastname'},
            {'data': 'middlename'},
            {'data': 'email'},
            {'data': 'role'},
            {'data': 'status'},
            {'data': 'creationdate'},
            {'data': 'createdby'},
            {'data': null}
        ],
        'columnDefs': [
            {
                'targets': 7,
                'render': function (data, type, row) {

                    var date = new Date(row.creationdate);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                }


            },
            {
                'targets': 9,
                'render': function (data, type, row) {
                   // if (row.userid != ''){

                        return '<button style="background-color: #e60000" class="btn btn-primary no-wrap modify-user"><strong style="color: white">Modify</strong></button>';

                   // }
                   // else
                   //     return "";
                },
                'createdCell': function (td, cellData, rowData) {
                    var $td = $(td);
                    var userId = '';
                    var email ='';
                    var role ='';
                    var status = '';
                    var fullname = '';
                    var creationDate = '';
                    var createdBy = '';
                    if (rowData != null) {
                        userId = rowData.userid;
                        email = rowData.email;
                        fullname = rowData.firstname+" "+rowData.middlename+" "+rowData.lastname;
                        role = rowData.role;
                        status = rowData.status;
                        creationDate = rowData.creationdate;
                        createdBy = rowData.createdby;
                    }

                    $td.attr('data-user-id', userId);
                    $td.attr('data-user-email', email);
                    $td.attr('data-user-fullname', fullname);
                    $td.attr('data-user-role', role);
                    $td.attr('data-user-status', status);
                    $td.attr('data-user-creation-date', creationDate);
                    $td.attr('data-user-created-by', createdBy);

                }
            }
        ]
    });

    $caRequestTable.on('click', '.modify-user', function (e){
        e.preventDefault();

        $('#role').empty();
        $('#status').empty();

        var userId = $(this).parents('td').attr('data-user-id');
        var role = $(this).parents('td').attr('data-user-role');
        var role2 = '';
        var status2 = '';
        var createdBy = $(this).parents('td').attr('data-user-created-by');
        var creationDate = $(this).parents('td').attr('data-user-creation-date');
        var date = new Date(creationDate);
        creationDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        var status = $(this).parents('td').attr('data-user-status');
        var userId = $(this).parents('td').attr('data-user-id');
        var email = $(this).parents('td').attr('data-user-email').toLowerCase();
        var fullname = $(this).parents('td').attr('data-user-fullname').toUpperCase();

        $('#crms-detail-modal-view').find('.createdBy').text(createdBy);
        $('#crms-detail-modal-view').find('.creationDate').text(creationDate);
        $('#crms-detail-modal-view').find('.email').text(email);
        $('#crms-detail-modal-view').find('.fullname').text(fullname);

        if(role === 'ADMIN') {
            role2 = 'GENERAL';
        }
            else {
            role = 'GENERAL';
            role2 = 'ADMIN';
        }

        if(status === 'Inactive') {
            status2 = 'Active';
        }
        else {
            status = 'Active';
            status2 = 'Inactive';
        }

        $('#status').append(
            $('<option />').val(status)
                .text(status),
            $('<option />').val(status2)
                .text(status2));

        $('#role').append(
            $('<option />').val(role)
                .text(role),
            $('<option />').val(role2)
                .text(role2));

        $('#crms-detail-modal-view').modal('show');
    });

    $saveModBtn.click(function (e) {
        e.preventDefault();
        alert('BUTTON HAS BEEN CLICKED');
    });

    $("a.view-user").click(function (e) {

            $(this).css("background-color", "red");

    });
    $caRequestTable.on('click', '.show-crms-detail-btn', function (e) {
        e.preventDefault();
        var id = $(this).parents('td').attr('data-id');
        $.getJSON('/api/getCrmsDetail', {id: id}, function (data) {
            buildViewDataModal(data);
        });
    });

    var Validator = $('#crms-form').validate({
        rules: {
            creditLimit: {
                number: true
            },
            emailAdd1: {
                customEmail: true
            },

            amountGuaranteed: {
                number: true
            },
            outstandingAmount: {
                number: true
            },
            feeAmount1: {
                number: true
            },
            interestRate: {
                number: true
            },

            tenor: {
                digits: true
            },
            accountNumer: {
                accountNumber: true
            },
            beneAccountNo: {
                accountNumber: true
            }
        },
        messages: {
            creditLimit: {
                number: 'Enter a valid amount'
            },
            outstandingAmount: {
                number: 'Enter a valid amount'
            },
            interestRate: {
                number: 'Interest rate must be decimal'
            },
            tenor: {
                digits: 'Enter a valid number'
            },
            accountNumber: {
                digits: 'Enter a Valid Account Number please'
            }

        },
        submitHandler: function (form) {
            concatenateBiFormUnit(feeDetailManager.getForms(), '#fee-detail');

            if ($('#repayment-source').length) {
                $('#repayment-source').val($('select#repayment-source-select').val().join(','));
            }

            if ($('#directorsDetail').length) {
                $('#directorsDetail').val(directorDetailManager.getDirectorDetailsString());
            }

            console.log(directorDetailManager.getDirectorDetailsString());
            form.submit();
        }

       });


    $caRequestTable.on('click', '.restructure-btn', function (e) {
        e.preventDefault();
        var id = $(this).parents('td').attr('data-id');

        var $input1 = $('<input />', {type: 'hidden', name: 'accountNumber', value: modAcc});
        var $input2 = $('<input />', {type: 'hidden', name: 'customerType', value: modType});
        var $input3 = $('<input />', {type: 'hidden', name: 'restructure', value: true});
        var $input4 = $('<input />', {type: 'hidden', name: 'origId', value: id});
        var $form = $('<form />', {'action': '/initiator/newRequest', 'method': 'post'});

        $form.append($input1, $input2, $input3, $input4).hide().appendTo('body').submit();
    });

    $caRequestTable.on('click', '.roll-over-btn', function (e) {
        e.preventDefault();
        var id = $(this).parents('td').attr('data-id');
        var rrn = $(this).parents('td').attr('data-rrn');
        var $rollOverModal = $('#roll-over-modal');

        var $rollOverRequestModal = $('#roll-over-modal');
        $rollOverRequestModal.find('.identifier').text(rrn);
        $rollOverRequestModal.find('.id-field').val(id);

        $rollOverRequestModal.modal('show');

    });

    $rollOverSaveBtn.click(function (e) {
        var rrn = $(this).parents('td').attr('data-rrn');
        var id = $rollOverRequestModal.find('.id-field').val();
        var tenor = $rollOverRequestModal.find('.roll-over-tenor').val();
        var startDate = $rollOverRequestModal.find('.roll-over-start-date').val();
        var endDate = $rollOverRequestModal.find('.roll-over-end-date').val();

        $.ajax({
            url: '/api/saveRollOverRequest',
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({id: id, tenor: tenor, startDate: startDate, endDate: endDate}),
            success: function (data) {
                //if (data.message) {
                alert('Roll Over Request Has been Submitted Successfully');
                $rollOverRequestModal.modal('hide');
                location.reload();
                //}
            }

        })
            .fail(function () {
                alert('Roll Over Request Failed');
                $rollOverRequestModal.modal('hide');
            });
    });


    if ($uniqueIdType.length && $uniqueIdType.val() === 'BVN') {
        $uniqueIdVal.rules('add', {bvn: true})
        $uniqueIdVal.prop('readonly', true);
    }


    // Events
    $('.business-lines').change(function (e) {
        var $this = $(this);
        var ref = $('#businessline-cat-ref').val();
        var $subsector = $this.attr('id') == 'creditPurposeBline'
            ? $('#creditPurposeBlineSubsector') : $('#classBlineSubsector');

        buildDependentSelect($subsector, ref, $this.val(), lookupCategory.SUB_SECTOR);
    });


    $('#colSecure').change(
        function (e) {
            $('#securityType').html(
                '<option selected value>--select--</option>');
            var colSecVal = $(this).val();

            $.ajax(
                {
                    url: '/api/initiator/getSecurityType',
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        colSecVal: colSecVal
                    }),
                    success: function (data) {

                        $.each(data, function (index, value) {
                            $('#securityType').append(
                                $('<option />').val(value.crms)
                                    .text(value.description))

                        });

                    }
                }).fail(function () {
                alert('Error Fetching Security Type');

            });
        });


    $('#guaranteeType').change(function (e) {
        $('#guarantorIdType').html('<option selected value>--select--</option>');
        var guaranteeType = $(this).val();
        if (guaranteeType == 'Individual') {

            $('#guarantorIdType').append($('<option selected />').val('BVN').text('BVN'));

            $('#guarantorId').rules('add', {bvn: true});
        }
        else if (guaranteeType == 'Non-Individual') {

            $('#guarantorIdType').append($('<option selected />').val('TIN').text('TIN'));

            $('#guarantorId').rules('remove', 'bvn');
        }
        else
            $('#guarantorIdType').html('<option selected value>--select--</option>');
        //$('#guarantorId').rules('remove', 'bvn');
    });


    $('#uniqueIdType').change(function (e) {
        $('#uniqueIdNo').val('');
        var uniqueIdType = $(this).val();
        var accountNo = $("#accountNo").val();
        if (uniqueIdType === 'BVN') {

            $('#uniqueIdNo').rules('add', {bvn: true});
            $('#uniqueIdNo').prop('readonly', true);
            $.ajax({
                url: '/api/initiator/getBvn',
                type: 'POST',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    accountNo: accountNo
                }),
                success: function (data) {

                    $('#uniqueIdNo').val(data);

                }
            }).fail(function () {

            });
        }
        else
            $('#uniqueIdNo').prop('readonly', false);
        $('#uniqueIdNo').rules('remove', 'bvn');

    });


    $('#govtCode').change(function (e) {
        var ref = $('#govt-code-ref').val();
        var $lgaCode = $('#lgaCode');

        // LGA code element will only be available for local Govt. Otherwise, do
        // nothing.
        if ($lgaCode.length) {
            buildDependentSelect($lgaCode, ref, $(this).val(), lookupCategory.LGA);
        }
    });

    $('#add-fee-btn').on('click', function (e) {
        feeDetailManager.addFeeDetailForm();
    });

    $('#add-director-btn').click(function (e) {
        directorDetailManager.addDirectorForm();
    });

    $('#idTypeOfSecurityOwner').change(function (e) {
        var idtype = $(this).val();
        if (idtype === 'BVN') {
            $('#idOfSecurityOwner').rules('add', {bvn: true});
        }
        else
            $('#idOfSecurityOwner').rules('remove', 'bvn');
    });

    $('#dirIdType').change(function (e) {
        var idtype = $(this).val();
        if (idtype === 'BVN') {
            $('#dirIdNo').rules('add', {bvn: true});

        } else

            $('#dirIdNo').rules('remove', 'bvn');

    });


    function buildDependentSelect($element, ref, crms, category) {
        var data = {};
        data.ref = ref;
        data.crms = crms;
        data.category = category;

        $element.html('<option selected value>-select-</option>');
        $getJson('/api/getDependentLookup', data, function (data) {
            $.each(data, function (index, value) {
                $element.append($('<option />').val(value.crms).text(value.description))
            });
        })
            .fail(function (a) {
                console.log(a);
            });
    }

    // Utilities
    function concatenateBiFormUnit($forms, receiverInputId) {
        var string = '';
        $forms.each(function (index, ele) {
            var $ele = $(ele);
            var key = $ele.find('select').val();
            var value = $ele.find('input').val();
            string += string.length ? ';' : '';
            string += key + ',' + value;
        });
        $(receiverInputId).val(string);
    }

    function feeDetailManagerFactory(origFeeDetailFormClass) {
        var formCount = 1; // Minimum of one fee detail form.
        var $origFeeDetailForm = $(origFeeDetailFormClass);

        if (!$origFeeDetailForm.length) {
            return;
        }

        var $feeDetailFormWrapper = $origFeeDetailForm.parent();
        var $feeDetailForm = getDefaultFeeDetailForm(); // fee detail form to always clone from


        function addFeeDetailForm() {
            var $newFdf = $feeDetailForm.clone();
            $newFdf.find('select').attr('name', 'feeType' + (formCount + 1));
            $newFdf.find('input').attr('name', 'feeAmount1');


            formCount++;
            $feeDetailFormWrapper.find(origFeeDetailFormClass).last().after($newFdf);
            $feeDetailFormWrapper.find('.remove-fee-detail-form-btn').show();
        }

        function getForms() {
            return $feeDetailFormWrapper.find(origFeeDetailFormClass);
        }

        function getDefaultFeeDetailForm() {
            var $fdf = $origFeeDetailForm.clone();
            $fdf.find('select').attr('name', '');
            $fdf.find('input').attr('name', '');
            return $fdf;
        }

        function renameForms() {
            $feeDetailFormWrapper.find(origFeeDetailFormClass).each(function (i, fdf) {
                var $fdf = $(fdf);
                $fdf.find('select').attr('name', 'feeType' + (i + 1));
                $fdf.find('input').attr('name', 'feeAmount' + (i + 1));
            });
        }

        $feeDetailFormWrapper.on('click', '.remove-fee-detail-form-btn', function (e) {
            if (formCount === 1) {
                return; // There must be at least on form
            }
            $(this).parents(origFeeDetailFormClass).remove();
            if (--formCount === 1) { // If there is only one form left, hide the close button
                $feeDetailFormWrapper.find('.remove-fee-detail-form-btn').hide();
            }
            renameForms();
        });

        return {
            addFeeDetailForm: addFeeDetailForm,
            getForms: getForms
        };
    }

    function initDirectorDetailManager() {
        var formCount = 1; // Minimum of one fee detail form.
        var $directorForm = $('.director-form').clone();

        if (!$directorForm.length) {
            return;
        } // If there's no director from already on page, there's nothing to initialize

        var $directorFormWrapper = $('#director-form-wrapper');
        $directorForm.find('input').attr('name', ''); // Set name attribute to zero

        function addDirectorForm() {
            var $newDf = $directorForm.clone();

            $newDf.find('.id-type').attr('name', 'dirIdType' + (formCount + 1)).attr('id', 'dirIdType' + (formCount + 1));
            $newDf.find('.id-no').attr('name', 'dirIdNo' + (formCount + 1)).attr('id', 'dirIdNo' + (formCount + 1));
            $newDf.find('.emailAdd').attr('name', 'emailAdd' + (formCount + 1)).attr('id', 'emailAdd' + (formCount + 1)).rules('add', {customEmail: true});

            formCount++;
            $directorFormWrapper.find('.director-form').last().after($newDf);
            $directorFormWrapper.find('.remove-director-form-btn').show();


            $('#dirIdType1').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo1').rules('add', {bvn: true});
                    $('#emailAdd1').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo1').rules('remove', 'bvn');

            });
            $('#dirIdType2').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo2').rules('add', {bvn: true});
                    $('#emailAdd2').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo2').rules('remove', 'bvn');

            });
            $('#dirIdType3').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo3').rules('add', {bvn: true});
                    $('#emailAdd3').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo3').rules('remove', 'bvn');

            });
            $('#dirIdType4').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo4').rules('add', {bvn: true});
                    $('#emailAdd4').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo4').rules('remove', 'bvn');

            });
            $('#dirIdType5').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo5').rules('add', {bvn: true});
                    $('#emailAdd5').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo5').rules('remove', 'bvn');

            });
            $('#dirIdType6').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo6').rules('add', {bvn: true});
                    $('#emailAdd6').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo6').rules('remove', 'bvn');

            });
            $('#dirIdType7').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo7').rules('add', {bvn: true});
                    $('#emailAdd7').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo7').rules('remove', 'bvn');

            });
            $('#dirIdType8').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo8').rules('add', {bvn: true});
                    $('#emailAdd8').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo8').rules('remove', 'bvn');

            });
            $('#dirIdType9').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo9').rules('add', {bvn: true});
                    $('#emailAdd9').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo9').rules('remove', 'bvn');

            });
            $('#dirIdType10').change(function (e) {
                var idtype = $(this).val();
                if (idtype === 'BVN') {
                    $('#dirIdNo10').rules('add', {bvn: true});
                    $('#emailAdd10').rules('add', {customEmail: true});

                } else
                    $('#dirIdNo10').rules('remove', 'bvn');

            });

        }

        function getForms() {
            return $directorFormWrapper.find('.director-form');
        }

        function renameForms() {
            $directorFormWrapper.find('.director-form').each(function (i, df) {
                var $df = $(df);
                $df.find('.id-type').attr('name', 'dirIdType' + (i + 1)).attr('id', 'dirIdType' + (i + 1));
                $df.find('.id-no').attr('name', 'dirIdNo' + (i + 1)).attr('id', 'dirIdNo' + (i + 1));
                $df.find('.emailAdd').attr('name', 'emailAdd' + (i + 1)).attr('id', 'emailAdd' + (i + 1));

            });
        }

        $directorFormWrapper.on('click', '.remove-director-form-btn', function (e) {
            if (formCount === 1) {
                return; // There must be at least on form
            }
            $(this).parents('.director-form').remove();
            if (--formCount === 1) { // If there is only one form left, hide the close button
                $directorFormWrapper.find('.remove-director-form-btn').hide();
            }
            renameForms();
        });

        function getDirectorDetailsString() {
            var string = '';
            $directorFormWrapper.find('.director-form').each(function (index, ele) {
                var $ele = $(ele);
                var idType = $ele.find('.id-type').val();
                var idValue = $ele.find('.id-no').val();
                var email = $ele.find('.emailAdd').val();
                string += string.length ? ';' : '';
                string += idType + ',' + idValue + ',' + email;

            });
            return string;
        }

        return {
            addDirectorForm: addDirectorForm,
            getDirectorDetailsString: getDirectorDetailsString,
            getForms: getForms
        };
    }

    function $getJson(url, data, success) {
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: $.isFunction(success) ? success : undefined
        });
    }

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
        $.each(fields, function (i, field) {
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

    function buildRollOverForm(id) {
        var rows = '';
        var fields = getFieldsMap(data.crmsType, data.origCrmsType);
        $.each(fields, function (i, field) {
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


    $caRequestTable.on('click', '.request-reject-btn', function (e) {
        e.preventDefault();
        var $td = $(this).parents('td');
        var id = $td.attr('data-id');
        var rrn = $td.attr('data-rrn');

        $rejectRequestModal.find('.identifier').text(rrn);
        $rejectRequestModal.find('.id-field').val(id);
        $rejectRequestModal.modal('show');
    });


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


// Existing is about 436
